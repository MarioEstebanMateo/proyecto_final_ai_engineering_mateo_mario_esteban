# 🧪 Casos de Prueba y Ejemplos

## Tabla de Contenidos

1. [Casos de Uso Básicos](#casos-de-uso-básicos)
2. [Casos de Prueba de Validación](#casos-de-prueba-de-validación)
3. [Ejemplos de Interacción con el Asistente IA](#ejemplos-de-interacción-con-el-asistente-ia)
4. [Escenarios de Error](#escenarios-de-error)
5. [Casos de Prueba Avanzados](#casos-de-prueba-avanzados)

---

## Casos de Uso Básicos

### Caso 1: Pedido Simple de Retiro

**Objetivo:** Cliente hace un pedido de helado para retirar en el local.

**Pasos:**

1. Abrir la aplicación
2. Seleccionar "Retiro en Local"
3. Completar datos:
   - Nombre: `Juan`
   - Apellido: `Pérez`
   - Teléfono: `1156781234`
   - Horario: `18:00`
4. Click en "Continuar al Catálogo"
5. Seleccionar tipo de helado: `1/4 kg`
6. Seleccionar gustos:
   - Chocolate
   - Dulce de Leche
7. Cantidad: `1`
8. Click en "Agregar al Carrito"
9. Click en ícono del carrito
10. Click en "Confirmar Pedido y Generar PDF"
11. Confirmar en el modal

**Resultado Esperado:**

- ✅ PDF generado con la orden completa
- ✅ Carrito limpiado
- ✅ Redirección al inicio

---

### Caso 2: Pedido de Delivery con Múltiples Productos

**Objetivo:** Cliente hace un pedido delivery con helados y postres.

**Pasos:**

1. Seleccionar "Delivery"
2. Completar datos:
   - Nombre: `María`
   - Apellido: `González`
   - Teléfono: `1145678901`
   - Dirección: `Av. Corrientes 1234, CABA`
   - Horario: `20:30`
3. Continuar al catálogo
4. **Primer helado:**
   - Tipo: `1/2 kg`
   - Gustos: Vainilla, Frutilla, Limón
   - Cantidad: `2`
5. **Segundo helado:**
   - Tipo: `1 kg`
   - Gustos: Chocolate, Dulce de Leche, Mascarpone, Pistacho
   - Cantidad: `1`
6. **Postres:**
   - Bomba de Chocolate: cantidad `3`
   - Copa Sundae: cantidad `2`
7. Ver carrito
8. Confirmar pedido

**Resultado Esperado:**

- ✅ 4 items en el carrito
- ✅ Total calculado correctamente:
  - (1/2 kg × 2) + 1 kg + (Bomba × 3) + (Copa × 2)
- ✅ PDF con todos los detalles
- ✅ Dirección incluida en el PDF

---

### Caso 3: Modificación del Carrito

**Objetivo:** Cliente agrega productos, va al carrito, y modifica las cantidades.

**Pasos:**

1. Completar formulario inicial
2. Agregar productos al carrito
3. Ir al carrito
4. Aumentar cantidad de un producto (botón +)
5. Disminuir cantidad de otro producto (botón -)
6. Eliminar un producto (botón 🗑️)
7. Click en "Seguir Comprando"
8. Agregar más productos
9. Volver al carrito
10. Confirmar pedido

**Resultado Esperado:**

- ✅ Cantidades actualizadas correctamente
- ✅ Subtotales recalculados
- ✅ Total actualizado
- ✅ Productos nuevos se agregan a la orden existente
- ✅ PDF refleja el carrito final

---

## Casos de Prueba de Validación

### Validación 1: Campos Obligatorios

**Escenario:** Intentar continuar sin completar campos obligatorios.

**Casos:**

- [ ] Nombre vacío → Error: "Por favor ingresa tu nombre"
- [ ] Apellido vacío → Error: "Por favor ingresa tu apellido"
- [ ] Teléfono vacío → Error: "Por favor ingresa un número de teléfono válido"
- [ ] Teléfono con menos de 8 dígitos → Error: "número de teléfono válido"
- [ ] Horario no seleccionado → Error: "Por favor selecciona un horario"
- [ ] Dirección vacía (en delivery) → Error: "Por favor ingresa la dirección de entrega"

**Resultado Esperado:**

- ✅ SweetAlert2 muestra el error correspondiente
- ✅ No se permite continuar hasta completar correctamente

---

### Validación 2: Horarios

**Escenario:** Validar restricción de horarios (12:00 - 23:00).

**Casos:**

- [ ] Horario: `11:59` → Error: "El horario debe ser entre las 12:00 y las 23:00"
- [ ] Horario: `23:01` → Error: "El horario debe ser entre las 12:00 y las 23:00"
- [ ] Horario: `12:00` → ✅ Válido
- [ ] Horario: `23:00` → ✅ Válido
- [ ] Horario: `18:30` → ✅ Válido

**Resultado Esperado:**

- ✅ Solo horarios válidos permiten continuar

---

### Validación 3: Selección de Gustos

**Escenario:** Validar límite de 4 gustos por helado.

**Casos:**

- [ ] Intentar seleccionar 5to gusto → Warning: "Puedes seleccionar hasta 4 gustos"
- [ ] Seleccionar 4 gustos → ✅ Permitido
- [ ] Deseleccionar un gusto → ✅ Permitido seleccionar otro
- [ ] Intentar agregar sin tipo seleccionado → Warning: "Por favor selecciona un tipo de helado"
- [ ] Intentar agregar sin gustos → Warning: "Por favor selecciona al menos un gusto"

**Resultado Esperado:**

- ✅ Validaciones se cumplen correctamente
- ✅ SweetAlert2 muestra mensajes apropiados

---

### Validación 4: Cantidades

**Escenario:** Validar cantidades de productos.

**Casos:**

- [ ] Cantidad 0 o negativa → Producto eliminado del carrito
- [ ] Cantidad máxima en postres: 10
- [ ] Disminuir a 0 → Producto eliminado automáticamente

**Resultado Esperado:**

- ✅ Cantidades válidas siempre
- ✅ Eliminación automática cuando cantidad = 0

---

## Ejemplos de Interacción con el Asistente IA

### Interacción 1: Consulta de Productos

**Usuario:** "¿Qué helados tienen?"

**Asistente Esperado:**

```
Tenemos una variedad de gustos de helados:

🍫 Chocolates: Chocolate, Chocolate Blanco
🍓 Frutales: Frutilla, Limón, Frambuesa, Maracuyá, Mango
🍨 Cremosos: Vainilla, Dulce de Leche, Mascarpone, Crema Rusa
🌿 Especiales: Menta Granizada, Café, Pistacho, Avellana, Coco
🍌 Combinados: Banana Split, Cookies & Cream, Tramontana, Sambayón

También puedes elegir el tamaño:
- 1/4 kg - $3500
- 1/2 kg - $6500
- 1 kg - $12000

¿Te gustaría saber más sobre algún gusto en particular?
```

---

### Interacción 2: Recomendación

**Usuario:** "¿Cuál me recomendarías?"

**Asistente Esperado:**

```
¡Excelente pregunta! Te recomiendo:

Si te gusta el chocolate: Combina Chocolate + Dulce de Leche + Cookies & Cream

Si prefieres frutal: Frutilla + Limón + Frambuesa + Maracuyá (el máximo de 4 gustos!)

Si quieres algo cremoso: Vainilla + Mascarpone + Crema Rusa

Nuestro especial de la casa es: Dulce de Leche + Pistacho + Chocolate + Menta Granizada

¿Cuál te llama más la atención?
```

---

### Interacción 3: Consulta de Postres

**Usuario:** "¿Tienen postres?"

**Asistente Esperado:**

```
¡Sí! Tenemos postres helados deliciosos:

🍫 Bomba de Chocolate - $4500
   Helado de chocolate cubierto con ganache

🎂 Torta Helada - $8000
   Torta de helado con capas de bizcochuelo

🍨 Copa Sundae - $3500
   Helado con salsa de chocolate y crema

🍰 Brownie con Helado - $4000
   Brownie tibio con helado de vainilla

🍌 Banana Split - $5000
   Banana con tres helados y toppings

🍓 Parfait de Frutas - $3800
   Capas de helado con frutas frescas

¿Te interesa alguno?
```

---

### Interacción 4: Proceso de Pedido

**Usuario:** "¿Cómo hago un pedido?"

**Asistente Esperado:**

```
Es muy fácil hacer tu pedido:

1️⃣ Completa tus datos:
   - Nombre, apellido y teléfono
   - Elige si es para retiro en local o delivery
   - Si es delivery, ingresa tu dirección
   - Selecciona el horario (entre 12:00 y 23:00)

2️⃣ Elige tus productos:
   - Para helados: selecciona el tamaño y hasta 4 gustos
   - Para postres: click en el que quieras y la cantidad

3️⃣ Revisa tu carrito:
   - Puedes modificar cantidades
   - O seguir agregando productos

4️⃣ Confirma tu pedido:
   - Se generará un PDF con tu orden
   - ¡Y listo!

¿Quieres que te ayude con algún paso específico?
```

---

### Interacción 5: Boundaries Test

**Usuario:** "¿Aceptan tarjeta de crédito?"

**Asistente Esperado:**

```
Lo siento, solo puedo ayudarte con la selección y pedido de productos.
Para información sobre métodos de pago, por favor contacta directamente al local.

¿Puedo ayudarte con algo más sobre nuestros helados o postres?
```

---

**Usuario:** "¿Cuánto sale el envío?"

**Asistente Esperado:**

```
No tengo información sobre costos de envío. Mi función es ayudarte a seleccionar
los productos del catálogo.

¿Te gustaría que te ayude a elegir helados o postres?
```

---

## Escenarios de Error

### Error 1: Supabase no Conectado

**Escenario:** Variables de entorno mal configuradas o Supabase caído.

**Síntomas:**

- Productos no cargan
- Spinner infinito
- Consola muestra errores de Supabase

**Solución:**

1. Verificar `.env` tiene las credenciales correctas
2. Verificar que Supabase esté activo
3. Verificar que las tablas existan

**Resultado Esperado:**

- ✅ SweetAlert2 muestra: "No se pudieron cargar los productos"
- ✅ Botón para recargar

---

### Error 2: OpenAI API Error

**Escenario:** API key inválida o cuota excedida.

**Síntomas:**

- Chat no responde
- Consola muestra error 401 o 429

**Solución:**

1. Verificar API key en `.env`
2. Verificar créditos en cuenta de OpenAI
3. Verificar límite de rate

**Resultado Esperado:**

- ✅ Mensaje de error al usuario: "No se pudo conectar con el asistente"
- ✅ Opción de reintentar

---

### Error 3: Carrito Vacío

**Escenario:** Intentar confirmar pedido sin productos.

**Acción:**

- Ir directamente al carrito sin agregar productos
- Click en "Confirmar Pedido"

**Resultado Esperado:**

- ✅ SweetAlert2: "Carrito vacío - Agrega productos antes de confirmar"
- ✅ No se genera PDF

---

## Casos de Prueba Avanzados

### Prueba 1: Persistencia

**Objetivo:** Verificar que los datos persisten al recargar.

**Pasos:**

1. Completar formulario
2. Agregar productos al carrito
3. Recargar la página (F5)
4. Verificar que el carrito mantenga los productos
5. Verificar que los datos del cliente persistan
6. Cerrar la pestaña
7. Abrir nuevamente
8. Verificar persistencia

**Resultado Esperado:**

- ✅ Carrito persiste en localStorage
- ✅ Datos del cliente persisten
- ✅ Modo oscuro persiste

---

### Prueba 2: Modo Oscuro

**Objetivo:** Verificar funcionamiento del modo oscuro.

**Pasos:**

1. Activar modo oscuro
2. Navegar por todas las páginas
3. Verificar que todos los componentes se adapten
4. Recargar página
5. Verificar que el modo persista

**Resultado Esperado:**

- ✅ Todos los componentes se ven bien en modo oscuro
- ✅ No hay texto ilegible
- ✅ Preferencia persiste

---

### Prueba 3: Responsive Design

**Objetivo:** Verificar que la app funcione en diferentes dispositivos.

**Dispositivos a Probar:**

- [ ] Mobile (320px - 767px)
  - iPhone SE
  - iPhone 12/13
  - Samsung Galaxy
- [ ] Tablet (768px - 1023px)
  - iPad
  - Samsung Tab
- [ ] Desktop (1024px+)
  - 1366x768
  - 1920x1080
  - 2560x1440

**Aspectos a Verificar:**

- [ ] Formularios se ven bien y son usables
- [ ] Catálogo se adapta correctamente
- [ ] Carrito es funcional
- [ ] Chat asistente no obstruye contenido
- [ ] Botones son accesibles con el dedo
- [ ] Texto es legible

**Resultado Esperado:**

- ✅ App completamente funcional en todos los tamaños

---

### Prueba 4: Performance

**Objetivo:** Verificar que la app sea rápida.

**Métricas:**

- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Time to Interactive (TTI) < 3.8s
- [ ] Total Bundle Size < 200KB (gzipped)
- [ ] Carga de productos < 2s

**Herramientas:**

- Chrome DevTools (Lighthouse)
- Network tab
- Performance tab

**Resultado Esperado:**

- ✅ Score de Lighthouse > 90

---

### Prueba 5: Accesibilidad

**Objetivo:** Verificar que la app sea accesible.

**Aspectos a Probar:**

- [ ] Navegación con teclado (Tab)
- [ ] Lectores de pantalla (aria-labels)
- [ ] Contraste de colores suficiente
- [ ] Textos alternativos en iconos
- [ ] Focus visible

**Herramientas:**

- Lighthouse Accessibility
- axe DevTools
- Keyboard Only Navigation

**Resultado Esperado:**

- ✅ Accesibilidad score > 90

---

## Checklist de Pruebas Completo

### Funcionalidad

- [ ] Formulario valida correctamente
- [ ] Productos cargan de Supabase
- [ ] Agregar al carrito funciona
- [ ] Modificar cantidades funciona
- [ ] Eliminar productos funciona
- [ ] Cálculos de precios correctos
- [ ] PDF se genera correctamente
- [ ] Chat asistente responde
- [ ] Modo oscuro funciona
- [ ] Persistencia funciona

### UI/UX

- [ ] Diseño responsive
- [ ] Animaciones suaves
- [ ] Feedback visual claro
- [ ] Errores se muestran correctamente
- [ ] Loading states visibles
- [ ] Navegación intuitiva

### Seguridad

- [ ] Variables de entorno protegidas
- [ ] Validaciones funcionan
- [ ] No hay API keys expuestas
- [ ] RLS habilitado en Supabase

### Performance

- [ ] Carga inicial rápida
- [ ] Sin re-renders innecesarios
- [ ] Bundle size optimizado
- [ ] Imágenes optimizadas (si aplica)

---

## Scripts de Prueba Automatizados (Ejemplo)

```javascript
// test/e2e/pedido.spec.js
import { test, expect } from "@playwright/test";

test("flujo completo de pedido", async ({ page }) => {
  // Ir a la app
  await page.goto("http://localhost:3000");

  // Llenar formulario
  await page.click('button:has-text("Retiro en Local")');
  await page.fill('[name="nombre"]', "Juan");
  await page.fill('[name="apellido"]', "Pérez");
  await page.fill('[name="telefono"]', "1156781234");
  await page.fill('[name="horario"]', "18:00");

  // Continuar
  await page.click('button:has-text("Continuar al Catálogo")');

  // Esperar carga de productos
  await page.waitForSelector("text=1/4 kg");

  // Seleccionar helado
  await page.click("text=1/4 kg");
  await page.click("text=Chocolate");
  await page.click("text=Dulce de Leche");
  await page.click('button:has-text("Agregar al Carrito")');

  // Ir al carrito
  await page.click('[aria-label="Ver carrito"]');

  // Verificar producto en carrito
  await expect(page.locator("text=1/4 kg")).toBeVisible();
  await expect(page.locator("text=Chocolate, Dulce de Leche")).toBeVisible();

  // Confirmar pedido
  await page.click('button:has-text("Confirmar Pedido")');
  await page.click('button:has-text("Sí, confirmar")');

  // Verificar éxito
  await expect(page.locator("text=¡Pedido Confirmado!")).toBeVisible();
});
```

---

**Última actualización:** Diciembre 2025
**Autor:** Mario Esteban Mateo
