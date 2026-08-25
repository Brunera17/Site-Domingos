import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// jsdom não implementa scrollIntoView (lança "Not implemented") — vários
// componentes do site chamam isso ao navegar/focar seções.
Element.prototype.scrollIntoView = () => {}

afterEach(() => {
    cleanup()
})
