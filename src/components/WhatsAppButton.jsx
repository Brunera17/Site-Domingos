import { useLocation } from 'react-router-dom'
import WhatsAppIcon from './icons/WhatsAppIcon'
import { buildWhatsAppLink, getWhatsAppMessageForPath } from '../utils/whatsapp'

export default function WhatsAppButton() {
    const { pathname } = useLocation()

    return (
        <a href={buildWhatsAppLink(getWhatsAppMessageForPath(pathname))} target="_blank" rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-lg transition-colors"
            aria-label="WhatsApp">
            <WhatsAppIcon className="w-7 h-7" />
        </a>
    )
}
