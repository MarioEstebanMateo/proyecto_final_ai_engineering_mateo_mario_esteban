# ⚡ Inicio Rápido - 5 Minutos

## 🌐 Demo en Vivo

**¿Quieres probar la aplicación antes de instalarla?**

👉 **https://proyecto-final-ai-engineering-mateo.vercel.app/**

---

## Para Usuarios con Supabase ya Configurado

Si ya tienes tu proyecto de Supabase configurado, sigue estos pasos:

### 1️⃣ Instalar Dependencias (1 minuto)

```bash
npm install
```

### 2️⃣ Configurar Variables de Entorno (1 minuto)

Edita el archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Groq es 100% GRATUITO** - Obtén tu API Key en https://console.groq.com (sin tarjeta de crédito). Solo necesitas también tu URL y Key de Supabase.

### 3️⃣ Ejecutar la Aplicación (30 segundos)

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

### 4️⃣ ¡Listo! 🎉

Ahora puedes:

- ✅ Completar el formulario de cliente
- ✅ Seleccionar helados y postres
- ✅ Agregar productos al carrito
- ✅ Chatear con el asistente IA
- ✅ Generar PDF de tu pedido

---

## Para Nuevos Usuarios (Primera Vez)

Si es tu primera vez configurando el proyecto:

### Opción 1: Instalación Completa (15-20 minutos)

Sigue la guía detallada en [INSTALL.md](INSTALL.md) que incluye:

1. Crear cuenta en Supabase
2. Configurar base de datos
3. Obtener credenciales
4. Instalar dependencias
5. Ejecutar la aplicación

### Opción 2: Video Tutorial

🎥 [Ver video tutorial](link-al-video) (próximamente)

---

## Verificación Rápida

### ✅ Checklist de Funcionamiento

Abre la aplicación y verifica:

- [ ] El formulario se muestra correctamente
- [ ] Los productos cargan desde Supabase
- [ ] Puedes agregar productos al carrito
- [ ] El ícono del carrito muestra la cantidad
- [ ] El chat asistente responde (botón flotante)
- [ ] El modo oscuro funciona (botón superior derecho)

Si todo funciona, ¡estás listo! 🚀

---

## Comandos Esenciales

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver errores en consola
# Presiona F12 en el navegador y ve a la pestaña Console
```

---

## Solución Rápida de Problemas

### ❌ "No se cargan los productos"

**Solución:**

1. Verifica que Supabase URL y Key estén en `.env`
2. Verifica que ejecutaste el script SQL en Supabase
3. Revisa la consola del navegador (F12)

### ❌ "El chat no responde"

**Solución:**

1. La API Key de OpenAI ya está configurada
2. Verifica conexión a internet
3. Revisa la consola del navegador (F12)

### ❌ "Error al instalar dependencias"

**Solución:**

```bash
# Limpia cache y reinstala
rm -rf node_modules package-lock.json
npm install
```

---

## Próximos Pasos

Después de verificar que todo funciona:

1. 📖 Lee la [documentación completa](README.md)
2. 🎨 Personaliza la app con [CUSTOMIZATION.md](CUSTOMIZATION.md)
3. 🧪 Prueba los casos de uso en [TESTING.md](TESTING.md)
4. 🔧 Entiende la arquitectura en [TECHNICAL.md](TECHNICAL.md)

---

## Recursos de Ayuda

- 📚 [Documentación Principal](README.md)
- 🛠️ [Guía de Instalación Completa](INSTALL.md)
- 🗄️ [Configuración de Base de Datos](database/README.md)
- 🎨 [Guía de Personalización](CUSTOMIZATION.md)

---

## ¿Necesitas Ayuda?

Si tienes problemas:

1. Revisa la sección de [Troubleshooting](README.md#-troubleshooting)
2. Verifica la consola del navegador (F12)
3. Asegúrate de que todas las variables de entorno estén correctas

---

**¡Disfruta desarrollando! 🍦✨**
