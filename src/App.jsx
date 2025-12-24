import React, { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import Header from "./components/Header";
import CustomerForm from "./components/CustomerForm";
import ProductCatalog from "./components/ProductCatalog";
import Cart from "./components/Cart";
import ChatAssistant from "./components/ChatAssistant";
import {
  getTiposDeHelados,
  getGustosDeHelados,
  getPostresHelados,
} from "./services/supabase";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [availableProducts, setAvailableProducts] = useState({
    tiposHelados: [],
    gustosHelados: [],
    postresHelados: [],
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const [tipos, gustos, postres] = await Promise.all([
        getTiposDeHelados(),
        getGustosDeHelados(),
        getPostresHelados(),
      ]);
      setAvailableProducts({
        tiposHelados: tipos,
        gustosHelados: gustos,
        postresHelados: postres,
      });
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <CustomerForm onNext={() => handleNavigate("catalog")} />;
      case "catalog":
        return <ProductCatalog />;
      case "cart":
        return <Cart onNavigate={handleNavigate} />;
      default:
        return <CustomerForm onNext={() => handleNavigate("catalog")} />;
    }
  };

  return (
    <DarkModeProvider>
      <CartProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />

          <main className="container mx-auto px-4 py-8 pb-20">
            {renderPage()}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 dark:bg-gray-950 text-white py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm">
                © 2025 Heladería Premium - Aplicación con IA Conversacional
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Desarrollado por Mario Esteban Mateo
              </p>
            </div>
          </footer>

          {/* Chat Assistant */}
          <ChatAssistant availableProducts={availableProducts} />
        </div>
      </CartProvider>
    </DarkModeProvider>
  );
}

export default App;
