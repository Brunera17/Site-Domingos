import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEOHead from '../components/SEOHead'

export default function TermosUso() {
    return (
        <div className="bg-black">
            <SEOHead
                title="Termos de Uso"
                description="Condições de uso do site da Domingos Assessoria Empresarial."
                canonicalPath="/termos-uso"
            />

            {/* ── HERO ── */}
            <section className="pt-36 pb-16 px-6 md:px-8 lg:px-10 bg-black border-b border-zinc-900">
                <div className="max-w-3xl mx-auto">
                    <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-orange-400 uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Documento legal
                    </span>
                    <h1 className="font-black text-white leading-[0.95] mb-4" style={{ fontSize: 'clamp(31px, 4.2vw, 45px)' }}>
                        Termos de <span className="text-orange-500">Uso</span>
                    </h1>
                    <p className="text-zinc-400 text-sm">Última atualização: agosto de 2026</p>
                </div>
            </section>

            {/* ── CONTEÚDO ── */}
            <section className="py-16 px-6 md:px-8 lg:px-10 bg-black">
                <div className="max-w-3xl mx-auto space-y-10 text-zinc-400 text-base leading-relaxed">

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">1. Aceitação dos termos</h2>
                        <p>
                            Ao acessar e utilizar o site da <strong className="text-white">Domingos Assessoria Empresarial</strong>, você
                            concorda com os termos e condições descritos nesta página. Se você não concorda com estes termos,
                            recomendamos que não utilize o site.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">2. Finalidade do site</h2>
                        <p>
                            Este site tem finalidade institucional e informativa: apresentar os serviços, planos e a estrutura
                            da Domingos Assessoria Empresarial, além de disponibilizar canais de contato e candidatura a vagas.
                            As informações aqui publicadas não substituem uma consultoria contábil, fiscal ou jurídica
                            personalizada — para isso, entre em contato com nossa equipe.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">3. Uso dos formulários</h2>
                        <p>
                            Ao preencher os formulários de Contato ou Trabalhe Conosco, você declara que as informações
                            fornecidas são verdadeiras e se responsabiliza pela veracidade dos dados enviados. O uso desses
                            formulários para fins fraudulentos, ofensivos ou ilegais é expressamente proibido.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">4. Propriedade intelectual</h2>
                        <p>
                            Todo o conteúdo deste site — textos, imagens, logotipo, identidade visual e estrutura — é de
                            propriedade da Domingos Assessoria Empresarial ou usado sob licença, sendo protegido pela
                            legislação de direitos autorais e propriedade industrial. É proibida a reprodução total ou
                            parcial sem autorização prévia.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">5. Links para sites de terceiros</h2>
                        <p>
                            Este site pode conter links para serviços de terceiros, como WhatsApp e redes sociais. Não nos
                            responsabilizamos pelo conteúdo, práticas de privacidade ou disponibilidade desses serviços
                            externos.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">6. Limitação de responsabilidade</h2>
                        <p>
                            Envidamos esforços para manter as informações deste site atualizadas e precisas, mas não
                            garantimos a ausência de erros. A Domingos Assessoria Empresarial não se responsabiliza por
                            danos decorrentes do uso ou da indisponibilidade temporária do site.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">7. Alterações destes termos</h2>
                        <p>
                            Podemos atualizar estes Termos de Uso periodicamente, sem aviso prévio. A data da última
                            atualização estará sempre indicada no topo desta página.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-xl mb-3">8. Legislação aplicável</h2>
                        <p>
                            Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da
                            comarca de Itaí/SP para dirimir eventuais controvérsias, com renúncia a qualquer outro, por mais
                            privilegiado que seja.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-zinc-900">
                        <Link to="/contato" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors">
                            Dúvidas sobre estes termos? Fale com a gente <ArrowRight size={14} />
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    )
}
