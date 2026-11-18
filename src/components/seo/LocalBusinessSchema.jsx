import { Helmet } from 'react-helmet-async';
import { empresa, enderecoSchema, areaAtendidaSchema, SITE_URL } from '../../data/empresa';

/**
 * LocalBusiness JSON-LD Schema
 * Informa ao Google dados sobre sua empresa
 * 
 * Informações incluídas:
 * - Nome da empresa
 * - Endereço completo
 * - Telefone
 * - Email
 * - Horário de funcionamento
 * - Logo
 * - URL do site
 */

export default function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        "@id": `${SITE_URL}/#escritorio`,
        "name": empresa.nome,
        "image": `${SITE_URL}/logo.png`,
        "logo": `${SITE_URL}/logo.png`,
        "description": "Escritório de contabilidade em Itaí-SP: contábil, fiscal, departamento pessoal, consultoria e BPO financeiro, com atendimento presencial em Itaí e remoto para empresas de todo o Brasil.",
        "address": enderecoSchema,
        "telephone": empresa.telefone,
        "email": empresa.email,
        "url": SITE_URL,
        "hasMap": empresa.mapa,
        "sameAs": Object.values(empresa.redes),
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": empresa.horario.dias,
                "opens": empresa.horario.abre,
                "closes": empresa.horario.fecha
            }
        ],
        "areaServed": areaAtendidaSchema,
        "priceRange": "$$"
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
