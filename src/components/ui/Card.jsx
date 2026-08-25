const VARIANT_STYLES = {
    default: 'bg-zinc-900 border border-zinc-800',
    featured: 'bg-zinc-900 border border-orange-500/50 ring-1 ring-orange-500/20',
}

const HOVER_BORDER_STYLES = {
    orange: 'hover:border-orange-500/40',
    zinc: 'hover:border-zinc-700',
    none: '',
}

/**
 * Card base reutilizável — encapsula o padrão visual zinc/laranja usado em
 * todo o site (fundo zinc-900, borda zinc-800, variante "featured" com
 * destaque em laranja). `className` é sempre aplicado por último, então
 * pode sobrescrever qualquer estilo padrão quando necessário.
 */
export default function Card({
    variant = 'default',
    hoverBorder = 'orange',
    rounded = 'rounded-2xl',
    padding = 'p-5',
    className = '',
    children,
    ...props
}) {
    return (
        <div
            className={`relative flex flex-col transition-all duration-300 ${VARIANT_STYLES[variant]} ${rounded} ${padding} ${HOVER_BORDER_STYLES[hoverBorder]} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}
