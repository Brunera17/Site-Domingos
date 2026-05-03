import Hero from '../components/Hero'
import ServicosSection from '../components/ServicosSection'
import SetoresSection from '../components/SetoresSection'
import DiferenciaisSection from '../components/Diferenciais'
import TestemunhosSection from '../components/Testemunho'
import CTASection from '../components/Cta'

const Spacer = () => <div className="h-24" />

export default function Home() {
    return (
        <>
            <Hero />
            <Spacer />
            <ServicosSection />
            <Spacer />
            <SetoresSection />
            <Spacer />
            <DiferenciaisSection />
            <Spacer />
            <TestemunhosSection />
            <Spacer />
            <CTASection />
            <Spacer />
        </>
    )
}