import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEOHead from '../components/SEOHead'

export default function PoliticaPrivacidade() {
    return (
        <div className="bg-black">
            <SEOHead
                title="Política de Privacidade"
                description="Como a Domingos Assessoria Empresarial coleta, usa e protege seus dados pessoais."
                canonicalPath="/politica-privacidade"
            />

            {/* ── HERO ── */}
            <section className="pt-36 pb-16 px-6 md:px-8 lg:px-10 bg-black border-b border-zinc-900">
                <div className="max-w-3xl mx-auto">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
                        Documento legal
                    </span>
                    <h1 className="font-black text-white leading-[0.95] mb-4" style={{ fontSize: 'clamp(31px, 4.2vw, 45px)' }}>
                        Política de <span className="text-orange-500">Privacidade</span>
                    </h1>
                    <p className="text-zinc-500 text-sm">Última atualização: agosto de 2026</p>
                </div>
            </section>

            {/* ── CONTEÚDO ── */}
            <section className="py-16 px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-3xl mx-auto space-y-10 text-zinc-400 text-base leading-relaxed">

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">1. Quem somos</h2>
                        <p>
                            Esta Política de Privacidade se aplica ao site da <strong className="text-white">Domingos Assessoria Empresarial</strong>,
                            inscrita sob CNPJ [preencher], com sede na Av. Antônio Justino Viera, 350 — Jardim Planalto, Itaí/SP, 18730-136.
                            Somos os controladores dos dados pessoais tratados por meio deste site, nos termos da Lei nº 13.709/2018
                            (Lei Geral de Proteção de Dados — LGPD).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">2. Quais dados coletamos</h2>
                        <p className="mb-3">Coletamos dados pessoais fornecidos diretamente por você ao interagir com o site:</p>
                        <ul className="space-y-2 pl-1">
                            <li>
                                <strong className="text-white">Formulário de Contato:</strong> nome, e-mail, telefone, empresa, assunto e mensagem.
                            </li>
                            <li>
                                <strong className="text-white">Formulário Trabalhe Conosco:</strong> nome, e-mail, telefone, área de interesse,
                                nível de experiência, disponibilidade, motivação e currículo (PDF ou Word).
                            </li>
                            <li>
                                <strong className="text-white">Dados de navegação:</strong> páginas visitadas, tempo de sessão e informações
                                técnicas do dispositivo, coletados de forma agregada e anônima por ferramentas de analytics
                                (Vercel Analytics e Speed Insights).
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">3. Para que usamos seus dados</h2>
                        <ul className="space-y-2 pl-1">
                            <li>Responder às mensagens enviadas pelo formulário de contato;</li>
                            <li>Avaliar candidaturas recebidas pela página Trabalhe Conosco;</li>
                            <li>Entrar em contato para apresentar propostas comerciais solicitadas;</li>
                            <li>Entender e melhorar a experiência de navegação no site, de forma agregada e anônima.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">4. Base legal</h2>
                        <p>
                            Tratamos seus dados com base no seu consentimento (ao preencher e enviar um formulário) e,
                            quando aplicável, na execução de procedimentos preliminares relacionados a um contrato do qual
                            você seja parte ou no nosso legítimo interesse em responder a solicitações de contato.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">5. Com quem compartilhamos</h2>
                        <p>
                            Não vendemos nem alugamos seus dados pessoais. Compartilhamos dados apenas com prestadores de
                            serviço estritamente necessários para o funcionamento do site, como o serviço de envio de
                            e-mail responsável por encaminhar as mensagens dos formulários até nossa equipe.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">6. Por quanto tempo guardamos seus dados</h2>
                        <p>
                            Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política,
                            ou pelo prazo exigido por obrigações legais, findo o qual são excluídos ou anonimizados.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">7. Seus direitos</h2>
                        <p className="mb-3">Nos termos da LGPD, você tem direito a:</p>
                        <ul className="space-y-2 pl-1">
                            <li>Confirmar a existência de tratamento e acessar seus dados;</li>
                            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                            <li>Solicitar a portabilidade dos dados a outro fornecedor;</li>
                            <li>Revogar o consentimento a qualquer momento;</li>
                            <li>Solicitar informações sobre com quem compartilhamos seus dados.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">8. Como exercer seus direitos</h2>
                        <p>
                            Para exercer qualquer um dos direitos acima, entre em contato pelo e-mail{' '}
                            <a href="mailto:sucessodocliente@domingosassessoria.com.br" className="text-orange-500 hover:text-orange-400 transition-colors">
                                sucessodocliente@domingosassessoria.com.br
                            </a>. Responderemos sua solicitação dentro do prazo previsto em lei.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">9. Alterações desta política</h2>
                        <p>
                            Podemos atualizar esta Política de Privacidade periodicamente. A data da última atualização
                            estará sempre indicada no topo desta página.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-zinc-900">
                        <Link to="/contato" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
                            Dúvidas sobre privacidade? Fale com a gente <ArrowRight size={14} />
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    )
}
