import React, { useState } from "react";
import { ShoppingCart, IceCream } from "lucide-react";
import { useCart } from "../context/CartContext";
import DarkModeToggle from "./DarkModeToggle";

const Header = ({ onNavigate, currentPage }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-700 dark:to-purple-800 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <IceCream className="w-8 h-8 text-white" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Heladería Premium
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <DarkModeToggle />
            {currentPage !== "cart" && (
              <button
                onClick={() => onNavigate("cart")}
                className="relative bg-white dark:bg-gray-800 text-pink-500 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
