import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
}