import BlocoDestaque from './BlocoDestaque'
import fotoOdair from '../../assets/colaboradores/otimizadas/ODAIR_RECORTE.webp'

// Departamento Fiscal: foto à esquerda e fundo preto, para alternar com o
// bloco da equipe (foto à direita, fundo cinza). Textos vêm do serviço
// "Assessoria Fiscal" (src/data/services.js).
export default function FiscalDestaqueSection() {
    return (
        <BlocoDestaque
            eyebrow="Departamento Fiscal"
            title={<>Impostos em dia, <span className="text-orange-500">sem pagar a mais</span></>}
            subtitle="Garantimos que sua empresa esteja sempre em dia com o fisco, sem pagar um centavo a mais do que o necessário."
            paragrafo="Coordenado pelo Odair, o time fiscal acompanha todos os meses a apuração e as obrigações da sua empresa, e identifica créditos tributários e oportunidades de recuperação."
            destaques={[
                'Apuração mensal de todos os impostos.',
                'Entrega de obrigações acessórias (SPED, EFD e outras).',
                'Recuperação de créditos fiscais pagos indevidamente.',
                'Planejamento fiscal estratégico e revisão de compliance tributário.',
            ]}
            link={{ to: '/servicos/assessoria-fiscal', texto: 'Conheça a Assessoria Fiscal' }}
            foto={fotoOdair}
            fotoAlt="Odair, Coordenador Fiscal da Domingos Assessoria"
            fotoLargura={800}
            fotoAltura={1301}
            legenda={{ nome: 'Odair', cargo: 'Coordenador Fiscal' }}
            lado="esquerda"
            fundo="preto"
        />
    )
}
