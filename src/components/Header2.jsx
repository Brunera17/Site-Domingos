export default function Header2() {
    return (
        <header className="sticky top-0 z-50 bg-black border-b border-zinc-800 px-6 py-3 flex justify-between items-center">

            <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-orange-500 rounded"></div>

                <div>
                    <h1 className="text-orange-500 font-bold uppercase tracking-wide text-sm">
                        Domingos Assessoria
                    </h1>
                    <p className="text-xs text-zinc-400">
                        CRC Nº 2SP 037.257/O-8
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => window.print()}
                    className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded"
                >
                    Imprimir
                </button>

                <a
                    href="https://wa.me/5514996580459"
                    target="_blank"
                    className="bg-green-500 px-4 py-2 rounded text-white"
                >
                    WhatsApp
                </a>
            </div>
        </header>
    );
}