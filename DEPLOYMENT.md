# 🚀 Guía de Despliegue en Vercel

## Aplicación Desplegada

**🌐 URL de Producción:** https://proyecto-final-ai-engineering-mateo.vercel.app/

---

## 📋 Pasos para Desplegar

### 1️⃣ Preparar el Proyecto

El archivo `vercel.json` ya está configurado en el proyecto:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Este archivo permite el routing correcto para la SPA (Single Page Application) de React.

### 2️⃣ Subir Cambios a GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 3️⃣ Importar Proyecto en Vercel

1. **Ir a Vercel Dashboard**

   - Abre https://vercel.com
   - Inicia sesión con tu cuenta

2. **Crear Nuevo Proyecto**

   - Click en **"Add New..."** → **"Project"**
   - Click en **"Import Git Repository"**

3. **Conectar GitHub** (si es primera vez)

   - Click en **"Connect Git Provider"** → GitHub
   - Autoriza Vercel para acceder a tus repositorios

4. **Seleccionar Repositorio**
   - Busca: `proyecto_final_ai_engineering_mateo_mario_esteban`
   - Click en **"Import"**

### 4️⃣ Configurar el Proyecto

Vercel detectará automáticamente que es un proyecto Vite. Verifica:

- **Project Name**: `proyecto-final-ai-engineering-mateo` (o el que prefieras)
- **Framework Preset**: `Vite` ✅
- **Root Directory**: `./` (dejar como está)
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅
- **Install Command**: `npm install` ✅

### 5️⃣ ⚠️ Configurar Variables de Entorno (CRÍTICO)

Antes de hacer deploy, expande **"Environment Variables"** y agrega:

**Variable 1 - Supabase URL:**

```
Key: VITE_SUPABASE_URL
Value: https://tbnlhhrjlzacjjoznwbb.supabase.co
```

**Variable 2 - Supabase Key:**

```
Key: VITE_SUPABASE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibmxoaHJqbHphY2pqb3pud2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NjI1MDYsImV4cCI6MjA2MzUzODUwNn0._4c4uqUCWYyDp5Hz69nfTD3ty7ll-D0zVF8OGHYdnHA
```

**Variable 3 - Groq API Key:**

```
Key: VITE_GROQ_API_KEY
Value: [TU_API_KEY_DE_GROQ]
```

> **Nota:** Asegúrate de marcar que las variables estén disponibles para: Production, Preview y Development.

### 6️⃣ Deploy

- Scroll hasta el final
- Click en **"Deploy"** 🚀
- Espera 1-2 minutos mientras Vercel construye y despliega

### 7️⃣ ¡Listo! ✅

Una vez completado:

- Verás **"Congratulations!"** 🎉
- Tu app estará en vivo en: `https://tu-proyecto.vercel.app`
- Click en **"Visit"** para ver la aplicación

---

## 🔄 Actualizaciones Automáticas

Cada vez que hagas `git push` a la rama `main`, Vercel:

1. Detectará los cambios automáticamente
2. Construirá una nueva versión
3. La desplegará en segundos

---

## 🛠️ Configuración Avanzada

### Dominio Personalizado

1. En el Dashboard de Vercel, ve a tu proyecto
2. **Settings** → **Domains**
3. Click en **"Add"**
4. Ingresa tu dominio personalizado
5. Sigue las instrucciones para configurar DNS

### Variables de Entorno

Para actualizar o agregar variables:

1. **Settings** → **Environment Variables**
2. Agrega, edita o elimina variables
3. Click en **"Save"**
4. **Redeploy** para aplicar cambios

### Rollback a Versión Anterior

1. Ve a **Deployments**
2. Encuentra el deployment que quieres restaurar
3. Click en los tres puntos **"..."** → **"Promote to Production"**

---

## 📊 Características de Vercel

✅ **HTTPS automático** - Certificado SSL gratuito
✅ **CDN global** - Distribución mundial
✅ **Deployments instantáneos** - Cada push se despliega
✅ **Preview deployments** - Cada PR tiene su propia URL
✅ **Analytics** - Estadísticas de tráfico
✅ **Logs en tiempo real** - Debugging fácil
✅ **Zero configuration** - Detecta Vite automáticamente

---

## 🔍 Troubleshooting

### La app no carga (página en blanco)

**Causa:** Variables de entorno no configuradas

**Solución:**

1. Ve a **Settings** → **Environment Variables**
2. Verifica que las 3 variables estén presentes
3. Haz un **Redeploy**

### Errores de routing (404 en rutas)

**Causa:** Falta el archivo `vercel.json`

**Solución:**

- El archivo ya está en el proyecto
- Si lo eliminaste, créalo con el contenido mostrado arriba

### Error de build

**Causa:** Dependencias faltantes o código con errores

**Solución:**

1. Ve a **Deployments** → Click en el deployment fallido
2. Lee los logs para identificar el error
3. Corrige localmente y haz push

### Actualicé variables pero no se aplican

**Causa:** Necesitas hacer un redeploy

**Solución:**

1. **Deployments** → Click en el último deployment
2. Click en los tres puntos **"..."** → **"Redeploy"**

---

## 📚 Recursos Adicionales

- [Documentación Oficial de Vercel](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI](https://vercel.com/docs/cli) para deployments desde terminal

---

**Actualizado:** Diciembre 24, 2025
**URL:** https://proyecto-final-ai-engineering-mateo.vercel.app/
