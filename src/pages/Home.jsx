import SEOHead from '../components/seo/SEOHead'
import Hero from '../components/sections/Hero'
import ServicosSection from '../components/sections/ServicosSection'
import SetoresSection from '../components/sections/SetoresSection'
import DiferenciaisSection from '../components/sections/Diferenciais'
import TestemunhosSection from '../components/sections/Testemunho'
import CTASection from '../components/sections/Cta'
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
                title="Domingos Assessoria Empresarial | Contabilidade e Consultoria Fiscal"
                description="Contabilidade, consultoria fiscal, tributária e assessoria empresarial para pequenas e médias empresas no interior paulista. Mais de 10 anos de expertise."
                canonicalPath="/"
                keywords="contabilidade, consultoria fiscal, tributário, planejamento fiscal, departamento pessoal, assessoria empresarial, interior paulista"
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
            <TestemunhosSection />
            <Spacer variant="toBlack" />
            <CTASection />
            <Spacer variant="toGray" />
        </>
    )
}