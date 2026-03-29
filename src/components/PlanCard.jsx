export default function PlanCard({ name, price, desc, highlight }) {
    return (
        <div className={`rounded-2xl border p-6 flex flex-col justify-between transition hover:-translate-y-1
      ${highlight ? "border-yellow-400 bg-yellow-950" : "border-zinc-800 bg-zinc-900"}`}>

            <div>
                <h3 className="text-xl font-bold uppercase mb-2">
                    {name}
                </h3>

                <p className="text-zinc-400 text-sm mb-6">
                    {desc}
                </p>

                <div className="flex items-end gap-1 mb-6">
                    <span className="text-sm">R$</span>
                    <span className="text-4xl font-extrabold">{price}</span>
                    <span className="text-sm text-zinc-400">/mês</span>
                </div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold">
                Escolher plano
            </button>
        </div>
    );
}