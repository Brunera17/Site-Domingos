export default function Hero({ title, subtitle }) {
    return (
        <section className="bg-black px-6 py-16 text-center">
            <h1 className="text-5xl font-extrabold text-white uppercase">
                {title}
            </h1>

            <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
                {subtitle}
            </p>
        </section>
    );
}