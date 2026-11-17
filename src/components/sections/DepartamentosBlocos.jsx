import { Calculator, FileText, Building2, Users } from 'lucide-react'
import BlocoDepartamento from './BlocoDepartamento'

// Um bloco por departamento, alternando lado do card e cor do fundo.
// Textos seguem os serviços de src/data/services.js.
export default function DepartamentosBlocos() {
    return (
        <>
            <BlocoDepartamento
                icon={Calculator}
                eyebrow="Departamento Contábil"
                title={<>Sua contabilidade <span className="text-orange-500">em dia e estratégica</span></>}
                subtitle="Cuidamos de toda a vida contábil da sua empresa com precisão e estratégia."
                paragrafo="Nosso time contábil mantém seus registros em dia, garante conformidade e identifica oportunidades reais de economia fiscal para a sua empresa pagar menos impostos, dentro da lei."
                destaques={[
                    'Escrituração contábil completa e atualizada.',
                    'Elaboração de balanços e demonstrações financeiras.',
                    'Planejamento tributário personalizado.',
                    'Relatórios gerenciais para tomada de decisão.',
                ]}
                link={{ to: '/servicos/assessoria-contabil', texto: 'Conheça a Assessoria Contábil' }}
                lado="direita"
                fundo="cinza"
            />
            <BlocoDepartamento
                icon={FileText}
                eyebrow="Departamento Fiscal"
                title={<>Impostos em dia, <span className="text-orange-500">sem pagar a mais</span></>}
                subtitle="Garantimos que sua empresa esteja sempre em dia com o fisco, sem pagar um centavo a mais do que o necessário."
                paragrafo="O time fiscal acompanha todos os meses a apuração e as obrigações da sua empresa, e identifica créditos tributários e oportunidades de recuperação."
                destaques={[
                    'Apuração mensal de todos os impostos.',
                    'Entrega de obrigações acessórias (SPED, EFD e outras).',
                    'Recuperação de créditos fiscais pagos indevidamente.',
                    'Planejamento fiscal estratégico e revisão de compliance tributário.',
                ]}
                link={{ to: '/servicos/assessoria-fiscal', texto: 'Conheça a Assessoria Fiscal' }}
                lado="esquerda"
                fundo="preto"
            />
            <BlocoDepartamento
                icon={Building2}
                eyebrow="Departamento Societário"
                title={<>Sua empresa <span className="text-orange-500">regular desde o primeiro dia</span></>}
                subtitle="Abertura, alteração e regularização de empresas de forma rápida, segura e sem burocracia."
                paragrafo="O time societário cuida de todo o processo para que a sua empresa nasça ou se regularize da forma certa, no regime tributário mais vantajoso para o seu perfil."
                destaques={[
                    'Abertura de MEI, ME, EPP e demais tipos societários.',
                    'Alterações contratuais e societárias.',
                    'Obtenção de licenças e alvarás de funcionamento.',
                    'Regularização de empresas com pendências fiscais.',
                ]}
                link={{ to: '/servicos/abertura-regularizacao-empresas', texto: 'Conheça a Abertura de Empresas' }}
                lado="direita"
                fundo="cinza"
            />
            <BlocoDepartamento
                icon={Users}
                eyebrow="Departamento Pessoal"
                title={<>Sua equipe <span className="text-orange-500">em dia, sem dor de cabeça</span></>}
                subtitle="Folha de pagamento, admissões, demissões e conformidade total com eSocial e legislação trabalhista."
                paragrafo="O time de DP gerencia toda a relação trabalhista da sua empresa com segurança jurídica: da admissão ao desligamento, passando por folha, férias, 13º e muito mais."
                destaques={[
                    'Elaboração e processamento da folha de pagamento.',
                    'Gestão de admissões e demissões.',
                    'Envio das obrigações do eSocial.',
                    'Cálculo de férias, 13º salário, rescisões e encargos (FGTS e INSS).',
                ]}
                link={{ to: '/servicos/assessoria-dp-pessoal', texto: 'Conheça o Departamento Pessoal' }}
                lado="esquerda"
                fundo="preto"
            />
        </>
    )
}
