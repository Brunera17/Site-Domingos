import SEOHead from '../components/SEOHead'
import Hero from '../components/Hero'
import ServicosSection from '../components/ServicosSection'
import SetoresSection from '../components/SetoresSection'
import DiferenciaisSection from '../components/Diferenciais'
import TestemunhosSection from '../components/Testemunho'
import CTASection from '../components/Cta'
import LocalBusinessSchema from '../components/LocalBusinessSchema'
import OrganizationSchema from '../components/OrganizationSchema'

const Spacer = () => <div className="h-24" />

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