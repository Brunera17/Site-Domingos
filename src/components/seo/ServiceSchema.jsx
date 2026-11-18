import { Helmet } from 'react-helmet-async';
import { empresa, enderecoSchema, areaAtendidaSchema, SITE_URL } from '../../data/empresa';

/**
 * Service JSON-LD Schema
 * Informa ao Google sobre os serviços da empresa
 * 
 * Usado em:
 * - ServicoDetalhe.jsx (dinâmico por serviço)
 * - Servicos.jsx (lista de serviços)
 * 
 * Exemplo de uso:
 * <ServiceSchema
 *   name="Assessoria Contábil"
 *   description="Escrituração contábil completa..."
 *   serviceType="AccountingService"
 * />
 */

export default function ServiceSchema({
    name = "Assessoria Contábil",
    description = "Serviços contábeis especializados",
    serviceType = "ProfessionalService",
    url = "https://domingosassessoria.com.br/servicos",
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "serviceType": serviceType,
        "provider": {
            "@type": "AccountingService",
            "@id": `${SITE_URL}/#escritorio`,
            "name": empresa.nome,
            "url": SITE_URL,
            "telephone": empresa.telefone,
            "address": enderecoSchema
        },
        "url": url,
        "areaServed": areaAtendidaSchema,
        "availableLanguage": "pt-BR",
        "serviceAvailability": "https://schema.org/OnSiteServiceDelivery",
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
