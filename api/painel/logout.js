import { cookieExpirado } from '../_lib/painelAuth.js'

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'Método não permitido.' })
    }
    res.setHeader('Set-Cookie', cookieExpirado())
    res.setHeader('Cache-Control', 'no-store')
    return res.status(204).end()
}
