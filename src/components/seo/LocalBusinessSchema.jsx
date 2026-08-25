import { Helmet } from 'react-helmet-async';

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
        "@type": "LocalBusiness",
        "name": "Domingos Assessoria Empresarial",
        "image": "https://domingosassessoria.com.br/logo.png",
        "description": "Contabilidade, consultoria fiscal e assessoria empresarial para pequenas e médias empresas",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Antônio Justino Viera, 350",
            "addressLocality": "Itaí",
            "addressRegion": "SP",
            "postalCode": "18730-136",
            "addressCountry": "BR"
        },
        "telephone": "+55 14 99658-0459",
        "url": "https://domingosassessoria.com.br",
        "email": "contato@domingosassessoria.com.br",
        "sameAs": [
            "https://www.linkedin.com/company/domingos-assessoria",
            "https://www.facebook.com/domingosassessoria",
            "https://www.instagram.com/domingosassessoria"
        ],
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "13:00"
            }
        ],
        "priceRange": "$$",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "530"
        }
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
