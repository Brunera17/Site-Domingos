import BlocoDestaque from './BlocoDestaque'
import fotoDayane from '../../assets/colaboradores/otimizadas/DAYANE_RECORTE.webp'

// Versão alternativa do bloco da equipe, para comparar com o carrossel
// (EquipeSection): texto à esquerda e a Dayane recortada à direita, fundo cinza.
export default function EquipeDestaqueSection() {
    return (
        <BlocoDestaque
            eyebrow="Nosso time em Itaí"
            title={<>Quem cuida da <span className="text-orange-500">sua empresa</span></>}
            subtitle="Mais de 30 colaboradores no nosso escritório em Itaí-SP, divididos entre contábil, fiscal, departamento pessoal, societário e BPO financeiro."
            paragrafo="Fundado em Itaí por Marcelo Domingos, o escritório cresceu junto com o interior paulista: hoje são mais de 530 empresas atendidas em 80 cidades de 14 estados, sem perder o atendimento próximo de quem conhece o cliente pelo nome."
            destaques={[
                'Cada área tem um coordenador responsável: contábil, fiscal, societário e departamento pessoal.',
                'Gerência de relacionamento dedicada a acompanhar a sua empresa de perto.',
                'Atendimento presencial em Itaí e remoto para empresas de todo o Brasil.',
            ]}
            numeros={[
                { valor: '30+', label: 'Colaboradores' },
                { valor: '530+', label: 'Clientes' },
                { valor: '10+', label: 'Anos' },
            ]}
            link={{ to: '/sobre', texto: 'Conheça nossa história e equipe' }}
            foto={fotoDayane}
            fotoAlt="Dayane, Gerente de Relacionamentos da Domingos Assessoria"
            fotoLargura={800}
            fotoAltura={1210}
            legenda={{ nome: 'Dayane', cargo: 'Gerente de Relacionamentos' }}
            lado="direita"
            fundo="cinza"
        />
    )
}
