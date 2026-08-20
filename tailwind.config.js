// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E8610A",
        dark: "#0C0C0C",
        card: "#181818",
        border: "#2A2A2A",
        muted: "#777",
        bronze: "#CD7F32",
        silver: "#A8A9AD",
        gold: "#D4AF37",
        diamond: "#38C4D8",
      },
      spacing: {
        "hero-top": "9rem", // pt-36 — offset do header fixo, só em seções de hero
        section: "5rem", // py-20 — ritmo vertical único de seções de conteúdo
      },
      maxHeight: {
        "section-screen": "61.25rem", // 980px — teto das seções h-screen da home, evita vazio em janelas muito altas
      },
      fontSize: {
        display: ["clamp(2.125rem, 4.5vw, 3.4375rem)", { lineHeight: "0.95", fontWeight: "900" }], // H1
        h2: ["1.875rem", { lineHeight: "1.15", fontWeight: "900" }], // título de página (text-3xl)
        "h2-compact": ["clamp(1.5rem, 2.2vw, 1.875rem)", { lineHeight: "1.2", fontWeight: "900" }], // título em seção h-screen da home
        h3: ["1.25rem", { lineHeight: "1.3", fontWeight: "900" }], // subtítulo dentro da página
        "card-title": ["0.875rem", { lineHeight: "1.3", fontWeight: "700" }], // título dentro de card/grid
        "body-lg": ["1.125rem", { lineHeight: "1.625" }], // introduções
        body: ["0.875rem", { lineHeight: "1.625" }], // corpo padrão
        "body-sm": ["0.75rem", { lineHeight: "1.625" }], // legendas
      },
    },
  },
};