import React from 'react'

// jsdom não roda animação de verdade: sem isso, o AnimatePresence do
// framer-motion nunca "completa" a transição de saída/entrada, e o
// conteúdo novo não aparece a tempo nos testes. Como o que se testa nos
// componentes que usam isso é lógica de estado (seleção, autoplay,
// navegação), não a transição visual em si, trocamos motion/AnimatePresence
// por um passthrough síncrono — usar via
// `vi.mock('framer-motion', () => createFramerMotionMock())` no topo do
// arquivo de teste.
export function createFramerMotionMock() {
    const stripMotionProps = (props) => {
        // eslint-disable-next-line no-unused-vars -- descartar de propósito: são só props de animação, não atributos de DOM válidos
        const { initial, animate, exit, transition, whileHover, whileTap, variants, custom, layout, ...domProps } = props
        return domProps
    }

    return {
        motion: new Proxy({}, {
            get: (_target, tag) => {
                const Component = React.forwardRef((props, ref) =>
                    React.createElement(tag, { ...stripMotionProps(props), ref }, props.children)
                )
                Component.displayName = `motion.${String(tag)}`
                return Component
            },
        }),
        AnimatePresence: ({ children }) => children,
    }
}
