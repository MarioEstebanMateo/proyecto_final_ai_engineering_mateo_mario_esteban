import React from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { generarPDFOrden } from "../utils/pdfGenerator";
import Swal from "sweetalert2";

const Cart = ({ onNavigate }) => {
  const {
    cart,
    customerInfo,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
    clearCustomerInfo,
  } = useCart();

  const total = getTotalPrice();

  const handleRemoveItem = (cartId) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      text: "Se quitará este producto del carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFB3C1",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(cartId);
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "Producto eliminado del carrito",
          confirmButtonColor: "#B4E7CE",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "Agrega productos antes de confirmar",
        confirmButtonColor: "#FFD1B3",
      });
      return;
    }

    Swal.fire({
      title: "¿Confirmar pedido?",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Cliente:</strong> ${customerInfo.nombre} ${
        customerInfo.apellido
      }</p>
          <p class="mb-2"><strong>Teléfono:</strong> ${
            customerInfo.telefono
          }</p>
          <p class="mb-2"><strong>Tipo:</strong> ${
            customerInfo.tipoEntrega === "retiro"
              ? "Retiro en local"
              : "Delivery"
          }</p>
          ${
            customerInfo.tipoEntrega === "delivery"
              ? `<p class="mb-2"><strong>Dirección:</strong> ${customerInfo.direccion}</p>`
              : ""
          }
          <p class="mb-2"><strong>Horario:</strong> ${customerInfo.horario}</p>
          <p class="mt-4 text-xl"><strong>Total: $${total.toFixed(
            2
          )}</strong></p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B4E7CE",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Revisar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Generar PDF
        const ordenData = {
          nombre: customerInfo.nombre,
          apellido: customerInfo.apellido,
          telefono: customerInfo.telefono,
          tipoEntrega: customerInfo.tipoEntrega,
          direccion: customerInfo.direccion,
          horario: customerInfo.horario,
          items: cart.map((item) => ({
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio,
            subtotal: item.precio * item.cantidad,
            gustos: item.gustos || [],
          })),
          total: total,
        };

        generarPDFOrden(ordenData);

        Swal.fire({
          icon: "success",
          title: "¡Pedido Confirmado!",
          text: "Tu orden ha sido generada. Revisa el PDF.",
          confirmButtonColor: "#B4E7CE",
          timer: 3000,
        }).then(() => {
          clearCart();
          clearCustomerInfo();
          onNavigate("home");
        });
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center py-12">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Agrega productos para comenzar tu pedido
          </p>
          <button onClick={() => onNavigate("catalog")} className="btn-primary">
            Ver Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pastel-sky-400 to-pastel-blue-400 bg-clip-text text-transparent">
            Tu Carrito
          </h2>
          <button
            onClick={() => onNavigate("catalog")}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Seguir Comprando
          </button>
        </div>

        {/* Información del Cliente */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">Información de Entrega:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Cliente:</strong> {customerInfo.nombre}{" "}
              {customerInfo.apellido}
            </p>
            <p>
              <strong>Teléfono:</strong> {customerInfo.telefono}
            </p>
            <p>
              <strong>Tipo:</strong>{" "}
              {customerInfo.tipoEntrega === "retiro"
                ? "Retiro en local"
                : "Delivery"}
            </p>
            <p>
              <strong>Horario:</strong> {customerInfo.horario}
            </p>
            {customerInfo.tipoEntrega === "delivery" && (
              <p className="md:col-span-2">
                <strong>Dirección:</strong> {customerInfo.direccion}
              </p>
            )}
          </div>
          <button
            onClick={() => onNavigate("home")}
            className="text-pastel-sky-500 text-sm mt-2 hover:underline"
          >
            Modificar datos
          </button>
        </div>

        {/* Items del Carrito */}
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div
              key={item.cartId}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{item.nombre}</h4>
                {item.gustos && item.gustos.length > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Gustos: {item.gustos.join(", ")}
                  </p>
                )}
                <p className="text-pastel-sky-500 font-semibold mt-1">
                  ${item.precio.toFixed(2)} c/u
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Control de cantidad */}
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.cartId, item.cantidad - 1)
                    }
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.cartId, item.cantidad + 1)
                    }
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Subtotal
                  </p>
                  <p className="text-lg font-bold text-pastel-sky-500">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </p>
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => handleRemoveItem(item.cartId)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total y Botón Confirmar */}
        <div className="border-t-2 border-gray-200 dark:border-gray-600 pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold">Total:</span>
            <span className="text-3xl font-bold text-pastel-sky-500">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="btn-primary w-full text-lg"
          >
            Confirmar Pedido y Generar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
