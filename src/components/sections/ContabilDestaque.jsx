import BlocoDestaque from './BlocoDestaque'
import fotoNelson from '../../assets/colaboradores/otimizadas/NELSON_RECORTE.webp'

// Departamento Contábil: foto à direita e fundo cinza, alternando com o
// bloco do Fiscal (foto à esquerda, fundo preto). Textos vêm do serviço
// "Assessoria Contábil" (src/data/services.js).
export default function ContabilDestaqueSection() {
    return (
        <BlocoDestaque
            eyebrow="Departamento Contábil"
            title={<>Sua contabilidade <span className="text-orange-500">em dia e estratégica</span></>}
            subtitle="Cuidamos de toda a vida contábil da sua empresa com precisão e estratégia."
            paragrafo="Coordenado pelo Nelson, o time contábil mantém seus registros em dia, garante conformidade e identifica oportunidades reais de economia fiscal para a sua empresa pagar menos impostos, dentro da lei."
            destaques={[
                'Escrituração contábil completa e atualizada.',
                'Elaboração de balanços e demonstrações financeiras.',
                'Planejamento tributário personalizado.',
                'Relatórios gerenciais para tomada de decisão.',
            ]}
            link={{ to: '/servicos/assessoria-contabil', texto: 'Conheça a Assessoria Contábil' }}
            foto={fotoNelson}
            fotoAlt="Nelson, Coordenador Contábil da Domingos Assessoria"
            fotoLargura={800}
            fotoAltura={1005}
            legenda={{ nome: 'Nelson', cargo: 'Coordenador Contábil' }}
            suavizarLados
            lado="direita"
            fundo="cinza"
        />
    )
}
