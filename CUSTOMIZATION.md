# 🎨 Guía de Personalización

## Personalizar Colores

### Tailwind Config

Edita [tailwind.config.js](tailwind.config.js):

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fef2f2',   // Muy claro
        100: '#fee2e2',
        // ... hasta ...
        900: '#7f1d1d',  // Muy oscuro
      },
      // Agregar tu propio color
      custom: {
        500: '#123456',
      }
    }
  }
}
```

Usar en componentes:

```jsx
<div className="bg-custom-500 text-white">Mi componente personalizado</div>
```

---

## Personalizar Fuentes

### 1. Agregar Google Fonts

En [index.html](index.html):

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
    rel="stylesheet"
  />
</head>
```

### 2. Configurar en Tailwind

En [tailwind.config.js](tailwind.config.js):

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    }
  }
}
```

---

## Personalizar Productos

### Modificar Precios

```sql
-- En Supabase SQL Editor
UPDATE tipodehelados
SET precio = 4000
WHERE nombre = '1/4 kg';
```

### Agregar Nuevos Gustos

```sql
INSERT INTO helados (nombre) VALUES
  ('Tiramisu'),
  ('Cheesecake'),
  ('Ferrero Rocher');
```

### Agregar Nuevos Postres

```sql
INSERT INTO postreshelados (nombre, precio, descripcion) VALUES
  ('Copa Oreo', 4200, 'Helado con galletas Oreo trituradas'),
  ('Milkshake', 3900, 'Batido de helado cremoso');
```

---

## Personalizar Textos

### Nombre de la Heladería

En [Header.jsx](src/components/Header.jsx):

```jsx
<h1 className="text-2xl md:text-3xl font-bold text-white">
  Tu Heladería 🍦 {/* ← Cambiar aquí */}
</h1>
```

### Mensajes del Asistente

En [openai.js](src/services/openai.js):

```javascript
const systemPrompt = `
Eres un asistente virtual de [TU HELADERÍA].
Tu trabajo es ayudar a los clientes...
`;
```

---

## Personalizar Horarios

### Cambiar Rango de Horarios

En [CustomerForm.jsx](src/components/CustomerForm.jsx):

```jsx
// Cambiar min y max
<input
  type="time"
  min="10:00" // ← Cambiar hora de apertura
  max="22:00" // ← Cambiar hora de cierre
/>;

// Actualizar validación
if (hora < 10 || hora > 22) {
  // Error
}

// Actualizar texto
<p className="text-sm">Horario disponible: 10:00 a 22:00</p>;
```

---

## Personalizar Límites

### Cambiar Máximo de Gustos

En [ProductCatalog.jsx](src/components/ProductCatalog.jsx):

```jsx
// Buscar línea
if (gustosSeleccionados.length >= 4) {
  // Cambiar 4 por el número deseado

// También actualizar el título
<h3>
  Selecciona hasta 6 Gustos ({gustosSeleccionados.length}/6)
</h3>
```

### Cambiar Límite de Cantidad

En postres y helados:

```jsx
<input
  type="number"
  max="20" // ← Cambiar límite
/>
```

---

## Personalizar PDF

### Modificar Diseño del PDF

En [pdfGenerator.js](src/utils/pdfGenerator.js):

```javascript
// Cambiar colores
doc.setTextColor(219, 39, 119); // RGB del título

// Cambiar fuentes
doc.setFontSize(24); // Tamaño del título

// Agregar logo (requiere imagen en base64)
const logo = "data:image/png;base64,...";
doc.addImage(logo, "PNG", 15, 15, 30, 30);

// Agregar footer personalizado
doc.text("Visitanos en: www.tuheladeria.com", pageWidth / 2, 280, {
  align: "center",
});
```

---

## Agregar Nuevas Categorías

### 1. Crear Tabla en Supabase

```sql
CREATE TABLE bebidas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL
);

INSERT INTO bebidas (nombre, precio) VALUES
  ('Coca Cola', 1500),
  ('Agua Mineral', 1000);
```

### 2. Agregar Servicio

En [supabase.js](src/services/supabase.js):

```javascript
export const getBebidas = async () => {
  try {
    const { data, error } = await supabase
      .from("bebidas")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
```

### 3. Agregar al Catálogo

En [ProductCatalog.jsx](src/components/ProductCatalog.jsx):

```jsx
// Agregar estado
const [bebidas, setBebidas] = useState([])

// Cargar en useEffect
const bebidas = await getBebidas()
setBebidas(bebidas)

// Agregar sección en el render
<section>
  <h2>🥤 Bebidas</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {bebidas.map(bebida => (
      <div key={bebida.id} className="card">
        <h4>{bebida.nombre}</h4>
        <span>${bebida.precio}</span>
        <button onClick={() => agregarBebidaAlCarrito(bebida)}>
          Agregar
        </button>
      </div>
    ))}
  </div>
</section>
```

---

## Personalizar Modo Oscuro

### Cambiar Colores del Modo Oscuro

En tu CSS o componentes:

```jsx
// Ejemplo: cambiar fondo oscuro
<div className="bg-gray-800 dark:bg-slate-900">
  {/* Cambiar gray-900 por tu color preferido */}
</div>

// Cambiar colores de texto
<p className="text-gray-900 dark:text-gray-100">
  Texto
</p>
```

---

## Agregar Logo

### 1. Agregar archivo de logo

Coloca tu logo en `public/logo.png`

### 2. Actualizar HTML

En [index.html](index.html):

```html
<link rel="icon" type="image/png" href="/logo.png" />
```

### 3. Agregar al Header

En [Header.jsx](src/components/Header.jsx):

```jsx
<div className="flex items-center gap-3">
  <img src="/logo.png" alt="Logo" className="w-10 h-10" />
  <h1>Tu Heladería</h1>
</div>
```

---

## Personalizar Validaciones

### Cambiar Validación de Teléfono

En [CustomerForm.jsx](src/components/CustomerForm.jsx):

```jsx
// Cambiar longitud mínima
if (!formData.telefono.trim() || formData.telefono.length < 10) {
  // Cambiar 8 por 10 o el número deseado

// Agregar validación de formato
const telefonoRegex = /^\d{10}$/
if (!telefonoRegex.test(formData.telefono)) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'El teléfono debe tener 10 dígitos'
  })
  return false
}
```

---

## Personalizar Animaciones

### Cambiar Velocidad de Transiciones

En [index.css](src/index.css):

```css
@layer components {
  .btn-primary {
    @apply transition duration-500; /* Cambiar 300 a 500 */
  }
}
```

### Agregar Animaciones Personalizadas

En [tailwind.config.js](tailwind.config.js):

```javascript
theme: {
  extend: {
    animation: {
      'bounce-slow': 'bounce 3s infinite',
      'spin-slow': 'spin 3s linear infinite',
    }
  }
}
```

Usar:

```jsx
<div className="animate-bounce-slow">Contenido animado</div>
```

---

## Personalizar Mensajes de SweetAlert2

### Tema Personalizado

Crear archivo [src/utils/sweetalert.js](src/utils/sweetalert.js):

```javascript
import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: "colored-toast",
  },
});

export const showSuccess = (message) => {
  Toast.fire({
    icon: "success",
    title: message,
  });
};

export const showError = (message) => {
  Toast.fire({
    icon: "error",
    title: message,
  });
};
```

Usar en componentes:

```javascript
import { showSuccess } from "../utils/sweetalert";

showSuccess("¡Producto agregado!");
```

---

## Personalizar Comportamiento del Carrito

### Auto-abrir Carrito al Agregar

En [ProductCatalog.jsx](src/components/ProductCatalog.jsx):

```jsx
// Recibir onNavigate como prop
const ProductCatalog = ({ onNavigate }) => {

// Después de agregar al carrito
addToCart(item)
Swal.fire({
  // ...
}).then(() => {
  // Abrir carrito automáticamente
  onNavigate('cart')
})
```

### Sugerir Productos Relacionados

```jsx
// En Cart.jsx, agregar sección
<div className="mt-6 p-4 bg-gray-50 rounded-lg">
  <h3>¿Olvidaste algo?</h3>
  <p>Clientes también pidieron:</p>
  {/* Mostrar productos sugeridos */}
</div>
```

---

## Variables de Configuración

Crear archivo [src/config/constants.js](src/config/constants.js):

```javascript
export const CONFIG = {
  HORARIO_APERTURA: "12:00",
  HORARIO_CIERRE: "23:00",
  MAX_GUSTOS: 4,
  MAX_CANTIDAD_POSTRE: 10,
  NOMBRE_HELADERIA: "Heladería Premium",
  TELEFONO_CONTACTO: "+54 11 1234-5678",
  DIRECCION: "Av. Corrientes 1234, CABA",
  COSTO_DELIVERY: 500,
  MINIMO_COMPRA_DELIVERY: 5000,
};
```

Usar en toda la app:

```javascript
import { CONFIG } from "../config/constants";

<p>{CONFIG.NOMBRE_HELADERIA}</p>;
```

---

## Tips de Personalización

1. **Mantén Consistencia**: Usa los mismos colores y estilos en toda la app
2. **Prueba en Móvil**: Siempre verifica cambios en pantallas pequeñas
3. **Backup**: Guarda copias antes de hacer cambios grandes
4. **Commits Frecuentes**: Si usas Git, haz commits después de cada personalización
5. **Documentación**: Comenta tus cambios personalizados

---

## Recursos Útiles

- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Google Fonts](https://fonts.google.com/)
- [Color Palette Generator](https://coolors.co/)
- [SVG Icons](https://lucide.dev/)
- [CSS Animations](https://animate.style/)

---

**¡Personaliza y haz que la app sea única! 🎨**
