import { Helmet } from 'react-helmet-async';

/**
 * Organization JSON-LD Schema
 * Informações gerais sobre a organização para Google
 * 
 * Usado principalmente em:
 * - Home.jsx
 * - Sobre.jsx
 */

export default function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Domingos Assessoria Empresarial",
        "alternateName": "Domingos Assessoria",
        "url": "https://domingosassessoria.com.br",
        "logo": "https://domingosassessoria.com.br/logo.png",
        "description": "Escritório de contabilidade, consultoria fiscal e assessoria empresarial especializado em pequenas e médias empresas no interior paulista",
        "foundingDate": "2017",
        "foundingLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Itaí",
                "addressRegion": "SP",
                "addressCountry": "BR"
            }
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Antônio Justino Viera, 350",
            "addressLocality": "Itaí",
            "addressRegion": "SP",
            "postalCode": "18730-136",
            "addressCountry": "BR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "telephone": "+55 14 99658-0459",
            "email": "contato@domingosassessoria.com.br",
            "areaServed": "BR",
            "availableLanguage": "pt-BR"
        },
        "sameAs": [
            "https://www.linkedin.com/company/domingos-assessoria",
            "https://www.facebook.com/domingosassessoria",
            "https://www.instagram.com/domingosassessoria",
            "https://wa.me/5514996580459"
        ],
        "knowsAbout": [
            "Contabilidade",
            "Consultoria Fiscal",
            "Tributário",
            "Departamento Pessoal",
            "Assessoria Empresarial",
            "Planejamento Fiscal",
            "Legalização de Empresas"
        ],
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "30"
        },
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
