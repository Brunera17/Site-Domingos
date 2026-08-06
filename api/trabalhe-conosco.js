import { Resend } from 'resend'
import { escapeHtml, renderEmailShell, fieldRow } from './_lib/email.js'

const TO_EMAIL = process.env.CONTACT_EMAIL_TO || 'sucessodocliente@domingosassessoria.com.br'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Site Domingos Assessoria <onboarding@resend.dev>'

// Limite alinhado ao teto de payload das Vercel Functions (~4.5MB).
// Base64 infla o arquivo em ~37%, então 3MB de arquivo original vira ~4.1MB codificado.
const MAX_RESUME_BYTES = 3 * 1024 * 1024

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'Método não permitido.' })
    }

    // `new Resend()` lança exceção de forma síncrona se não houver API key —
    // construir aqui dentro (não no escopo do módulo) evita derrubar a função
    // inteira num crash não tratado quando a env var não estiver configurada.
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY não configurada.')
        return res.status(500).json({ error: 'Envio de e-mail não configurado no servidor.' })
    }
    const resend = new Resend(process.env.RESEND_API_KEY)

    const {
        nome, email, telefone, area, nivel, disponibilidade, motivacao,
        vagaSelecionada, resumeBase64, resumeFilename, resumeMimeType,
    } = req.body || {}

    if (!nome || !email || !telefone || !area || !nivel || !disponibilidade || !motivacao || !resumeBase64) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios e anexe o currículo.' })
    }

    // resumeBase64 vem como data URL ("data:application/pdf;base64,....");
    // o Resend espera só a parte depois da vírgula.
    const base64Content = resumeBase64.includes(',') ? resumeBase64.split(',')[1] : resumeBase64
    const approxBytes = Math.ceil((base64Content.length * 3) / 4)
    if (approxBytes > MAX_RESUME_BYTES) {
        return res.status(413).json({ error: 'O arquivo do currículo é maior que o limite de 3MB.' })
    }

    const primeiroNome = String(nome).trim().split(' ')[0]
    const tituloVaga = vagaSelecionada || 'Banco de Talentos'

    try {
        const notifyResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            replyTo: email,
            subject: `Nova candidatura — ${tituloVaga} — ${nome}`,
            html: renderEmailShell({
                title: `Nova candidatura: ${tituloVaga}`,
                preheader: `${nome} se candidatou para ${tituloVaga}`,
                bodyHtml: [
                    fieldRow('Nome', nome),
                    fieldRow('E-mail', email),
                    fieldRow('Telefone', telefone),
                    fieldRow('Área de interesse', area),
                    fieldRow('Nível de experiência', nivel),
                    fieldRow('Disponibilidade', disponibilidade),
                    fieldRow('Vaga', tituloVaga),
                    `<p style="margin:16px 0 4px;"><strong style="color:#ffffff;">Motivação:</strong></p>`,
                    `<p style="white-space:pre-wrap;background:#0a0a0a;border:1px solid #262626;border-radius:8px;padding:12px 14px;">${escapeHtml(motivacao)}</p>`,
                    `<p style="margin-top:16px;color:#a3a3a3;font-size:13px;">Currículo em anexo: ${escapeHtml(resumeFilename || 'arquivo')}</p>`,
                ].join(''),
            }),
            attachments: [
                {
                    filename: resumeFilename || 'curriculo.pdf',
                    content: base64Content,
                    contentType: resumeMimeType || 'application/pdf',
                },
            ],
        })

        // O SDK do Resend não lança exceção em erros da API — retorna { data, error }.
        // É preciso checar `error` explicitamente, senão uma falha (ex: anexo rejeitado,
        // chave inválida) passaria como sucesso silencioso.
        if (notifyResult.error) {
            console.error('Resend recusou o e-mail de candidatura:', notifyResult.error)
            return res.status(502).json({ error: 'Não foi possível enviar sua candidatura agora. Tente novamente em instantes.' })
        }

        // Confirmação automática para quem se candidatou — best-effort, não bloqueia a resposta de sucesso.
        const confirmResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Recebemos sua candidatura — Domingos Assessoria',
            html: renderEmailShell({
                title: `Olá, ${primeiroNome}!`,
                preheader: 'Recebemos sua candidatura e entraremos em contato em breve.',
                bodyHtml: `
                    <p>Recebemos sua candidatura para <strong>${escapeHtml(tituloVaga)}</strong>. Nossa equipe vai analisar seu perfil com atenção.</p>
                    <p>Entraremos em contato em até <strong>5 dias úteis</strong>. Obrigado pelo interesse em fazer parte do nosso time!</p>
                `,
            }),
        })
        if (confirmResult.error) {
            console.error('Resend recusou o e-mail de confirmação (não crítico):', confirmResult.error)
        }

        return res.status(200).json({ ok: true })
    } catch (err) {
        console.error('Erro ao enviar e-mail de candidatura:', err)
        return res.status(502).json({ error: 'Não foi possível enviar sua candidatura agora. Tente novamente em instantes.' })
    }
}
