import SEOHead from '../components/seo/SEOHead'
import Hero from '../components/sections/Hero'
import ServicosSection from '../components/sections/ServicosSection'
import SetoresSection from '../components/sections/SetoresSection'
import DiferenciaisSection from '../components/sections/Diferenciais'
import TestemunhosSection from '../components/sections/Testemunho'
import CTASection from '../components/sections/Cta'
import EstruturaSection from '../components/sections/Estrutura'
import TrocaContadorSection from '../components/sections/TrocaContador'
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema'
import OrganizationSchema from '../components/seo/OrganizationSchema'

// O gap entre seções h-screen (só existe no desktop; no mobile as seções já
// têm padding próprio) -- variant aplica um degradê suave entre as cores das
// seções vizinhas, evitando um corte seco quando elas alternam preto/cinza.
const Spacer = ({ variant }) => {
    const gradients = {
        toGray: 'md:bg-gradient-to-b md:from-black md:to-zinc-950',
        toBlack: 'md:bg-gradient-to-b md:from-zinc-950 md:to-black',
    }
    return <div className={`hidden md:block h-24 ${variant ? gradients[variant] : ''}`} />
}

export default function Home() {
    return (
        <>
            <SEOHead
                title="Contabilidade em Itaí e Interior Paulista | Domingos"
                description="Escritório de contabilidade em Itaí-SP: contábil, fiscal, DP, consultoria e BPO financeiro para mais de 530 empresas em 80 cidades de 14 estados."
                canonicalPath="/"
                keywords="contabilidade Itaí, contabilidade no interior paulista, escritório de contabilidade Itaí SP, consultoria fiscal, departamento pessoal, BPO financeiro"
            />
            <LocalBusinessSchema />
            <OrganizationSchema />
            
            <Hero />
            <Spacer />
            <ServicosSection />
            <Spacer variant="toGray" />
            <SetoresSection />
            <Spacer variant="toBlack" />
            <DiferenciaisSection />
            <Spacer variant="toGray" />
            <EstruturaSection />
            <Spacer variant="toBlack" />
            <TrocaContadorSection />
            <Spacer variant="toGray" />
            <TestemunhosSection />
            <Spacer variant="toBlack" />
            <CTASection />
            <Spacer variant="toGray" />
        </>
    )
}