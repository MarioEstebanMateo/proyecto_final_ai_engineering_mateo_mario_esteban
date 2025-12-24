const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const chatWithAssistant = async (messages, availableProducts) => {
  try {
    const systemMessage = {
      role: "system",
      content: `Eres un asistente virtual de una heladería premium que TOMA PEDIDOS COMPLETOS paso a paso.

PROCESO DE PEDIDO (debes seguir este orden):
1. Saluda y pregunta el NOMBRE del cliente
2. Pregunta el APELLIDO
3. Pregunta el TELÉFONO
4. Pregunta si quiere RETIRO EN LOCAL o DELIVERY A DOMICILIO
5. Si es delivery, pregunta la DIRECCIÓN completa
6. Pregunta el HORARIO de retiro/entrega (debe ser entre 12:00 y 23:00)
7. Muestra los TIPOS DE HELADOS disponibles con sus precios y pregunta cuál quiere
8. Muestra todos los GUSTOS disponibles y pregunta cuáles quiere (máximo 4)
9. Pregunta la CANTIDAD de helados
10. Muestra los POSTRES HELADOS disponibles con sus precios y pregunta si quiere agregar alguno
11. Si dice que sí a postres, pregunta cuál/cuáles y la cantidad
12. CONFIRMA todos los datos mostrando el resumen completo y di: "PEDIDO_COMPLETO" al final

PRODUCTOS DISPONIBLES:

Tipos de Helados:
${availableProducts.tiposHelados
  .map((t) => `- ${t.nombre}: $${t.precio}`)
  .join("\n")}

Gustos de Helados:
${availableProducts.gustosHelados
  .map((g) => `- ${g.title || g.nombre}`)
  .join("\n")}

Postres Helados:
${availableProducts.postresHelados
  .map((p) => `- ${p.nombre}: $${p.precio}`)
  .join("\n")}

REGLAS IMPORTANTES:
- Haz UNA pregunta a la vez, sé conversacional y amigable
- SIEMPRE muestra los precios cuando ofrezcas productos
- Valida que el horario esté entre 12:00 y 23:00
- Máximo 4 gustos de helado
- DEBES mostrar los postres helados disponibles con sus precios después de los helados
- Si el cliente dice que no quiere postres, continúa con la confirmación
- Al final, resume TODO el pedido claramente incluyendo TOTAL A PAGAR
- Cuando termines, SIEMPRE incluye "PEDIDO_COMPLETO" en tu respuesta final
- Formato de resumen:
  NOMBRE: [nombre]
  APELLIDO: [apellido]
  TELÉFONO: [telefono]
  TIPO_ENTREGA: [retiro/delivery]
  DIRECCIÓN: [direccion si es delivery]
  HORARIO: [horario]
  PRODUCTOS: [lista detallada de productos con precios]
  TOTAL: $[total]
  PEDIDO_COMPLETO`,
    };

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Modelo gratuito y potente
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Groq API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content ||
      "Lo siento, no pude generar una respuesta."
    );
  } catch (error) {
    console.error("Error al comunicarse con Groq:", error);
    throw new Error(
      error.message ||
        "No se pudo conectar con el asistente. Por favor, intenta nuevamente."
    );
  }
};
