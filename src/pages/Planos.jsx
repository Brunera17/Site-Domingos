import { useState } from "react";
import "../styles/Planos.css";

export default function Planos() {
    const [annual, setAnnual] = useState(false);

    const toggleBilling = () => {
        setAnnual(!annual);
    };

    const getPrice = (mensal, anual) => {
        return annual ? anual : mensal;
    };

    return (
        <>
            {/* HERO */}
            <section className="hero">
                <div className="hero-eyebrow">
                    <span></span>
                    Domingos Assessoria Empresarial · CRC Nº 2SP 037.257/O-8
                    <span></span>
                </div>

                <h1>
                    Escolha o plano
                    <br />
                    <em>certo</em> para sua
                    <br />
                    empresa
                </h1>

                <p className="hero-sub">
                    Contabilidade consultiva, planejamento fiscal e compliance integrados
                    em quatro níveis de cobertura — do essencial ao estratégico.
                </p>

                <div className="hero-badges">
                    <div className="badge">
                        <div className="badge-dot"></div>Atendimento 100% digital
                    </div>
                    <div className="badge">
                        <div className="badge-dot"></div>+530 clientes ativos
                    </div>
                    <div className="badge">
                        <div className="badge-dot"></div>14 estados · 85 cidades
                    </div>
                    <div className="badge">
                        <div className="badge-dot"></div>Equipe multidisciplinar
                    </div>
                </div>
            </section>

            {/* TOGGLE */}
            <div className="billing-wrap">
                <span className={`billing-label ${!annual && "active"}`}>
                    Mensal
                </span>

                <div
                    className={`toggle-pill ${annual ? "annual" : ""}`}
                    onClick={toggleBilling}
                >
                    <div className="toggle-knob"></div>
                </div>

                <span className={`billing-label ${annual && "active"}`}>
                    Anual
                </span>

                {annual && <span className="discount-badge show">2 meses grátis</span>}
            </div>

            {/* PLANS */}
            <section className="plans-grid">

                {/* BRONZE */}
                <div className="plan-card plan-bronze">
                    <div className="tier-badge">
                        <div className="tier-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                        <span className="tier-name">Bronze</span>
                    </div>

                    <p className="plan-desc">
                        Compliance essencial para empresas do Simples Nacional.
                    </p>

                    <div className="price-row">
                        <span className="price-currency">R$</span>
                        <span className="price-value">
                            {getPrice(490, 408)}
                        </span>
                        <span className="price-period">/mês</span>
                    </div>

                    <a
                        href="https://wa.me/5514996580459"
                        className="cta-btn cta-outline"
                    >
                        Solicitar proposta
                    </a>
                </div>

                {/* PRATA */}
                <div className="plan-card plan-prata">
                    <div className="tier-badge">
                        <div className="tier-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                        <span className="tier-name">Prata</span>
                    </div>

                    <p className="plan-desc">
                        Estrutura completa para empresas em crescimento.
                    </p>

                    <div className="price-row">
                        <span className="price-currency">R$</span>
                        <span className="price-value">
                            {getPrice(890, 741)}
                        </span>
                        <span className="price-period">/mês</span>
                    </div>

                    <a
                        href="https://wa.me/5514996580459"
                        className="cta-btn cta-outline"
                    >
                        Solicitar proposta
                    </a>
                </div>

                {/* OURO */}
                <div className="plan-card plan-ouro featured">
                    <div className="tier-badge">
                        <div className="tier-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                        <span className="tier-name">Ouro</span>
                        <span className="popular-tag">Mais popular</span>
                    </div>

                    <p className="plan-desc">
                        Gestão contábil completa com estratégia.
                    </p>

                    <div className="price-row">
                        <span className="price-currency">R$</span>
                        <span className="price-value">
                            {getPrice(1690, 1408)}
                        </span>
                        <span className="price-period">/mês</span>
                    </div>

                    <a
                        href="https://wa.me/5514996580459"
                        className="cta-btn cta-solid"
                    >
                        Solicitar proposta
                    </a>
                </div>

            </section>
        </>
    );
}