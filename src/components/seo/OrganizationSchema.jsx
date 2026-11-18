import { Helmet } from 'react-helmet-async';
import { empresa, enderecoSchema, SITE_URL } from '../../data/empresa';

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
        "description": "Escritório de contabilidade, consultoria fiscal e assessoria empresarial para pequenas e médias empresas, com sede em Itaí-SP e atendimento em todo o Brasil",
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
        "address": enderecoSchema,
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "telephone": empresa.telefone,
            "email": empresa.email,
            "areaServed": "BR",
            "availableLanguage": "pt-BR"
        },
        "sameAs": [...Object.values(empresa.redes), "https://wa.me/5514996580459"],
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
