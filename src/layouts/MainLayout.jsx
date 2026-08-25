import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/layout/WhatsAppButton";
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