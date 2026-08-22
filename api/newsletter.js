import { Resend } from 'resend'
import { renderEmailShell, fieldRow } from './_lib/email.js'

const TO_EMAIL = process.env.CONTACT_EMAIL_TO || 'sucessodocliente@domingosassessoria.com.br'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Site Domingos Assessoria <onboarding@resend.dev>'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
        return res.status(500).json({ error: 'Inscrição não configurada no servidor.' })
    }
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { email } = req.body || {}
    const emailTrim = String(email || '').trim()

    if (!emailTrim || !EMAIL_RE.test(emailTrim)) {
        return res.status(400).json({ error: 'Informe um e-mail válido.' })
    }

    try {
        const notifyResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            replyTo: emailTrim,
            subject: 'Nova inscrição na newsletter pelo site',
            html: renderEmailShell({
                title: 'Nova inscrição na newsletter',
                preheader: `${emailTrim} se inscreveu para receber novidades`,
                bodyHtml: fieldRow('E-mail', emailTrim),
            }),
        })

        // O SDK do Resend não lança exceção em erros da API — retorna { data, error }.
        // É preciso checar `error` explicitamente, senão uma falha (ex: chave inválida,
        // remetente não verificado) passaria como sucesso silencioso.
        if (notifyResult.error) {
            console.error('Resend recusou o e-mail de notificação da newsletter:', notifyResult.error)
            return res.status(502).json({ error: 'Não foi possível concluir sua inscrição agora. Tente novamente em instantes.' })
        }

        // Confirmação automática para quem se inscreveu — best-effort, não bloqueia a resposta de sucesso.
        const confirmResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: emailTrim,
            subject: 'Inscrição confirmada — Domingos Assessoria',
            html: renderEmailShell({
                title: 'Inscrição confirmada!',
                preheader: 'Você vai receber nossas novidades por e-mail.',
                bodyHtml: `
                    <p>A partir de agora você vai receber dicas de gestão, prazos fiscais e novidades da Domingos Assessoria direto no seu e-mail.</p>
                    <p>Se preferir falar com a gente agora, chame no WhatsApp: <a href="https://wa.me/5514996580459" style="color:#E8610A;">(14) 9 9658-0459</a>.</p>
                `,
            }),
        })
        if (confirmResult.error) {
            console.error('Resend recusou o e-mail de confirmação da newsletter (não crítico):', confirmResult.error)
        }

        return res.status(200).json({ ok: true })
    } catch (err) {
        console.error('Erro ao processar inscrição da newsletter:', err)
        return res.status(502).json({ error: 'Não foi possível concluir sua inscrição agora. Tente novamente em instantes.' })
    }
}
