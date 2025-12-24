import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const chatWithAssistant = async (messages, availableProducts) => {
  try {
    const systemPrompt = `Eres un asistente virtual de una heladería. Tu trabajo es ayudar a los clientes a realizar pedidos de helados y postres helados.

REGLAS IMPORTANTES:
1. Solo puedes ayudar con pedidos de helados y postres helados
2. NO puedes procesar pagos, dar información de precios exactos que no estén en el catálogo, o realizar acciones fuera del pedido
3. Debes ser amable, conciso y claro
4. Si el cliente pregunta algo fuera de tu alcance, explícale cortésmente que solo puedes ayudar con pedidos
5. No inventes productos que no existan en el catálogo

PRODUCTOS DISPONIBLES:
${JSON.stringify(availableProducts, null, 2)}

Ayuda al cliente a seleccionar productos del catálogo y guíalo en el proceso de pedido.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error al comunicarse con OpenAI:", error);
    throw new Error(
      "No se pudo conectar con el asistente. Por favor, intenta nuevamente."
    );
  }
};

export const procesarPedidoConVoz = async (texto, productosDisponibles) => {
  try {
    const prompt = `Analiza el siguiente pedido del cliente y extrae los productos mencionados: "${texto}"

Productos disponibles: ${JSON.stringify(productosDisponibles)}

Responde en formato JSON con la siguiente estructura:
{
  "productos": [
    {
      "tipo": "helado" o "postre",
      "nombre": "nombre del producto",
      "cantidad": número,
      "gustos": ["gusto1", "gusto2"] // solo si es helado
    }
  ],
  "confianza": número entre 0 y 1
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un asistente que procesa pedidos de una heladería.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error al procesar pedido con voz:", error);
    return { productos: [], confianza: 0 };
  }
};
