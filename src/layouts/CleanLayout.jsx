import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function CleanLayout() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Outlet />
            <Footer />
            <WhatsAppButton />
        </div>
    );
}