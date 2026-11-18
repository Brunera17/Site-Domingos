import { Helmet } from 'react-helmet-async';

/**
 * Componente reutilizável para SEO
 * 
 * Uso:
 * <SEOHead
 *   title="Página Exemplo"
 *   description="Descrição da página"
 *   canonicalPath="/exemplo"
 *   ogImage="https://..."
 * />
 */

export default function SEOHead({
    title = 'Domingos Assessoria Empresarial',
    description = 'Contabilidade, consultoria fiscal e assessoria empresarial em Itaí-SP, com atendimento para empresas de todo o Brasil.',
    canonicalPath = '/',
    ogImage = null,
    ogType = 'website',
    keywords = 'contabilidade, fiscal, tributário, consultoria empresarial',
    noIndex = false,
}) {
    // Domínio oficial da empresa
    const domínio = 'https://domingosassessoria.com.br';
    const canonicalUrl = `${domínio}${canonicalPath}`;
    const imageUrl = ogImage || `${domínio}/og-image.png`;
    // Só acrescenta a marca quando o título ainda não a cita — evita títulos
    // como "Domingos Assessoria Empresarial | ... | Domingos Assessoria".
    const fullTitle = /domingos/i.test(title) ? title : `${title} | Domingos Assessoria`;

    return (
        <Helmet>
            {/* Meta tags básicas */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
            <meta name="language" content="pt-br" />
            <meta name="revisit-after" content="7 days" />
            <meta name="author" content="Domingos Assessoria Empresarial" />

            {/* Open Graph (Redes Sociais) */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Domingos Assessoria" />
            <meta property="og:locale" content="pt_BR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            {/* Canonical URL */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Theme Color */}
            <meta name="theme-color" content="#000000" />

            {/* Apple Touch Icon */}
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

            {/* Preconnect */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </Helmet>
    );
}
