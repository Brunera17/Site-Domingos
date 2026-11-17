import BlocoDestaque from './BlocoDestaque'
import fotoLilian from '../../assets/colaboradores/otimizadas/LILIAN_RECORTE.webp'

// Departamento Pessoal: foto à direita e fundo cinza, alternando com o
// bloco do Societário (foto à esquerda, fundo preto). Textos vêm do serviço
// "Assessoria Pessoal" (src/data/services.js).
export default function DpDestaqueSection() {
    return (
        <BlocoDestaque
            eyebrow="Departamento Pessoal"
            title={<>Sua equipe <span className="text-orange-500">em dia, sem dor de cabeça</span></>}
            subtitle="Folha de pagamento, admissões, demissões e conformidade total com eSocial e legislação trabalhista."
            paragrafo="Coordenado pela Lilian, o time de DP gerencia toda a relação trabalhista da sua empresa com segurança jurídica: da admissão ao desligamento, passando por folha, férias, 13º e muito mais."
            destaques={[
                'Elaboração e processamento da folha de pagamento.',
                'Gestão de admissões e demissões.',
                'Envio das obrigações do eSocial.',
                'Cálculo de férias, 13º salário, rescisões e encargos (FGTS e INSS).',
            ]}
            link={{ to: '/servicos/assessoria-dp-pessoal', texto: 'Conheça o Departamento Pessoal' }}
            foto={fotoLilian}
            fotoAlt="Lilian, Coordenadora de Departamento Pessoal da Domingos Assessoria"
            fotoLargura={800}
            fotoAltura={1206}
            legenda={{ nome: 'Lilian', cargo: 'Coordenadora DP' }}
            lado="direita"
            fundo="cinza"
        />
    )
}
