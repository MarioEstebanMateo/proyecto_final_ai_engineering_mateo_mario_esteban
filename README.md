# 🍦 Heladería Premium - Aplicación Web con IA Conversacional

> 📖 **¿Primera vez aquí?** Lee el [Índice Completo de Documentación](INDEX.md) para navegar por todas las guías.

## 🌐 Demo en Vivo

**🚀 Aplicación desplegada en Vercel:**

👉 **https://proyecto-final-ai-engineering-mateo.vercel.app/**

Prueba todas las funcionalidades:

- ✅ Catálogo de helados y postres
- ✅ Carrito de compras interactivo
- ✅ Asistente IA conversacional con Groq (Llama 3.3 70B)
- ✅ Generación automática de PDF de pedidos
- ✅ Modo oscuro
- ✅ Diseño responsive

---

## 📋 Descripción del Proyecto

Aplicación web completa de pedidos para una heladería, desarrollada con **React + Vite + Tailwind CSS**, que integra **inteligencia artificial conversacional mediante Groq (Llama 3.3 70B)** y gestión de base de datos con **Supabase**.

El asistente de IA guía al cliente paso a paso en todo el proceso de pedido: desde la recopilación de datos personales, selección de productos, hasta la confirmación final y generación automática de PDF con la orden completa.

**Proyecto Final - IA Engineering - Mario Esteban Mateo**

> 📚 **Documentación Completa:**
>
> - ⚡ [Inicio Rápido (5 minutos)](QUICKSTART.md)
> - 🛠️ [Guía de Instalación Detallada](INSTALL.md)
> - 🏗️ [Documentación Técnica](TECHNICAL.md)
> - 🧪 [Casos de Prueba y Ejemplos](TESTING.md)
> - 🎨 [Guía de Personalización](CUSTOMIZATION.md)
> - 📊 [Resumen Visual del Proyecto](PROJECT_OVERVIEW.md)
> - 🗄️ [Configuración de Base de Datos](database/README.md)

---

## ✨ Características Principales

### 🎯 Funcionalidades Core

1. **Formulario de Cliente Inteligente**

   - Selección de tipo de entrega (Retiro/Delivery)
   - Validación de horarios (12:00 - 23:00)
   - Campos personalizados según tipo de entrega
   - Validación en tiempo real con SweetAlert2
   - Persistencia de datos del cliente en localStorage

2. **Catálogo de Productos Dinámico**

   - **Helados Personalizados**:
     - Selección de tamaño (1/4 kg, 1/2 kg, 1 kg)
     - Elección de hasta 4 gustos diferentes
     - Validación de límite de gustos
     - Selector de cantidad
   - **Postres Helados**:
     - Selección directa con cantidad personalizada
     - Modal de cantidad con validación (1-10)
   - Carga dinámica desde Supabase
   - Interfaz intuitiva con estados de selección
   - Diseño responsive con grid adaptativo

3. **Carrito de Compras Avanzado**

   - Persistencia local (localStorage)
   - Modificación de cantidades en tiempo real
   - Eliminación de productos individuales
   - Cálculo automático de subtotales y total
   - Resumen detallado de gustos de helados
   - Botones de navegación (Volver al catálogo, Modificar datos)
   - Limpieza de carrito con confirmación
   - Contador de items en header

4. **🤖 Asistente Virtual IA Conversacional - FUNCIONALIDAD PRINCIPAL**

   - **Proceso Completo Guiado**:

     1. Recopila datos del cliente (nombre, apellido, teléfono)
     2. Pregunta tipo de entrega (retiro/delivery)
     3. Solicita dirección (si es delivery)
     4. Valida horario de retiro/entrega (12:00-23:00)
     5. Muestra catálogo de helados con precios
     6. Guía en selección de gustos (máximo 4)
     7. Pregunta cantidad de helados
     8. Ofrece postres helados con precios
     9. Detecta postres y cantidades solicitadas
     10. Resume pedido completo con total
     11. **Genera PDF automáticamente**

   - **Características Técnicas**:
     - Modelo: Llama 3.3 70B (Groq) - 100% GRATUITO
     - Chat conversacional en tiempo real
     - Detección inteligente de cantidades ("2 alfajores", "alfajores 2")
     - Extracción automática de datos del pedido
     - Boundaries definidos (solo heladería)
     - Interfaz flotante con botón descriptivo
     - Historial de conversación completo
     - Mantiene foco en input automáticamente
     - Mensaje de despedida personalizado con nombre del cliente
     - Botón limitar chat con confirmación

5. **Generación Automática de PDF**

   - Formato profesional con logo
   - Información completa del cliente
   - Tipo de entrega claramente indicado
   - Horario de retiro/entrega
   - Detalle de productos:
     - Nombre del producto
     - Gustos seleccionados (helados)
     - Cantidad
     - Precio unitario
     - Subtotal
   - Cálculo de total general
   - Fecha y hora de generación
   - Apertura automática en nueva ventana
   - Formato bien alineado y legible

6. **Modo Oscuro Persistente**

   - Toggle integrado en el header
   - Persistencia con localStorage
   - Transiciones suaves entre temas
   - Todos los componentes adaptados
   - Iconos dinámicos (sol/luna)
   - Colores optimizados para ambos temas

7. **Diseño Responsive Completo**

   - Optimizado para escritorio (1024px+)
   - Totalmente funcional en tablets (768px - 1023px)
   - Perfecto en móviles (320px - 767px)
   - Breakpoints adaptativos en todos los componentes
   - Grid responsive en catálogo
   - Chat flotante adaptable
   - Navegación optimizada para touch

8. **Validaciones y UX**
   - Validación de horarios (12:00-23:00)
   - Límite de 4 gustos de helado
   - Confirmaciones para acciones importantes
   - Mensajes de error descriptivos
   - Estados de carga visibles
   - Feedback visual en todas las acciones
   - Alertas elegantes con SweetAlert2

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Iconografía

### Backend & Servicios

- **Supabase** - Base de datos PostgreSQL en la nube
- **Groq** - API gratuita con Llama 3.3 70B para el asistente conversacional
- **jsPDF** - Generación de PDFs en el cliente

### Librerías Adicionales

- **SweetAlert2** - Alertas y validaciones
- **React Router DOM** - Navegación (opcional)

---

## 📦 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta de Supabase (gratuita)
- API Key de Groq (gratuita, sin tarjeta de crédito)

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/MarioEstebanMateo/proyecto_final_ai_engineering_mateo_mario_esteban.git
cd proyecto_final_ai_engineering_mateo_mario_esteban
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

El archivo `.env` ya está creado en la raíz del proyecto. Debes editarlo con tus credenciales:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_KEY=tu_anon_key_de_supabase
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Nota**:
>
> - **Groq es GRATUITO** - No necesitas tarjeta de crédito
> - Obtén tu API Key en https://console.groq.com
> - Debes configurar tu URL y Key de Supabase (ver [INSTALL.md](INSTALL.md) para guía paso a paso)
> - El archivo `.env` está en `.gitignore` para proteger tus credenciales

4. **Configurar Base de Datos en Supabase**

Crea las siguientes tablas en tu proyecto de Supabase:

**Tabla: `tipodehelados`**

```sql
CREATE TABLE tipodehelados (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL
);

INSERT INTO tipodehelados (nombre, precio) VALUES
  ('1/4 kg', 3500),
  ('1/2 kg', 6500),
  ('1 kg', 12000);
```

**Tabla: `helados`**

```sql
CREATE TABLE helados (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL
);

INSERT INTO helados (nombre) VALUES
  ('Chocolate'),
  ('Vainilla'),
  ('Frutilla'),
  ('Dulce de Leche'),
  ('Limón'),
  ('Menta Granizada'),
  ('Banana Split'),
  ('Cookies & Cream'),
  ('Pistacho'),
  ('Mascarpone'),
  ('Frambuesa'),
  ('Maracuyá');
```

**Tabla: `postreshelados`**

```sql
CREATE TABLE postreshelados (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL
);

INSERT INTO postreshelados (nombre, precio) VALUES
  ('Bomba de Chocolate', 4500),
  ('Torta Helada', 8000),
  ('Copa Sundae', 3500),
  ('Brownie con Helado', 4000),
  ('Banana Split', 5000),
  ('Parfait de Frutas', 3800);
```

5. **Ejecutar la aplicación**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

> **💡 Demo en Producción:** https://proyecto-final-ai-engineering-mateo.vercel.app/

---

## 📂 Estructura del Proyecto

```
proyecto_final_ai_engineering_mateo_mario_esteban/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Encabezado con navegación
│   │   ├── DarkModeToggle.jsx      # Toggle modo oscuro
│   │   ├── CustomerForm.jsx        # Formulario de cliente
│   │   ├── ProductCatalog.jsx      # Catálogo de productos
│   │   ├── Cart.jsx                # Carrito de compras
│   │   └── ChatAssistant.jsx       # Asistente IA conversacional
│   ├── context/
│   │   ├── CartContext.jsx         # Estado global del carrito
│   │   └── DarkModeContext.jsx     # Estado global modo oscuro
│   ├── services/
│   │   ├── supabase.js             # Integración Supabase
│   │   └── groq.js                 # Integración Groq (IA)
│   ├── utils/
│   │   └── pdfGenerator.js         # Generación de PDFs
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Estilos globales
├── public/
├── .env                            # Variables de entorno (no versionado)
├── .env.example                    # Ejemplo de variables
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎮 Uso de la Aplicación

### Flujo del Usuario

1. **Datos del Cliente**

   - Seleccionar tipo de pedido (Retiro/Delivery)
   - Completar datos personales
   - Elegir horario (12:00-23:00)
   - Si es delivery, ingresar dirección

2. **Selección de Productos**

   - **Helados**: Elegir tamaño → Seleccionar hasta 4 gustos → Cantidad
   - **Postres**: Click en el postre → Ingresar cantidad

3. **Revisar Carrito**

   - Ver resumen de productos
   - Modificar cantidades o eliminar items
   - Opción de volver al catálogo
   - Modificar datos del cliente si es necesario

4. **Confirmar Pedido**

   - Revisar información completa
   - Confirmar orden
   - Se genera PDF automáticamente
   - PDF se abre en nueva ventana

5. **Asistente IA (PROCESO COMPLETO)**
   - Click en botón "Haz tu pedido con nuestro Asistente IA"
   - El asistente te guiará paso a paso:
     1. Preguntará tu nombre y apellido
     2. Solicitará teléfono de contacto
     3. Tipo de entrega (retiro/delivery)
     4. Dirección (si es delivery)
     5. Horario (valida 12:00-23:00)
     6. Te mostrará los helados disponibles con precios
     7. Te dejará elegir hasta 4 gustos
     8. Preguntará cantidad
     9. Te ofrecerá postres helados con precios
     10. Resumirá todo tu pedido con total
     11. **Generará automáticamente el PDF**
   - Chat conversacional natural
   - Mantiene el foco para escribir fácilmente
   - Te despide por tu nombre al finalizar

---

## 🤖 Asistente IA Conversacional - Funcionalidad Principal

El **Asistente Virtual con IA** es la característica principal de la aplicación. Utiliza **Groq con Llama 3.3 70B** (100% gratuito) para crear una experiencia conversacional completa que guía al cliente desde el inicio hasta la generación del PDF final.

### ✅ Proceso Completo del Asistente

1. **Recopilación de Datos**

   - Nombre
   - Apellido
   - Teléfono

2. **Configuración de Entrega**

   - Tipo: Retiro o Delivery
   - Dirección (si es delivery)
   - Horario (valida 12:00-23:00)

3. **Selección de Productos**

   - Muestra tipos de helados con precios
   - Permite elegir hasta 4 gustos
   - Detecta cantidades automáticamente
   - Ofrece postres helados con precios
   - Reconoce pedidos ("2 alfajores", "torta helada")

4. **Confirmación y Generación**
   - Resume todo el pedido
   - Muestra total a pagar
   - Genera PDF automáticamente al confirmar
   - Mensaje de despedida personalizado

### 🎯 Características del Asistente

✅ **Puede:**

- Guiar todo el proceso de pedido paso a paso
- Mostrar productos y precios disponibles
- Validar información (horarios, límites)
- Detectar cantidades en lenguaje natural
- Resumir pedidos completos con totales
- Generar PDF automáticamente
- Mantener conversación contextual

❌ **Boundaries (NO puede):**

- Procesar pagos directamente
- Modificar precios del catálogo
- Acceder a información fuera de contexto
- Realizar tareas no relacionadas con pedidos

### 💡 Ventajas de Usar Groq

- **100% Gratuito** - 14,400 requests/día
- **Sin tarjeta de crédito** requerida
- **Muy rápido** - Hasta 10x más que GPT
- **Modelo potente** - Llama 3.3 70B
- **Fácil integración** - API compatible con OpenAI

---

## 🔒 Seguridad

- ✅ Variables de entorno no expuestas en el código
- ✅ `.env` incluido en `.gitignore`
- ✅ Supabase Row Level Security (RLS) configurado
- ✅ API Keys protegidas en variables de entorno
- ✅ Validaciones en frontend (SweetAlert2)
- ✅ Groq API (sin riesgo de costos inesperados - es gratuito)

> **Nota**: Para producción se recomienda usar un backend intermediario que maneje las API keys.

---

## 📱 Responsive Design

La aplicación está optimizada para:

- 📱 **Móviles** (320px - 767px)
- 💻 **Tablets** (768px - 1023px)
- 🖥️ **Escritorio** (1024px+)

---

## 🎨 Personalización

### Colores

Los colores principales están en [tailwind.config.js](tailwind.config.js):

```js
colors: {
  primary: {
    /* pink shades */
  }
}
```

### Modo Oscuro

Todos los componentes soportan modo oscuro con clases `dark:`:

```jsx
className = "bg-white dark:bg-gray-800";
```

---

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"

- Verifica que `.env` exista y tenga las variables correctas
- Reinicia el servidor de desarrollo

### Error: "No se pudo conectar con el asistente"

- Verifica tu API Key de Groq en el .env
- Revisa que tengas conexión a internet
- Groq es gratuito, no hay problemas de créditos

### Productos no se cargan

- Verifica la conexión a Supabase
- Asegúrate de que las tablas existan y tengan datos

---

## 📝 Reflexión sobre el Desarrollo

### Desafíos Enfrentados

1. **Integración de IA Conversacional**: Configurar el asistente para guiar TODO el proceso de pedido, desde recopilación de datos hasta generación de PDF, manteniendo contexto en toda la conversación.

2. **Detección Inteligente de Pedidos**: Implementar extracción automática de datos (cantidades, productos, información personal) desde lenguaje natural del chat.

3. **Persistencia de Estado**: Mantener sincronizado el carrito y los datos del cliente entre navegación, recargas y diferentes rutas.

4. **Generación Dinámica de PDF**: Formatear correctamente el documento con todos los detalles de la orden, incluyendo gustos de helados y cálculos precisos.

5. **Responsive Design Completo**: Adaptar componentes complejos como el catálogo y el chat flotante para funcionar perfectamente en móviles.

6. **Cambio de OpenAI a Groq**: Migración a modelo gratuito manteniendo toda la funcionalidad y mejorando la velocidad.

### Aprendizajes Clave

- **Context API**: Excelente para gestionar estado global sin Redux
- **LocalStorage**: Fundamental para persistencia del lado del cliente
- **Tailwind CSS**: Productividad muy alta con utility classes
- **OpenAI API**: Importancia de prompts bien estructurados
- **Supabase**: Alternativa poderosa a Firebase con PostgreSQL

### Mejoras Futuras

- [ ] Backend con Node.js/Express para mayor seguridad
- [ ] Autenticación de usuarios
- [ ] Historial de pedidos
- [ ] Integración con pasarelas de pago
- [ ] Sistema de notificaciones (email/SMS)
- [ ] Panel de administración
- [ ] Análisis de voz real (Speech-to-Text)
- [ ] PWA con capacidades offline

---

## 👨‍💻 Autor

**Mario Esteban Mateo**

- Proyecto Final - IA Engineering
- GitHub: [@MarioEstebanMateo](https://github.com/MarioEstebanMateo)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para el curso de IA Engineering.

---

## 🙏 Agradecimientos

- OpenAI por la API de GPT-3.5
- Supabase por la plataforma de base de datos
- Comunidad de React y Tailwind CSS
- Instructores del curso de IA Engineering

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de [Troubleshooting](#-troubleshooting)
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de tener las variables de entorno configuradas
4. Revisa la consola del navegador para errores

---

**¡Gracias por revisar este proyecto! 🍦✨**
