import Hero from '../components/Hero'
import ServicosSection from '../components/ServicosSection'
import SetoresSection from '../components/SetoresSection'
import DiferenciaisSection from '../components/Diferenciais'
import TestemunhosSection from '../components/Testemunho'
import CTASection from '../components/Cta'

export default function Home() {
    return (
        <>
            <Hero />
            <ServicosSection />
            <SetoresSection />
            <DiferenciaisSection />
            <TestemunhosSection />
            <CTASection /> 
        </>
    )
}