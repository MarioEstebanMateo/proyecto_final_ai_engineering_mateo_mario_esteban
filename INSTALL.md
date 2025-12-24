# 🚀 Guía de Instalación Rápida

## Paso 1: Requisitos Previos

Asegúrate de tener instalado:

- ✅ Node.js (v18 o superior) - [Descargar](https://nodejs.org/)
- ✅ npm (viene con Node.js)
- ✅ Git (opcional) - [Descargar](https://git-scm.com/)

Verifica las instalaciones:

```bash
node --version
npm --version
```

---

## Paso 2: Clonar o Descargar el Proyecto

### Opción A: Con Git

```bash
git clone https://github.com/MarioEstebanMateo/proyecto_final_ai_engineering_mateo_mario_esteban.git
cd proyecto_final_ai_engineering_mateo_mario_esteban
```

### Opción B: Descarga Directa

1. Descarga el ZIP desde GitHub
2. Extrae el contenido
3. Abre la carpeta en tu terminal

---

## Paso 3: Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias:

- React, React DOM
- Vite
- Tailwind CSS
- Supabase Client
- OpenAI
- jsPDF
- SweetAlert2
- Lucide React

---

## Paso 4: Configurar Supabase

### 4.1 Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Click en "Start your project" o "Sign in"
3. Crea una cuenta si no tienes una (es gratis)
4. Click en "New Project"
5. Completa los datos:
   - **Organization**: Crea una nueva o usa una existente
   - **Name**: `heladeria-premium`
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona la más cercana a ti
   - **Plan**: Free (suficiente para este proyecto)
6. Click en "Create new project"
7. Espera 1-2 minutos mientras se crea el proyecto

### 4.2 Crear las Tablas

1. Una vez creado el proyecto, ve a **SQL Editor** en el menú lateral izquierdo
2. Click en el botón "+ New query"
3. Abre el archivo `database/setup.sql` de este proyecto
4. Copia TODO el contenido del archivo
5. Pega el contenido en el editor SQL de Supabase
6. Click en "Run" (esquina inferior derecha) o presiona `Ctrl + Enter`
7. Deberías ver el mensaje "Success. No rows returned"

### 4.3 Verificar que las Tablas se Crearon

1. Ve a **Table Editor** en el menú lateral
2. Deberías ver 3 tablas:
   - `tipodehelados` (3 filas)
   - `helados` (20 filas)
   - `postreshelados` (8 filas)
3. Haz click en cada tabla para verificar que tengan datos

### 4.4 Obtener las Credenciales

1. Ve a **Settings** (⚙️ ícono de configuración) en el menú lateral inferior
2. Click en **API** en el submenú
3. En la sección "Project API keys", encontrarás:
   - **Project URL**: Algo como `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public**: Una clave larga que empieza con `eyJ...`

**¡IMPORTANTE!** Guarda estos dos valores, los necesitarás en el siguiente paso.

---

## Paso 5: Configurar Variables de Entorno

### 5.1 Crear el archivo .env

En la raíz del proyecto, el archivo `.env` ya existe. Ábrelo con tu editor de texto.

### 5.2 Reemplazar las Variables

Reemplaza los valores en el archivo `.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co  # ← Pega tu Project URL aquí
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...    # ← Pega tu anon public key aquí

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # ← Pega tu OpenAI API Key aquí
```

**Ejemplo completo:**

```env
VITE_SUPABASE_URL=https://abcdefghijklmn.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTU3NjAwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5.3 Guardar el archivo

Guarda el archivo `.env` (Ctrl + S o Cmd + S)

**⚠️ IMPORTANTE**: Nunca compartas este archivo públicamente. Ya está incluido en `.gitignore`.

---

## Paso 6: Ejecutar la Aplicación

### 6.1 Iniciar el servidor de desarrollo

```bash
npm run dev
```

### 6.2 Abrir en el navegador

El servidor se iniciará automáticamente. Si no, abre:

```
http://localhost:3000
```

---

## Paso 7: Verificar que Todo Funcione

### Checklist de Verificación:

- [ ] La aplicación se abre sin errores
- [ ] Ves el formulario de datos del cliente
- [ ] Al llenar el formulario y continuar, ves el catálogo
- [ ] Los productos (helados y postres) se cargan correctamente
- [ ] Puedes agregar productos al carrito
- [ ] El ícono del carrito muestra la cantidad de items
- [ ] Al ir al carrito, ves tus productos
- [ ] El botón flotante del chat aparece en la esquina inferior derecha
- [ ] El modo oscuro funciona (botón superior derecho)

### Si algo no funciona:

1. **No se cargan los productos**

   - Abre la consola del navegador (F12)
   - Verifica que no haya errores de Supabase
   - Revisa que las credenciales en `.env` sean correctas
   - Asegúrate de haber ejecutado el script SQL completo

2. **El chat no responde**

   - Verifica la consola del navegador
   - La API Key de OpenAI ya está configurada
   - Si hay errores de cuota, verifica tu cuenta de OpenAI

3. **Error "Cannot find module"**
   - Ejecuta `npm install` nuevamente
   - Borra `node_modules` y ejecuta `npm install`

---

## Paso 8: Probar las Funcionalidades

### 8.1 Hacer un Pedido Completo

1. Completa el formulario con tus datos
2. Selecciona "Retiro en local" o "Delivery"
3. Ingresa un horario entre 12:00 y 23:00
4. Click en "Continuar al Catálogo"

5. **Agregar Helados:**

   - Selecciona un tamaño (ej: 1/4 kg)
   - Elige hasta 4 gustos
   - Selecciona cantidad
   - Click en "Agregar al Carrito"

6. **Agregar Postres:**

   - Click en el ícono "+" de un postre
   - Ingresa la cantidad
   - Click en "Agregar"

7. **Ver Carrito:**

   - Click en el ícono del carrito (arriba a la derecha)
   - Verifica tu orden
   - Modifica cantidades si es necesario

8. **Confirmar Pedido:**
   - Click en "Confirmar Pedido y Generar PDF"
   - Revisa el resumen
   - Click en "Sí, confirmar"
   - Se generará y abrirá el PDF automáticamente

### 8.2 Probar el Asistente IA

1. Click en el botón flotante de chat (esquina inferior derecha)
2. Escribe: "¿Qué helados tienen?"
3. El asistente debería responder con los productos disponibles
4. Prueba preguntas como:
   - "¿Cuál es el helado más popular?"
   - "¿Tienen postres?"
   - "¿Cómo hago un pedido?"

### 8.3 Probar Modo Oscuro

1. Click en el botón de la luna/sol (esquina superior derecha)
2. La aplicación debería cambiar entre modo claro y oscuro
3. La preferencia se guarda automáticamente

---

## 🎉 ¡Listo!

Tu aplicación está funcionando correctamente. Ahora puedes:

- Explorar el código fuente
- Modificar productos en Supabase
- Personalizar los estilos
- Agregar nuevas funcionalidades

---

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de OpenAI](https://platform.openai.com/docs)

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:

1. Revisa la consola del navegador (F12)
2. Lee la sección "Troubleshooting" en el README principal
3. Verifica que todas las variables de entorno estén correctas
4. Asegúrate de que las tablas de Supabase tengan datos

---

## 📝 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

---

**¡Disfruta desarrollando con la aplicación! 🍦✨**
