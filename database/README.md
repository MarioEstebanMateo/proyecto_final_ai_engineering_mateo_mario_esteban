# Configuración de Base de Datos - Supabase

## 📋 Guía Rápida de Configuración

### Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta
3. Click en "New Project"
4. Completa los datos:
   - **Name**: heladeria-premium
   - **Database Password**: (guarda esta contraseña)
   - **Region**: Elige la más cercana a ti
5. Click en "Create new project"

### Paso 2: Ejecutar Script SQL

1. Una vez creado el proyecto, ve a la sección **SQL Editor** en el menú lateral
2. Click en "New Query"
3. Copia y pega el contenido completo del archivo `setup.sql`
4. Click en "Run" o presiona `Ctrl + Enter`
5. Verifica que aparezca el mensaje de éxito

### Paso 3: Verificar las Tablas

1. Ve a la sección **Table Editor** en el menú lateral
2. Deberías ver 3 tablas:
   - `tipodehelados`
   - `helados`
   - `postreshelados`
3. Haz click en cada tabla para verificar que tengan datos

### Paso 4: Obtener Credenciales

1. Ve a **Settings** → **API** en el menú lateral
2. Copia los siguientes valores:
   - **Project URL**: Tu URL de Supabase
   - **anon/public key**: Tu clave pública (ANON KEY)

### Paso 5: Configurar Variables de Entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza los valores:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu_anon_key_aqui
VITE_OPENAI_API_KEY=tu_api_key_de_openai
```

---

## 🔍 Estructura de las Tablas

### Tabla: `tipodehelados`

| Campo      | Tipo      | Descripción                    |
| ---------- | --------- | ------------------------------ |
| id         | SERIAL    | ID único (autoincremental)     |
| nombre     | TEXT      | Nombre del tipo (ej: "1/4 kg") |
| precio     | DECIMAL   | Precio del tipo de helado      |
| created_at | TIMESTAMP | Fecha de creación              |

**Datos de ejemplo:**

- 1/4 kg - $3500
- 1/2 kg - $6500
- 1 kg - $12000

### Tabla: `helados`

| Campo      | Tipo      | Descripción                |
| ---------- | --------- | -------------------------- |
| id         | SERIAL    | ID único (autoincremental) |
| nombre     | TEXT      | Nombre del gusto           |
| created_at | TIMESTAMP | Fecha de creación          |

**Datos de ejemplo:**

- Chocolate
- Vainilla
- Frutilla
- Dulce de Leche
- Limón
- (y más...)

### Tabla: `postreshelados`

| Campo       | Tipo      | Descripción                |
| ----------- | --------- | -------------------------- |
| id          | SERIAL    | ID único (autoincremental) |
| nombre      | TEXT      | Nombre del postre          |
| precio      | DECIMAL   | Precio del postre          |
| descripcion | TEXT      | Descripción del postre     |
| created_at  | TIMESTAMP | Fecha de creación          |

**Datos de ejemplo:**

- Bomba de Chocolate - $4500
- Torta Helada - $8000
- Copa Sundae - $3500
- (y más...)

---

## 🔒 Seguridad (RLS)

El script incluye configuración de **Row Level Security (RLS)**:

- ✅ Lectura pública habilitada para todas las tablas
- ✅ Solo el admin puede modificar datos
- ✅ Datos protegidos contra modificaciones no autorizadas

---

## ✏️ Modificar Datos

### Agregar un nuevo gusto de helado:

```sql
INSERT INTO helados (nombre) VALUES ('Nuevo Gusto');
```

### Agregar un nuevo postre:

```sql
INSERT INTO postreshelados (nombre, precio, descripcion)
VALUES ('Nuevo Postre', 5500, 'Descripción del postre');
```

### Modificar un precio:

```sql
UPDATE tipodehelados
SET precio = 4000
WHERE nombre = '1/4 kg';
```

---

## 🐛 Troubleshooting

### Error: "relation already exists"

- Las tablas ya existen. Puedes eliminarlas primero con:

```sql
DROP TABLE IF EXISTS tipodehelados CASCADE;
DROP TABLE IF EXISTS helados CASCADE;
DROP TABLE IF EXISTS postreshelados CASCADE;
```

Luego ejecuta el script nuevamente.

### Error: "permission denied"

- Asegúrate de estar usando el SQL Editor como propietario del proyecto
- Verifica que las políticas RLS no estén bloqueando el acceso

### No se muestran datos en la aplicación

- Verifica que las credenciales en `.env` sean correctas
- Revisa la consola del navegador para errores
- Asegúrate de que las tablas tengan datos

---

## 📊 Consultas Útiles

### Ver todos los productos:

```sql
-- Tipos de helados
SELECT * FROM tipodehelados;

-- Gustos
SELECT * FROM helados;

-- Postres
SELECT * FROM postreshelados;
```

### Contar productos:

```sql
SELECT
  (SELECT COUNT(*) FROM tipodehelados) as tipos,
  (SELECT COUNT(*) FROM helados) as gustos,
  (SELECT COUNT(*) FROM postreshelados) as postres;
```

---

## 🎯 Próximos Pasos

Después de configurar la base de datos:

1. ✅ Verifica que las credenciales estén en `.env`
2. ✅ Instala las dependencias: `npm install`
3. ✅ Ejecuta la aplicación: `npm run dev`
4. ✅ Prueba cargar productos en el catálogo

---

**¿Necesitas ayuda?** Revisa el [README principal](../README.md) o la documentación de [Supabase](https://supabase.com/docs).
