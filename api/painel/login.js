import { incrementar, navegador, regiaoDaRequisicao, tipoDispositivo } from '../_lib/analytics.js'
import { cookieSessao, criarToken, senhaConfigurada, senhaCorreta } from '../_lib/painelAuth.js'
import { excedeuLimite, registrarAcessoPainel, zerarLimite } from '../_lib/seguranca.js'

const MAX_TENTATIVAS = 5
const BLOQUEIO_S = 15 * 60

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store')
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'Método não permitido.' })
    }

    if (!senhaConfigurada()) {
        return res.status(500).json({ error: 'Senha do painel não configurada no servidor (PAINEL_SENHA).' })
    }

    // Conta a tentativa antes de conferir a senha: depois de 5 seguidas na
    // janela de 15 min, nem a senha certa entra até o bloqueio expirar.
    if (await excedeuLimite(req, 'login', { max: MAX_TENTATIVAS, janelaS: BLOQUEIO_S })) {
        return res.status(429).json({ error: 'Muitas tentativas. Aguarde 15 minutos.' })
    }

    const ua = req.headers['user-agent'] || ''
    const { estado, cidade } = regiaoDaRequisicao(req.headers)
    const contexto = { estado, cidade, dispositivo: tipoDispositivo(ua), navegador: navegador(ua) }

    if (!senhaCorreta(req.body?.senha)) {
        await Promise.all([
            registrarAcessoPainel({ ok: false, ...contexto }),
            incrementar(['t:login_falha']),
        ])
        return res.status(401).json({ error: 'Senha incorreta.' })
    }

    await Promise.all([
        zerarLimite(req, 'login'),
        registrarAcessoPainel({ ok: true, ...contexto }),
        incrementar(['t:login_ok']),
    ])

    const { token, expira } = criarToken()
    res.setHeader('Set-Cookie', cookieSessao(token))
    return res.status(200).json({ ok: true, expira })
}
