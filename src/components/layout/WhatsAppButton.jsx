import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import WhatsAppIcon from '../icons/WhatsAppIcon'
import { buildWhatsAppLink, getWhatsAppMessageForPath } from '../../utils/whatsapp'

// Tempo sem rolar a página até o balão aparecer.
const TEMPO_PARADO_MS = 8000
// Quem fechou o balão no "X" não o vê de novo até fechar a aba.
const CHAVE_FECHADO = 'wa-balao-fechado'

function foiFechado() {
    try {
        return sessionStorage.getItem(CHAVE_FECHADO) === '1'
    } catch {
        return false
    }
}

export default function WhatsAppButton() {
    const { pathname } = useLocation()
    const link = buildWhatsAppLink(getWhatsAppMessageForPath(pathname))

    // Balão "Ficou com alguma dúvida?": aparece quando a pessoa fica um tempo
    // parada (sem rolar) e some assim que ela volta a rolar a página. Volta a
    // aparecer sempre que ela parar de novo.
    const [balao, setBalao] = useState(false)
    const timerRef = useRef(null)
    const fechadoRef = useRef(false)

    useEffect(() => {
        fechadoRef.current = foiFechado()

        const agendar = () => {
            clearTimeout(timerRef.current)
            if (fechadoRef.current) return
            timerRef.current = setTimeout(() => {
                if (document.visibilityState === 'visible') setBalao(true)
            }, TEMPO_PARADO_MS)
        }

        // Rolar (roda do mouse, dedo ou teclado) esconde o balão e reinicia a contagem
        const mexeu = () => {
            setBalao(false)
            agendar()
        }

        agendar()
        const opcoes = { passive: true }
        window.addEventListener('scroll', mexeu, opcoes)
        window.addEventListener('wheel', mexeu, opcoes)
        window.addEventListener('touchmove', mexeu, opcoes)
        window.addEventListener('keydown', mexeu)
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('scroll', mexeu, opcoes)
            window.removeEventListener('wheel', mexeu, opcoes)
            window.removeEventListener('touchmove', mexeu, opcoes)
            window.removeEventListener('keydown', mexeu)
        }
    }, [])

    // Ao trocar de página, esconde o balão e recomeça a contagem
    useEffect(() => {
        setBalao(false)
    }, [pathname])

    const fechar = () => {
        fechadoRef.current = true
        clearTimeout(timerRef.current)
        setBalao(false)
        try {
            sessionStorage.setItem(CHAVE_FECHADO, '1')
        } catch {
            // sessionStorage bloqueado — fecha só nesta página
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-none">
            {/* Balão */}
            <div
                role="status"
                aria-live="polite"
                className={`relative mb-2 w-60 sm:w-64 origin-bottom-right transition-all duration-300 ${
                    balao ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                }`}
            >
                {balao && (
                    <div className="relative pointer-events-auto bg-white text-zinc-900 rounded-2xl rounded-br-sm shadow-2xl p-4 pr-9">
                        <button
                            type="button"
                            onClick={fechar}
                            aria-label="Fechar mensagem"
                            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                        >
                            <X size={14} />
                        </button>
                        <p className="font-bold text-sm leading-snug">Ficou com alguma dúvida?</p>
                        <p className="text-zinc-600 text-sm leading-snug mt-1">
                            Fale com um especialista agora pelo WhatsApp.
                        </p>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setBalao(false)}
                            className="inline-block mt-3 text-sm font-bold text-green-600 hover:text-green-700"
                        >
                            Conversar agora →
                        </a>
                    </div>
                )}
            </div>

            {/* Botão */}
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto shrink-0 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-lg transition-colors"
                aria-label="WhatsApp"
            >
                <WhatsAppIcon className="w-7 h-7" />
            </a>
        </div>
    )
}
