import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";

function MainLayout() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  return (
    <>
      <Header />
      <main className="container main__inner" id="main-content">
        <Outlet context={{ openContactModal }} />
      </main>
      <Footer onOpenContact={openContactModal} />
      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} onClose={closeContactModal} />
    </>
  );
}

export default MainLayout;