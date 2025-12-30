import React, { useState, useEffect } from "react";
import { Plus, Check } from "lucide-react";
import {
  getTiposDeHelados,
  getGustosDeHelados,
  getPostresHelados,
} from "../services/supabase";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

const ProductCatalog = () => {
  const [tiposHelados, setTiposHelados] = useState([]);
  const [gustosHelados, setGustosHelados] = useState([]);
  const [postresHelados, setPostresHelados] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para el selector de helados
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [gustosSeleccionados, setGustosSeleccionados] = useState([]);
  const [cantidadHelado, setCantidadHelado] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [tipos, gustos, postres] = await Promise.all([
        getTiposDeHelados(),
        getGustosDeHelados(),
        getPostresHelados(),
      ]);
      setTiposHelados(tipos);
      setGustosHelados(gustos);
      setPostresHelados(postres);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los productos. Por favor, recarga la página.",
        confirmButtonColor: "#A8DAFF",
      });
    }
    setLoading(false);
  };

  const handleTipoClick = (tipo) => {
    setTipoSeleccionado(tipo);
    setGustosSeleccionados([]);
  };

  const handleGustoClick = (gusto) => {
    if (gustosSeleccionados.find((g) => g.id === gusto.id)) {
      setGustosSeleccionados(
        gustosSeleccionados.filter((g) => g.id !== gusto.id)
      );
    } else {
      if (gustosSeleccionados.length >= 4) {
        Swal.fire({
          icon: "warning",
          title: "Máximo alcanzado",
          text: "Puedes seleccionar hasta 4 gustos",
          confirmButtonColor: "#A8DAFF",
        });
        return;
      }
      setGustosSeleccionados([...gustosSeleccionados, gusto]);
    }
  };

  const agregarHeladoAlCarrito = () => {
    if (!tipoSeleccionado) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Por favor selecciona un tipo de helado",
        confirmButtonColor: "#A8DAFF",
      });
      return;
    }

    if (gustosSeleccionados.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Por favor selecciona al menos un gusto",
        confirmButtonColor: "#A8DAFF",
      });
      return;
    }

    const item = {
      id: `helado-${tipoSeleccionado.id}`,
      nombre: tipoSeleccionado.nombre,
      tipo: "helado",
      precio: tipoSeleccionado.precio,
      cantidad: cantidadHelado,
      gustos: gustosSeleccionados.map((g) => g.title),
    };

    addToCart(item);

    Swal.fire({
      icon: "success",
      title: "¡Agregado!",
      text: `${tipoSeleccionado.nombre} agregado al carrito`,
      confirmButtonColor: "#A8DAFF",
      timer: 1500,
      showConfirmButton: false,
    });

    // Reset
    setTipoSeleccionado(null);
    setGustosSeleccionados([]);
    setCantidadHelado(1);
  };

  const agregarPostreAlCarrito = (postre) => {
    Swal.fire({
      title: "¿Cuántos quieres?",
      input: "number",
      inputValue: 1,
      inputAttributes: {
        min: 1,
        max: 10,
        step: 1,
      },
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#A8DAFF",
      inputValidator: (value) => {
        if (!value || value < 1) {
          return "Debes ingresar una cantidad válida";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const item = {
          id: `postre-${postre.id}`,
          nombre: postre.nombre,
          tipo: "postre",
          precio: postre.precio,
          cantidad: parseInt(result.value),
          gustos: [],
        };

        addToCart(item);

        Swal.fire({
          icon: "success",
          title: "¡Agregado!",
          text: `${postre.nombre} agregado al carrito`,
          confirmButtonColor: "#A8DAFF",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pastel-sky-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Sección Helados */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pastel-sky-400 to-pastel-blue-500 bg-clip-text text-transparent">
          🍦 Helados
        </h2>

        {/* Tipos de Helados */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Selecciona el Tamaño</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiposHelados.map((tipo) => (
              <button
                key={tipo.id}
                onClick={() => handleTipoClick(tipo)}
                className={`card transition-all duration-300 ${
                  tipoSeleccionado?.id === tipo.id
                    ? "border-2 border-pastel-sky-400 bg-pastel-sky-50 dark:bg-pastel-sky-900/20"
                    : "border-2 border-transparent hover:border-pastel-sky-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{tipo.nombre}</h4>
                  <span className="text-xl font-bold text-pastel-sky-500">
                    ${tipo.precio}
                  </span>
                </div>
                {tipoSeleccionado?.id === tipo.id && (
                  <div className="mt-2 flex items-center text-pastel-sky-500">
                    <Check className="w-5 h-5 mr-1" />
                    <span className="text-sm">Seleccionado</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gustos de Helados */}
        {tipoSeleccionado && (
          <div className="mb-8 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">
              Selecciona hasta 4 Gustos ({gustosSeleccionados.length}/4)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {gustosHelados.map((gusto) => {
                const isSelected = gustosSeleccionados.find(
                  (g) => g.id === gusto.id
                );
                return (
                  <button
                    key={gusto.id}
                    onClick={() => handleGustoClick(gusto)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium ${
                      isSelected
                        ? "border-pastel-sky-500 bg-pastel-sky-50 dark:bg-pastel-sky-900/20 text-pastel-sky-700 dark:text-pastel-sky-300"
                        : "border-gray-300 dark:border-gray-600 hover:border-pastel-sky-300"
                    }`}
                  >
                    {gusto.title}
                    {isSelected && <Check className="w-4 h-4 inline ml-1" />}
                  </button>
                );
              })}
            </div>

            {/* Cantidad y Botón Agregar */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-3">
                <label className="font-semibold">Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={cantidadHelado}
                  onChange={(e) =>
                    setCantidadHelado(parseInt(e.target.value) || 1)
                  }
                  className="input-field w-20 text-center"
                />
              </div>
              <button
                onClick={agregarHeladoAlCarrito}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Agregar al Carrito
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Sección Postres Helados */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pastel-sky-400 to-pastel-blue-500 bg-clip-text text-transparent">
          🍰 Postres Helados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {postresHelados.map((postre) => (
            <div
              key={postre.id}
              className="card hover:scale-105 transition-transform duration-300"
            >
              <h4 className="text-lg font-semibold mb-2">{postre.nombre}</h4>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-pastel-sky-500">
                  ${postre.precio}
                </span>
                <button
                  onClick={() => agregarPostreAlCarrito(postre)}
                  className="bg-pastel-sky-500 hover:bg-pastel-sky-600 text-white p-2 rounded-lg transition duration-300"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductCatalog;
