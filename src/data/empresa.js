// Dados oficiais da empresa (nome, endereço, telefone, e-mail, horário e
// redes). Fonte única para o rodapé, a página local e os schemas que o Google
// lê — o parecer de SEO pede que esses dados (NAP) sejam idênticos em todo
// lugar. Se algo mudar, mude só aqui.

export const SITE_URL = 'https://domingosassessoria.com.br'

export const empresa = {
    nome: 'Domingos Assessoria Empresarial',
    telefone: '+55 14 99658-0459',
    telefoneExibicao: '(14) 99658-0459',
    email: 'sucessodocliente@domingosassessoria.com.br',
    endereco: {
        rua: 'Av. Antônio Justino Viera, 350',
        bairro: 'Jardim Planalto',
        cidade: 'Itaí',
        uf: 'SP',
        cep: '18730-136',
    },
    horario: {
        dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        abre: '08:00',
        fecha: '17:00',
        texto: 'Seg – Sex: 8h às 17h',
    },
    mapa: 'https://maps.google.com/?q=Av.+Antônio+Justino+Viera,+350,+Itaí,+SP',
    redes: {
        instagram: 'https://instagram.com/domingosempresarial',
        facebook: 'https://facebook.com/domingosempresarial',
        linkedin: 'https://linkedin.com/company/domingosempresarial',
    },
}

export const enderecoCompleto = `${empresa.endereco.rua} — ${empresa.endereco.bairro}, ${empresa.endereco.cidade} - ${empresa.endereco.uf}, ${empresa.endereco.cep}`

// Bloco PostalAddress reutilizado pelos schemas
export const enderecoSchema = {
    '@type': 'PostalAddress',
    streetAddress: empresa.endereco.rua,
    addressLocality: empresa.endereco.cidade,
    addressRegion: empresa.endereco.uf,
    postalCode: empresa.endereco.cep,
    addressCountry: 'BR',
}

// Sede em Itaí-SP, atendimento em todo o Brasil
export const areaAtendidaSchema = [
    { '@type': 'City', name: 'Itaí' },
    { '@type': 'Country', name: 'Brasil' },
]
