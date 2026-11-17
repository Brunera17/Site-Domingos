import BlocoDestaque from './BlocoDestaque'
import fotoPedro from '../../assets/colaboradores/otimizadas/PEDRO_RECORTE.webp'

// Departamento Societário: foto à esquerda e fundo preto, alternando com o
// bloco do Contábil (foto à direita, fundo cinza). Textos vêm do serviço
// "Abertura de Empresas" (src/data/services.js).
export default function SocietarioDestaqueSection() {
    return (
        <BlocoDestaque
            eyebrow="Departamento Societário"
            title={<>Sua empresa <span className="text-orange-500">regular desde o primeiro dia</span></>}
            subtitle="Abertura, alteração e regularização de empresas de forma rápida, segura e sem burocracia."
            paragrafo="Coordenado pelo Pedro, o time societário cuida de todo o processo para que a sua empresa nasça ou se regularize da forma certa, no regime tributário mais vantajoso para o seu perfil."
            destaques={[
                'Abertura de MEI, ME, EPP e demais tipos societários.',
                'Alterações contratuais e societárias.',
                'Obtenção de licenças e alvarás de funcionamento.',
                'Regularização de empresas com pendências fiscais.',
            ]}
            link={{ to: '/servicos/abertura-regularizacao-empresas', texto: 'Conheça a Abertura de Empresas' }}
            foto={fotoPedro}
            fotoAlt="Pedro, Coordenador Societário da Domingos Assessoria"
            fotoLargura={800}
            fotoAltura={1287}
            legenda={{ nome: 'Pedro', cargo: 'Coordenador Societário' }}
            lado="esquerda"
            fundo="preto"
        />
    )
}
