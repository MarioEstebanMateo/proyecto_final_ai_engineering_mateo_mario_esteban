import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, MessageSquare } from "lucide-react";
import { chatWithAssistant } from "../services/groq";
import { generarPDFOrden } from "../utils/pdfGenerator";
import Swal from "sweetalert2";

// Función para extraer datos del pedido desde el JSON estructurado
const extractOrderData = (responseText) => {
  try {
    // Buscar el bloque JSON en la respuesta usando los delimitadores
    let jsonMatch = responseText.match(
      /PEDIDO_JSON_INICIO\s*({[\s\S]*?})\s*PEDIDO_JSON_FIN/
    );

    // Fallback: buscar bloques con ```json si el asistente lo usa
    if (!jsonMatch) {
      jsonMatch = responseText.match(/```json\s*({[\s\S]*?})\s*```/);
    }

    if (!jsonMatch) {
      console.error("No se encontró bloque JSON en la respuesta");
      return null;
    }

    const jsonData = JSON.parse(jsonMatch[1]);

    if (!jsonData.pedido_completo) {
      return null;
    }

    // Transformar el formato del JSON al formato esperado por la aplicación
    const orderData = {
      nombre: jsonData.nombre || "",
      apellido: jsonData.apellido || "",
      telefono: jsonData.telefono || "",
      tipoEntrega: jsonData.tipo_entrega || "retiro",
      direccion: jsonData.direccion || "",
      horario: jsonData.horario || "",
      items: (jsonData.items || []).map((item, index) => ({
        id: `${item.tipo}-${index}`,
        nombre: item.nombre,
        tipo: item.tipo,
        precio: parseFloat(item.precio),
        cantidad: parseInt(item.cantidad),
        gustos: item.gustos || [],
        subtotal: parseFloat(item.precio) * parseInt(item.cantidad),
      })),
      total: parseFloat(jsonData.total || 0),
    };

    // Validar que tengamos datos mínimos
    if (
      !orderData.nombre ||
      !orderData.telefono ||
      orderData.items.length === 0
    ) {
      console.error("Datos incompletos en el pedido");
      return null;
    }

    return orderData;
  } catch (error) {
    console.error("Error al extraer datos del pedido:", error);
    return null;
  }
};

const ChatAssistant = ({ availableProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! 👋 Bienvenido a la Heladería Premium. Voy a ayudarte a hacer tu pedido paso a paso. ¿Cuál es tu nombre?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mantener el foco en el input cuando el chat está abierto
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");

    // Agregar mensaje del usuario
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Preparar contexto de productos para el asistente
      const productContext = {
        tiposHelados: availableProducts.tiposHelados || [],
        gustosHelados: availableProducts.gustosHelados || [],
        postresHelados: availableProducts.postresHelados || [],
      };

      const response = await chatWithAssistant(
        newMessages.map((msg) => ({ role: msg.role, content: msg.content })),
        productContext
      );

      const updatedMessages = [
        ...newMessages,
        { role: "assistant", content: response },
      ];
      setMessages(updatedMessages);

      // Detectar si el pedido está completo (buscar JSON en la respuesta)
      if (
        response.includes("pedido_completo") &&
        (response.includes("PEDIDO_JSON_INICIO") ||
          response.includes("```json"))
      ) {
        // Extraer datos del pedido desde el JSON estructurado
        const orderData = extractOrderData(response);

        if (orderData) {
          // Mostrar confirmación y generar PDF
          Swal.fire({
            title: "¿Confirmar pedido?",
            html: `
              <div class="text-left">
                <p><strong>Nombre:</strong> ${orderData.nombre} ${
              orderData.apellido
            }</p>
                <p><strong>Teléfono:</strong> ${orderData.telefono}</p>
                <p><strong>Tipo:</strong> ${
                  orderData.tipoEntrega === "delivery"
                    ? "Delivery"
                    : "Retiro en local"
                }</p>
                ${
                  orderData.direccion
                    ? `<p><strong>Dirección:</strong> ${orderData.direccion}</p>`
                    : ""
                }
                <p><strong>Horario:</strong> ${orderData.horario}</p>
                <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
              </div>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#60B8FF",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Sí, generar PDF",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              generarPDFOrden(orderData);
              Swal.fire({
                icon: "success",
                title: "¡Pedido Confirmado!",
                html: `
                  <p class="mb-3">Tu pedido ha sido generado correctamente, ${orderData.nombre}! 🎉</p>
                  <p class="text-sm text-gray-600">El PDF se abrirá en una nueva pestaña con todos los detalles de tu orden.</p>
                `,
                confirmButtonColor: "#60B8FF",
                confirmButtonText: "Entendido",
                timer: 3500,
              });
              // Reiniciar chat con mensaje de despedida amable
              setMessages([
                {
                  role: "assistant",
                  content: `¡Muchas gracias por tu pedido, ${
                    orderData.nombre
                  }! 🎉🍦\n\nTu orden ha sido generada exitosamente y el PDF ya está disponible. \n\nTe esperamos ${
                    orderData.tipoEntrega === "delivery"
                      ? "para la entrega"
                      : "en nuestra heladería"
                  } ${
                    orderData.horario
                  }. ¡Que disfrutes tus helados!\n\n¿Te gustaría hacer otro pedido?`,
                },
              ]);
            }
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);

      let errorMessage =
        "No se pudo conectar con el asistente. Por favor, intenta nuevamente.";
      let errorTitle = "Error";

      // Detectar error de cuota excedida
      if (
        error.message &&
        error.message.includes("exceeded your current quota")
      ) {
        errorTitle = "Créditos Agotados";
        errorMessage =
          "La API de OpenAI ha excedido su cuota. Por favor, agrega créditos en platform.openai.com/settings/organization/billing";
      } else if (error.message && error.message.includes("429")) {
        errorTitle = "Límite de Solicitudes";
        errorMessage =
          "Se han realizado demasiadas solicitudes. Por favor, espera unos minutos.";
      }

      Swal.fire({
        icon: "error",
        title: errorTitle,
        text: errorMessage,
        confirmButtonColor: "#A8DAFF",
      });

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "❌ " + errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    Swal.fire({
      title: "¿Limpiar chat?",
      text: "Se eliminará el historial de conversación",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#A8DAFF",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, limpiar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setMessages([
          {
            role: "assistant",
            content:
              "¡Hola! 👋 Bienvenido a la Heladería Premium. Voy a ayudarte a hacer tu pedido paso a paso. ¿Cuál es tu nombre?",
          },
        ]);
      }
    });
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-pastel-sky-500 to-pastel-blue-500 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl hover:from-pastel-sky-600 hover:to-pastel-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 animate-pulse hover:animate-none"
          aria-label="Abrir chat asistente"
        >
          <Bot className="w-6 h-6" />
          <span className="font-semibold text-sm whitespace-nowrap">
            Haz tu pedido con
            <br />
            nuestro Asistente IA
          </span>
        </button>
      )}

      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[80vh] border-2 border-pastel-sky-400">
            {/* Header */}
            <div className="bg-gradient-to-r from-pastel-sky-400 to-pastel-blue-400 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-8 h-8" />
                <div>
                  <h3 className="font-bold text-lg">Asistente IA</h3>
                  <p className="text-xs opacity-90">Estoy aquí para ayudarte</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-pastel-sky-400"
                        : "bg-pastel-blue-400"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-pastel-sky-400 text-white rounded-tr-none"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none shadow"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.role === "assistant"
                        ? message.content
                            .replace(
                              /PEDIDO_JSON_INICIO[\s\S]*?PEDIDO_JSON_FIN/g,
                              ""
                            )
                            .replace(/```json[\s\S]*?```/g, "")
                            .trim()
                        : message.content}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-pastel-blue-400">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
              <div className="flex gap-2 mb-2">
                <button
                  onClick={handleClearChat}
                  className="text-xs text-gray-500 hover:text-pastel-sky-500 transition"
                >
                  Limpiar chat
                </button>
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-pastel-sky-500 focus:ring-2 focus:ring-pastel-sky-300 dark:bg-gray-700 dark:text-white transition outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-pastel-sky-400 to-pastel-blue-400 text-white p-3 rounded-xl hover:from-pastel-sky-500 hover:to-pastel-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
