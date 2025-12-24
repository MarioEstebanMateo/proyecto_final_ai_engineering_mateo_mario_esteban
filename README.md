# 🍦 Heladería Premium - Aplicación Web con IA Conversacional

> 📖 **¿Primera vez aquí?** Lee el [Índice Completo de Documentación](INDEX.md) para navegar por todas las guías.

## 📋 Descripción del Proyecto

Aplicación web completa de pedidos para una heladería, desarrollada con React + Vite + Tailwind CSS, que integra inteligencia artificial conversacional mediante OpenAI API y gestión de base de datos con Supabase.

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
   - Persistencia de datos del cliente

2. **Catálogo de Productos Dinámico**

   - **Helados**: Selección de tipo y hasta 4 gustos
   - **Postres Helados**: Selección directa con cantidad
   - Carga de productos desde Supabase
   - Interfaz intuitiva y responsive

3. **Carrito de Compras Avanzado**

   - Persistencia local (localStorage)
   - Modificación de cantidades
   - Eliminación de productos
   - Cálculo automático de subtotales y total
   - Posibilidad de volver atrás y modificar

4. **Asistente Virtual con IA (OpenAI)**

   - Chat conversacional en tiempo real
   - Boundaries definidos (solo heladería)
   - Recomendaciones de productos
   - Respuestas contextuales
   - Interfaz flotante minimalista

5. **Generación de PDF**

   - Orden completa con todos los detalles
   - Información del cliente
   - Detalle de productos con gustos
   - Subtotales y total
   - Apertura automática en nueva ventana

6. **Modo Oscuro**

   - Toggle persistente
   - Transiciones suaves
   - Todos los componentes adaptados

7. **Diseño Responsive**
   - Optimizado para escritorio
   - Totalmente funcional en móviles
   - Breakpoints adaptativos

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Iconografía

### Backend & Servicios

- **Supabase** - Base de datos PostgreSQL
- **OpenAI API (GPT-3.5-turbo)** - IA Conversacional
- **jsPDF** - Generación de PDFs

### Librerías Adicionales

- **SweetAlert2** - Alertas y validaciones
- **React Router DOM** - Navegación (opcional)

---

## 📦 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta de Supabase
- API Key de OpenAI

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
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Nota**:
>
> - La API Key de OpenAI ya está configurada
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
│   │   └── openai.js               # Integración OpenAI
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

5. **Asistente IA (opcional)**
   - Click en botón flotante
   - Chatear con el asistente
   - Recibir recomendaciones
   - Resolver dudas

---

## 🤖 Boundaries del Asistente IA

El asistente conversacional tiene las siguientes limitaciones:

✅ **Puede:**

- Responder preguntas sobre productos
- Recomendar helados y postres
- Explicar proceso de pedido
- Dar información general de la heladería

❌ **NO puede:**

- Procesar pagos
- Acceder a información de precios que no estén en el catálogo
- Modificar el carrito directamente
- Realizar acciones fuera del contexto de pedidos

---

## 🔒 Seguridad

- ✅ Variables de entorno no expuestas en el código
- ✅ `.env` incluido en `.gitignore`
- ✅ Supabase Row Level Security (RLS) recomendado
- ✅ OpenAI API Key en servidor (dangerouslyAllowBrowser solo para desarrollo)
- ✅ Validaciones en frontend y backend

> **Importante**: Para producción, se recomienda usar un backend intermediario que maneje las API keys de OpenAI.

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

- Verifica tu API Key de OpenAI
- Revisa que tengas créditos disponibles en tu cuenta

### Productos no se cargan

- Verifica la conexión a Supabase
- Asegúrate de que las tablas existan y tengan datos

---

## 📝 Reflexión sobre el Desarrollo

### Desafíos Enfrentados

1. **Integración de OpenAI**: Configurar boundaries adecuados para que el asistente no salga del contexto de la heladería.

2. **Persistencia de Estado**: Mantener sincronizado el carrito y los datos del cliente entre navegación y recargas.

3. **Generación de PDF**: Formatear correctamente el documento con todos los detalles de la orden.

4. **Responsive Design**: Adaptar componentes complejos como el catálogo y el chat para móviles.

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
