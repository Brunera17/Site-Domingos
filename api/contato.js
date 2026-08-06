import { Resend } from 'resend'
import { escapeHtml, renderEmailShell, fieldRow } from './_lib/email.js'

const TO_EMAIL = process.env.CONTACT_EMAIL_TO || 'sucessodocliente@domingosassessoria.com.br'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Site Domingos Assessoria <onboarding@resend.dev>'

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

    const { nome, email, telefone, empresa, assunto, mensagem } = req.body || {}

    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).json({ error: 'Preencha nome, e-mail, assunto e mensagem.' })
    }

    const primeiroNome = String(nome).trim().split(' ')[0]

    try {
        const notifyResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            replyTo: email,
            subject: `Novo contato pelo site — ${assunto}`,
            html: renderEmailShell({
                title: 'Novo contato pelo site',
                preheader: `${nome} enviou uma mensagem sobre "${assunto}"`,
                bodyHtml: [
                    fieldRow('Nome', nome),
                    fieldRow('E-mail', email),
                    fieldRow('Telefone', telefone || 'Não informado'),
                    fieldRow('Empresa', empresa || 'Não informado'),
                    fieldRow('Assunto', assunto),
                    `<p style="margin:16px 0 4px;"><strong style="color:#ffffff;">Mensagem:</strong></p>`,
                    `<p style="white-space:pre-wrap;background:#0a0a0a;border:1px solid #262626;border-radius:8px;padding:12px 14px;">${escapeHtml(mensagem)}</p>`,
                ].join(''),
            }),
        })

        // O SDK do Resend não lança exceção em erros da API — retorna { data, error }.
        // É preciso checar `error` explicitamente, senão uma falha (ex: chave inválida,
        // remetente não verificado) passaria como sucesso silencioso.
        if (notifyResult.error) {
            console.error('Resend recusou o e-mail de notificação:', notifyResult.error)
            return res.status(502).json({ error: 'Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou fale pelo WhatsApp.' })
        }

        // Confirmação automática para quem enviou o formulário — best-effort, não bloqueia a resposta de sucesso.
        const confirmResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Recebemos sua mensagem — Domingos Assessoria',
            html: renderEmailShell({
                title: `Olá, ${primeiroNome}!`,
                preheader: 'Recebemos sua mensagem e retornaremos em até 1 dia útil.',
                bodyHtml: `
                    <p>Recebemos sua mensagem sobre <strong>${escapeHtml(assunto)}</strong> e nossa equipe já está de olho nela.</p>
                    <p>Retornaremos em até <strong>1 dia útil</strong>. Se preferir uma resposta mais rápida, fale com a gente pelo WhatsApp: <a href="https://wa.me/5514996580459" style="color:#E8610A;">(14) 9 9658-0459</a>.</p>
                `,
            }),
        })
        if (confirmResult.error) {
            console.error('Resend recusou o e-mail de confirmação (não crítico):', confirmResult.error)
        }

        return res.status(200).json({ ok: true })
    } catch (err) {
        console.error('Erro ao enviar e-mail de contato:', err)
        return res.status(502).json({ error: 'Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou fale pelo WhatsApp.' })
    }
}
