import { motion } from "framer-motion";
import { usePlan } from "../context/PlanContext";
import { useNavigate } from "react-router-dom";

const plans = [
    { name: "Bronze", price: 490 },
    { name: "Prata", price: 890 },
    { name: "Ouro", price: 1490 },
    { name: "Diamante", price: 2490 },
];

export default function Planos() {
    const { setSelectedPlan } = usePlan();
    const navigate = useNavigate();

    function handleSelect(plan) {
        setSelectedPlan(plan);
        navigate("/proposta");
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
            {plans.map((plan, i) => (
                <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
                >
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-4xl font-black mt-4">
                        R$ {plan.price}
                    </p>
                    <button
                        type="button"
                        className="mt-6 w-full bg-orange-500 py-2 rounded cursor-pointer"
                        onClick={() => handleSelect(plan)}
                    >
                        Selecionar
                    </button>
                </motion.div>
            ))}
        </div>
    );
}