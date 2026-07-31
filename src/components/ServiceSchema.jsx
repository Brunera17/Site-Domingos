import { Helmet } from 'react-helmet-async';

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
    areaServed = ["SP", "MG", "PR", "RS", "GO", "DF", "MS", "MT", "BA", "PE", "CE", "PA", "SC", "ES"],
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "serviceType": serviceType,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Domingos Assessoria Empresarial",
            "url": "https://domingosassessoria.com.br",
            "telephone": "+55 14 99658-0459",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Antônio Justino Viera, 350",
                "addressLocality": "Itaí",
                "addressRegion": "SP",
                "postalCode": "18730-136",
                "addressCountry": "BR"
            }
        },
        "url": url,
        "areaServed": areaServed.map(region => ({
            "@type": "State",
            "name": region
        })),
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
