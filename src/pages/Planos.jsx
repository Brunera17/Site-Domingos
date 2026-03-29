import { motion } from "framer-motion";
import { usePlan } from "../context/PlanContext";
import { useNavigate } from "react-router-dom";

const plans = [
    { name: "Bronze", price: 490, color: "from-[#CD7F32] to-transparent" },
    { name: "Prata", price: 890, color: "from-[#A8A9AD] to-transparent" },
    { name: "Ouro", price: 1490, color: "from-[#D4AF37] to-transparent", featured: true },
    { name: "Diamante", price: 2490, color: "from-[#38C4D8] to-transparent" },
];

export default function Planos() {
    const { setSelectedPlan } = usePlan();
    const navigate = useNavigate();

    function handleSelect(plan) {
        setSelectedPlan(plan);
        navigate("/proposta");
    }

    return (
        <div className="min-h-screen bg-[#0C0C0C] text-white px-6 py-20">

            {/* HERO */}
            <div className="text-center mb-16">
                <h1 className="text-6xl font-black uppercase tracking-tight">
                    Escolha o plano <span className="text-orange-500 italic">certo</span>
                </h1>
                <p className="text-zinc-400 mt-4">
                    Contabilidade consultiva com níveis estratégicos
                </p>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.04 }}
                        className={`relative rounded-2xl p-6 border transition cursor-pointer
            ${plan.featured
                                ? "bg-[#1A1700] border-yellow-400 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                                : "bg-[#181818] border-[#2A2A2A]"}`}
                        onClick={() => handleSelect(plan)}
                    >

                        {/* GLOW TOP */}
                        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${plan.color}`} />

                        {/* NOME */}
                        <h3 className={`text-xl font-bold uppercase mb-2
              ${plan.featured ? "text-yellow-400" : "text-white"}`}>
                            {plan.name}
                        </h3>

                        {/* DESCRIÇÃO */}
                        <p className="text-zinc-400 text-sm mb-6">
                            Plano ideal para empresas que buscam crescimento
                        </p>

                        {/* PREÇO */}
                        <div className="flex items-end gap-1 mb-6">
                            <span className="text-sm">R$</span>
                            <span className="text-5xl font-black tracking-tight">
                                {plan.price}
                            </span>
                            <span className="text-zinc-400 text-sm">/mês</span>
                        </div>

                        {/* BOTÃO */}
                        <button className={`w-full py-3 rounded font-semibold transition
              ${plan.featured
                                ? "bg-yellow-400 text-black hover:bg-yellow-300"
                                : "bg-orange-500 hover:bg-orange-600"}`}>
                            Escolher plano
                        </button>

                    </motion.div>
                ))}

            </div>
        </div>
    );
}