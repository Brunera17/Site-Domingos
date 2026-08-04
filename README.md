# Site Domingos Assessoria

Site institucional da Domingos Assessoria, desenvolvido em React com Vite, Tailwind CSS e Framer Motion.

## Sobre o projeto

Este repositorio contem o codigo-fonte do site institucional da Domingos Assessoria. O site apresenta a empresa, seus servicos e planos, alem de contar com blog, formulario de contato e pagina para candidatos interessados em trabalhar na empresa.

## Funcionalidades

O site conta com pagina inicial, pagina Sobre, listagem de Servicos com pagina de detalhe para cada servico, pagina de Planos, pagina de Proposta comercial, Blog com listagem e pagina individual de cada post, pagina de Contato e pagina Trabalhe Conosco para candidatos. O conteudo das paginas tambem pode ser exportado em PDF, e o site utiliza SEO otimizado com metatags dinamicas.

## Tecnologias utilizadas

React 19, Vite, React Router DOM, Tailwind CSS, Framer Motion, Lucide React, React Helmet Async, html2pdf.js e ESLint.

## Estrutura de pastas

src/assets guarda imagens e arquivos estaticos.
src/components guarda componentes reutilizaveis da interface.
src/context guarda contextos globais da aplicacao.
src/data guarda dados estaticos usados nas paginas.
src/layouts guarda layouts compartilhados entre paginas.
src/pages guarda as paginas da aplicacao, como Home, Sobre, Servicos, Planos, Proposta, Blog, Contato e Trabalhe Conosco.
src/styles guarda os estilos globais.

## Como executar o projeto localmente

E necessario ter o Node.js instalado. Clone o repositorio, instale as dependencias com npm install e inicie o ambiente de desenvolvimento com npm run dev.

Outros comandos disponiveis:

npm run build gera a versao de producao.
npm run preview pre visualiza a build de producao.
npm run lint executa o linter.

## Deploy

O projeto esta configurado para deploy na Vercel.

## Licenca

Projeto privado, de uso exclusivo da Domingos Assessoria.
