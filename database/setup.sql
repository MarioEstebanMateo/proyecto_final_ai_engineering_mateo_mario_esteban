-- Script SQL para crear la base de datos en Supabase
-- Heladería Premium - Proyecto Final IA Engineering

-- ============================================
-- Tabla: tipodehelados
-- Descripción: Tipos/tamaños de helados con precios
-- ============================================
CREATE TABLE IF NOT EXISTS tipodehelados (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insertar datos de ejemplo
INSERT INTO tipodehelados (nombre, precio) VALUES
  ('1/4 kg', 3500),
  ('1/2 kg', 6500),
  ('1 kg', 12000)
ON CONFLICT DO NOTHING;

-- ============================================
-- Tabla: helados
-- Descripción: Gustos de helados disponibles
-- ============================================
CREATE TABLE IF NOT EXISTS helados (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insertar gustos de helados
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
  ('Maracuyá'),
  ('Café'),
  ('Chocolate Blanco'),
  ('Avellana'),
  ('Coco'),
  ('Mango'),
  ('Tramontana'),
  ('Crema Rusa'),
  ('Sambayón')
ON CONFLICT DO NOTHING;

-- ============================================
-- Tabla: postreshelados
-- Descripción: Postres helados con precios
-- ============================================
CREATE TABLE IF NOT EXISTS postreshelados (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insertar postres helados
INSERT INTO postreshelados (nombre, precio, descripcion) VALUES
  ('Bomba de Chocolate', 4500, 'Helado de chocolate cubierto con ganache'),
  ('Torta Helada', 8000, 'Torta de helado con capas de bizcochuelo'),
  ('Copa Sundae', 3500, 'Helado con salsa de chocolate y crema'),
  ('Brownie con Helado', 4000, 'Brownie tibio con helado de vainilla'),
  ('Banana Split', 5000, 'Banana con tres helados y toppings'),
  ('Parfait de Frutas', 3800, 'Capas de helado con frutas frescas'),
  ('Cassata', 4500, 'Helado con frutas confitadas'),
  ('Copa Melba', 4200, 'Helado de vainilla con duraznos y frambuesa')
ON CONFLICT DO NOTHING;

-- ============================================
-- Políticas RLS (Row Level Security)
-- Descripción: Configuración de seguridad
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE tipodehelados ENABLE ROW LEVEL SECURITY;
ALTER TABLE helados ENABLE ROW LEVEL SECURITY;
ALTER TABLE postreshelados ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública (para la aplicación)
CREATE POLICY "Permitir lectura pública tipodehelados"
  ON tipodehelados FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Permitir lectura pública helados"
  ON helados FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Permitir lectura pública postreshelados"
  ON postreshelados FOR SELECT
  TO public
  USING (true);

-- ============================================
-- Índices para mejorar performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_helados_nombre ON helados(nombre);
CREATE INDEX IF NOT EXISTS idx_postreshelados_nombre ON postreshelados(nombre);

-- ============================================
-- Comentarios en las tablas
-- ============================================
COMMENT ON TABLE tipodehelados IS 'Tipos y tamaños de helados disponibles con sus precios';
COMMENT ON TABLE helados IS 'Gustos de helados disponibles en la heladería';
COMMENT ON TABLE postreshelados IS 'Postres helados disponibles con precios';

-- ============================================
-- Finalización
-- ============================================
-- Script completado exitosamente
-- Recuerda obtener la URL y ANON KEY de tu proyecto de Supabase
-- y agregarlas al archivo .env de la aplicación
