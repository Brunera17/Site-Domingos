export default function SectionHeading({
    eyebrow,
    title,
    subtitle,
    align = 'left',
    action,
    variant = 'default',
    className = '',
}) {
    const isCenter = align === 'center'
    const titleSize = variant === 'compact' ? 'text-h2-compact' : 'text-h2'

    return (
        <div className={`${isCenter ? 'text-center' : ''} ${className}`}>
            <div className={`flex flex-col gap-4 ${action ? 'md:flex-row md:items-end md:justify-between' : ''}`}>
                <div>
                    {eyebrow && (
                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                            {eyebrow}
                        </span>
                    )}
                    <h2 className={`${titleSize} text-white`}>
                        {title}
                    </h2>
                    {subtitle && (
                        <p className={`text-body-lg text-zinc-400 mt-3 ${isCenter ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>
                            {subtitle}
                        </p>
                    )}
                </div>
                {action && <div className="shrink-0">{action}</div>}
            </div>
        </div>
    )
}
