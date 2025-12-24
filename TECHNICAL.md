# 📖 Documentación Técnica del Proyecto

## Tabla de Contenidos

1. [Arquitectura de la Aplicación](#arquitectura)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Componentes Principales](#componentes-principales)
4. [Gestión de Estado](#gestión-de-estado)
5. [Integración con APIs](#integración-con-apis)
6. [Flujo de Datos](#flujo-de-datos)
7. [Seguridad](#seguridad)
8. [Optimizaciones](#optimizaciones)

---

## Arquitectura

### Patrón de Diseño

La aplicación sigue una arquitectura de **componentes funcionales con React Hooks** y utiliza el **Context API** para la gestión de estado global.

```
┌─────────────────────────────────────┐
│           React App                 │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │   DarkModeProvider          │   │
│  │  ┌─────────────────────┐    │   │
│  │  │   CartProvider      │    │   │
│  │  │  ┌──────────────┐   │    │   │
│  │  │  │ App.jsx      │   │    │   │
│  │  │  │ Components   │   │    │   │
│  │  │  └──────────────┘   │    │   │
│  │  └─────────────────────┘    │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
          ↓           ↓
    ┌─────────┐  ┌──────────┐
    │Supabase │  │ OpenAI   │
    └─────────┘  └──────────┘
```

### Estructura de Carpetas

```
src/
├── components/        # Componentes React
│   ├── Header.jsx
│   ├── CustomerForm.jsx
│   ├── ProductCatalog.jsx
│   ├── Cart.jsx
│   ├── ChatAssistant.jsx
│   └── DarkModeToggle.jsx
│
├── context/          # Contextos globales
│   ├── CartContext.jsx
│   └── DarkModeContext.jsx
│
├── services/         # Servicios externos
│   ├── supabase.js
│   └── openai.js
│
├── utils/            # Utilidades
│   └── pdfGenerator.js
│
├── App.jsx           # Componente principal
├── main.jsx          # Entry point
└── index.css         # Estilos globales
```

---

## Stack Tecnológico

### Frontend Framework

- **React 18.3.1**
  - Biblioteca UI declarativa
  - Hooks para gestión de estado
  - Virtual DOM para performance

### Build Tool

- **Vite 5.0.8**
  - Build tool rápido y moderno
  - Hot Module Replacement (HMR)
  - Optimización automática de assets

### Styling

- **Tailwind CSS 3.4.0**
  - Utility-first CSS framework
  - Modo oscuro con `dark:` prefix
  - Diseño responsive con breakpoints

### State Management

- **React Context API**
  - CartContext: Estado del carrito
  - DarkModeContext: Tema de la aplicación
  - LocalStorage: Persistencia

### Backend as a Service

- **Supabase 2.39.0**
  - PostgreSQL database
  - Row Level Security (RLS)
  - RESTful API automática

### AI Integration

- **OpenAI API 4.20.1**
  - GPT-3.5-turbo model
  - Chat completions
  - Boundaries configurados

### PDF Generation

- **jsPDF 2.5.1**
  - Generación de PDFs del lado del cliente
  - Formateo personalizado
  - Soporte para UTF-8

### UI Libraries

- **SweetAlert2 11.10.3**
  - Alertas y modales personalizables
  - Validaciones interactivas
- **Lucide React 0.294.0**
  - Iconos modernos y customizables

---

## Componentes Principales

### 1. App.jsx

Componente raíz que maneja la navegación y carga de productos.

```javascript
Responsabilidades:
- Gestión de navegación entre páginas
- Carga inicial de productos desde Supabase
- Renderizado condicional de componentes
- Integración de providers (Context)
```

### 2. Header.jsx

Barra de navegación superior con carrito.

```javascript
Props:
- onNavigate: función de navegación
- currentPage: página actual

Características:
- Logo clickeable (vuelve al home)
- Indicador de items en carrito
- Responsive design
```

### 3. CustomerForm.jsx

Formulario de datos del cliente con validaciones.

```javascript
Props:
- onNext: callback al completar

Características:
- Validación de horarios (12:00-23:00)
- Campos condicionales (delivery/retiro)
- Integración con CartContext
- SweetAlert2 para validaciones
```

### 4. ProductCatalog.jsx

Catálogo de productos con selección interactiva.

```javascript
Estado Local:
- tiposHelados: tipos cargados de Supabase
- gustosHelados: gustos cargados de Supabase
- postresHelados: postres cargados de Supabase
- selección actual de helados

Características:
- Carga dinámica desde Supabase
- Selección múltiple de gustos (máx 4)
- Validaciones antes de agregar al carrito
- Loading states
```

### 5. Cart.jsx

Vista del carrito con gestión de productos.

```javascript
Características:
- Modificación de cantidades
- Eliminación de items
- Cálculo de subtotales y total
- Información del cliente
- Confirmación de orden
- Generación de PDF
```

### 6. ChatAssistant.jsx

Asistente conversacional con IA.

```javascript
Estado Local:
- messages: historial de conversación
- inputMessage: mensaje actual
- isLoading: estado de carga
- isOpen: ventana abierta/cerrada

Características:
- Chat flotante
- Integración con OpenAI
- Context-aware (productos disponibles)
- Auto-scroll a últimos mensajes
```

---

## Gestión de Estado

### CartContext

```javascript
Estado:
- cart: [] // array de items
- customerInfo: {} // datos del cliente

Métodos:
- addToCart(item)
- removeFromCart(cartId)
- updateQuantity(cartId, cantidad)
- clearCart()
- updateCustomerInfo(info)
- getTotalItems()
- getTotalPrice()

Persistencia:
- localStorage.setItem('cart', JSON.stringify(cart))
- localStorage.setItem('customerInfo', JSON.stringify(customerInfo))
```

### DarkModeContext

```javascript
Estado:
- darkMode: boolean

Métodos:
- toggleDarkMode()

Persistencia:
- localStorage.setItem('darkMode', JSON.stringify(darkMode))

Efectos:
- Agrega/quita clase 'dark' en document.documentElement
```

---

## Integración con APIs

### Supabase

**Configuración:**

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
```

**Funciones:**

```javascript
// Obtener tipos de helados
getTiposDeHelados()
→ SELECT * FROM tipodehelados ORDER BY precio ASC

// Obtener gustos
getGustosDeHelados()
→ SELECT * FROM helados ORDER BY nombre ASC

// Obtener postres
getPostresHelados()
→ SELECT * FROM postreshelados ORDER BY nombre ASC
```

### Groq (IA Conversacional)

**Configuración:**

```javascript
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
```

**Ventajas:**

- ✅ 100% Gratuito (14,400 requests/día)
- ✅ Muy rápido (hasta 10x más que GPT)
- ✅ Sin tarjeta de crédito
- ✅ Modelo potente: Llama 3.3 70B

**Funciones:**

```javascript
chatWithAssistant(messages, availableProducts)
→ Envía mensaje a Groq con Llama 3.3
→ Incluye system prompt con proceso de pedido
→ Retorna respuesta del asistente

Configuración:
- model: "llama-3.3-70b-versatile"
- temperature: 0.7
- max_tokens: 500
```

**System Prompt:**

```
Eres un asistente virtual de una heladería.
REGLAS:
1. Solo ayudas con pedidos de helados y postres
2. NO procesas pagos ni das precios fuera del catálogo
3. Amable, conciso y claro
4. No inventes productos
```

---

## Flujo de Datos

### Flujo de un Pedido Completo

```
1. Usuario llena CustomerForm
   ↓
2. Datos se guardan en CartContext
   ↓
3. Navigate a ProductCatalog
   ↓
4. ProductCatalog carga datos de Supabase
   ↓
5. Usuario selecciona productos
   ↓
6. addToCart() guarda en CartContext + localStorage
   ↓
7. Navigate a Cart
   ↓
8. Cart muestra items + permite modificaciones
   ↓
9. Usuario confirma pedido
   ↓
10. generarPDFOrden() crea PDF
    ↓
11. PDF se abre en nueva ventana
    ↓
12. clearCart() + clearCustomerInfo()
    ↓
13. Navigate a home
```

### Flujo del Chat Assistant

```
1. Usuario abre chat (isOpen = true)
   ↓
2. Usuario escribe mensaje
   ↓
3. Mensaje se agrega a messages[]
   ↓
4. chatWithAssistant() envía a OpenAI
   - incluye historial
   - incluye context de productos
   ↓
5. Respuesta se agrega a messages[]
   ↓
6. Auto-scroll a último mensaje
```

---

## Seguridad

### Variables de Entorno

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_KEY=...      # anon key (pública)
VITE_OPENAI_API_KEY=...    # ⚠️ Sensible
```

**Protección:**

- `.env` en `.gitignore`
- `.env.example` con placeholders
- Supabase RLS habilitado

### Supabase Row Level Security

```sql
-- Solo lectura pública
CREATE POLICY "read_tipodehelados"
  ON tipodehelados FOR SELECT
  TO public
  USING (true);
```

### OpenAI Boundaries

```javascript
// System prompt limita scope
"Solo puedes ayudar con pedidos de helados y postres";
"NO puedes procesar pagos";
"NO inventes productos";
```

### Validaciones

```javascript
// Frontend
- Validación de formularios con SweetAlert2
- Validación de horarios (12-23)
- Validación de cantidades (min: 1, max: 10)
- Validación de gustos (max: 4)

// Backend (Supabase)
- Tipos de datos en PostgreSQL
- NOT NULL constraints
- RLS policies
```

---

## Optimizaciones

### Performance

1. **Code Splitting**

   - Vite automáticamente hace code splitting
   - Lazy loading de componentes (opcional)

2. **Carga de Datos**

   ```javascript
   // Carga paralela con Promise.all
   const [tipos, gustos, postres] = await Promise.all([
     getTiposDeHelados(),
     getGustosDeHelados(),
     getPostresHelados(),
   ]);
   ```

3. **Persistencia Local**

   - LocalStorage evita llamadas innecesarias
   - Cart y customerInfo persisten entre sesiones

4. **Memoization**
   - useEffect con dependencias específicas
   - Evita re-renders innecesarios

### UX Optimizations

1. **Loading States**

   ```javascript
   {
     loading && <Spinner />;
   }
   ```

2. **Feedback Inmediato**

   - SweetAlert2 para confirmaciones
   - Animaciones en botones

3. **Responsive Design**

   ```css
   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
   ```

4. **Dark Mode**
   - Transiciones suaves
   - Persistencia de preferencia

### Bundle Size

```bash
# Vite build optimization
npm run build

# Resultado típico:
dist/assets/index-[hash].js  ~150KB (gzipped: ~50KB)
dist/assets/index-[hash].css ~15KB (gzipped: ~3KB)
```

---

## Testing (Recomendaciones)

### Unit Tests

```javascript
// Ejemplo con Vitest
test("addToCart agrega item correctamente", () => {
  const { addToCart, cart } = useCart();
  addToCart({ id: 1, nombre: "Helado", cantidad: 2 });
  expect(cart).toHaveLength(1);
});
```

### Integration Tests

```javascript
// Ejemplo con React Testing Library
test("flujo completo de pedido", async () => {
  render(<App />);
  // Fill form
  // Select products
  // Go to cart
  // Confirm order
  expect(generarPDFOrden).toHaveBeenCalled();
});
```

### E2E Tests

```javascript
// Ejemplo con Playwright
test("pedido end-to-end", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.fill('[name="nombre"]', "Juan");
  // ...
  await page.click("text=Confirmar Pedido");
  await expect(page).toHaveURL(/.*pdf/);
});
```

---

## Mejoras Futuras

### Fase 2: Backend Propio

- [ ] API REST con Node.js/Express
- [ ] Autenticación JWT
- [ ] OpenAI API key en backend
- [ ] Rate limiting

### Fase 3: Features Avanzadas

- [ ] Panel de administración
- [ ] Gestión de inventario
- [ ] Estadísticas y analytics
- [ ] Sistema de notificaciones (email/SMS)

### Fase 4: Escalabilidad

- [ ] Docker containerization
- [ ] CI/CD con GitHub Actions
- [x] Deploy en Vercel ✅ https://proyecto-final-ai-engineering-mateo.vercel.app/
- [ ] Monitoring con Sentry

---

## Recursos y Referencias

- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [SweetAlert2 Docs](https://sweetalert2.github.io/)

---

**Documentación actualizada:** Diciembre 2025
**Autor:** Mario Esteban Mateo
