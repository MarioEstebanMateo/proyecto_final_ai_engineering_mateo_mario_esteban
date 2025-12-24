# 📜 Licencia y Contribuciones

## 📄 Licencia

Este proyecto fue desarrollado como **Proyecto Final** para el curso de **IA Engineering** con fines educativos.

### Uso Educativo

✅ **Permitido:**

- Usar el código como referencia para aprender
- Modificar el código para proyectos personales
- Estudiar la arquitectura y patrones implementados
- Compartir con compañeros de estudio

⚠️ **Restricciones:**

- No usar para fines comerciales sin autorización
- No copiar el proyecto completo para presentar como propio
- Dar crédito al autor original si se reutiliza código significativo

---

## 🤝 Contribuciones

### ¿Cómo Contribuir?

Aunque este es un proyecto educativo, las contribuciones son bienvenidas para:

- Corregir bugs
- Mejorar documentación
- Agregar nuevas features
- Optimizar código

### Proceso de Contribución

1. **Fork el Repositorio**

   ```bash
   git clone https://github.com/MarioEstebanMateo/proyecto_final_ai_engineering_mateo_mario_esteban.git
   ```

2. **Crear una Rama**

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. **Hacer Cambios**

   - Escribe código limpio y comentado
   - Sigue las convenciones del proyecto
   - Actualiza documentación si es necesario

4. **Commit con Mensaje Descriptivo**

   ```bash
   git commit -m "feat: agrega sistema de favoritos"
   ```

5. **Push a tu Fork**

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

6. **Crear Pull Request**
   - Describe los cambios realizados
   - Explica por qué son necesarios
   - Incluye screenshots si aplica

### Convenciones de Código

#### JavaScript/React

```javascript
// ✅ Bueno
const fetchProducts = async () => {
  try {
    const data = await getProducts();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

// ❌ Evitar
const fetchProducts = async () => {
  const data = await getProducts();
  return data;
};
```

#### Componentes React

```javascript
// ✅ Bueno - Componente funcional con JSDoc
/**
 * Componente que muestra el catálogo de productos
 * @param {Object} props
 * @param {Function} props.onNavigate - Función de navegación
 */
const ProductCatalog = ({ onNavigate }) => {
  // ...
};

// ✅ Bueno - Nombres descriptivos
const handleAddToCart = () => {
  /* ... */
};

// ❌ Evitar - Nombres genéricos
const handle = () => {
  /* ... */
};
```

#### Estilos con Tailwind

```jsx
// ✅ Bueno - Clases ordenadas
<div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">

// ❌ Evitar - Clases desordenadas
<div className="shadow-lg p-4 flex bg-white rounded-lg dark:bg-gray-800 gap-4 items-center justify-between">
```

### Commit Messages

Usa el formato [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agrega nueva funcionalidad
fix: corrige bug en el carrito
docs: actualiza documentación
style: mejora estilos del header
refactor: optimiza carga de productos
test: agrega tests para Cart.jsx
chore: actualiza dependencias
```

Ejemplos:

```bash
git commit -m "feat: agrega filtro de búsqueda en catálogo"
git commit -m "fix: corrige cálculo de total en carrito"
git commit -m "docs: agrega guía de instalación en Windows"
```

---

## 🐛 Reportar Bugs

### Antes de Reportar

1. Verifica que no sea un problema conocido (Issues en GitHub)
2. Asegúrate de tener la última versión
3. Revisa la documentación y troubleshooting

### Información a Incluir

Cuando reportes un bug, incluye:

```markdown
**Descripción del Bug:**
[Descripción clara del problema]

**Pasos para Reproducir:**

1. Ir a '...'
2. Hacer click en '...'
3. Ver error

**Comportamiento Esperado:**
[Lo que debería suceder]

**Comportamiento Actual:**
[Lo que actualmente sucede]

**Screenshots:**
[Si aplica]

**Entorno:**

- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari]
- Version: [v1.0.0]

**Consola del Navegador:**
[Copia errores de la consola si hay]
```

---

## 💡 Sugerencias de Features

¿Tienes una idea para mejorar la aplicación? ¡Genial!

### Template de Sugerencia

```markdown
**Feature Sugerida:**
[Descripción breve]

**Problema que Resuelve:**
[Qué problema o necesidad cubre]

**Solución Propuesta:**
[Cómo implementarías esta feature]

**Alternativas Consideradas:**
[Otras formas de resolver el problema]

**Mockups/Ejemplos:**
[Si tienes diseños o ejemplos]
```

---

## 🎯 Roadmap

### Versión 1.0 (Actual) ✅

- [x] Formulario de cliente con validaciones
- [x] Catálogo de productos desde Supabase
- [x] Carrito de compras persistente
- [x] Asistente IA conversacional
- [x] Generación de PDF
- [x] Modo oscuro
- [x] Diseño responsive

### Versión 1.1 (Planeado)

- [ ] Búsqueda y filtros en catálogo
- [ ] Favoritos del usuario
- [ ] Historial de pedidos
- [ ] Compartir pedido por WhatsApp
- [ ] Calculadora de calorías

### Versión 2.0 (Futuro)

- [ ] Backend propio con Node.js
- [ ] Autenticación de usuarios
- [ ] Panel de administración
- [ ] Sistema de pagos
- [ ] Notificaciones email/SMS
- [ ] PWA con modo offline

### Versión 3.0 (Visión)

- [ ] App móvil nativa (React Native)
- [ ] Sistema de recompensas
- [ ] Programa de fidelidad
- [ ] Integración con delivery apps
- [ ] Analytics y reportes

---

## 🏆 Contribuidores

### Autor Principal

- **Mario Esteban Mateo** - Desarrollo completo del proyecto
  - GitHub: [@MarioEstebanMateo](https://github.com/MarioEstebanMateo)
  - Email: [tu-email@ejemplo.com]

### Agradecimientos Especiales

- Instructores del curso de IA Engineering
- Comunidad de React y Tailwind CSS
- OpenAI y Supabase por sus plataformas

---

## 📝 Código de Conducta

### Nuestro Compromiso

Este proyecto se compromete a proporcionar un entorno acogedor y libre de acoso para todos, independientemente de:

- Edad, tamaño corporal, discapacidad
- Etnia, identidad y expresión de género
- Nivel de experiencia, educación
- Nacionalidad, apariencia personal
- Raza, religión
- Identidad y orientación sexual

### Comportamiento Esperado

✅ **Se espera:**

- Usar lenguaje acogedor e inclusivo
- Respetar diferentes puntos de vista
- Aceptar críticas constructivas
- Enfocarse en lo mejor para la comunidad
- Mostrar empatía hacia otros miembros

❌ **No se tolera:**

- Lenguaje o imágenes sexualizadas
- Comentarios insultantes o despectivos
- Acoso público o privado
- Publicar información privada de otros
- Conducta inapropiada profesionalmente

---

## 📞 Contacto

### Para Consultas sobre el Proyecto

- **GitHub Issues**: [Crear issue](https://github.com/MarioEstebanMateo/proyecto_final_ai_engineering_mateo_mario_esteban/issues)
- **Email**: [tu-email@ejemplo.com]

### Para Temas Académicos

- **Curso**: IA Engineering
- **Institución**: [Nombre de la institución]

---

## 🔗 Enlaces Útiles

### Recursos del Proyecto

- [Documentación Principal](README.md)
- [Guía de Instalación](INSTALL.md)
- [Documentación Técnica](TECHNICAL.md)
- [Casos de Prueba](TESTING.md)

### Tecnologías Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [OpenAI](https://openai.com/)

### Comunidad

- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- [Reddit r/reactjs](https://www.reddit.com/r/reactjs/)
- [Discord de React](https://discord.gg/react)

---

## 📊 Estadísticas

![GitHub stars](https://img.shields.io/github/stars/MarioEstebanMateo/proyecto_final_ai_engineering_mateo_mario_esteban?style=social)
![GitHub forks](https://img.shields.io/github/forks/MarioEstebanMateo/proyecto_final_ai_engineering_mateo_mario_esteban?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/MarioEstebanMateo/proyecto_final_ai_engineering_mateo_mario_esteban?style=social)

---

## ⭐ Si te Gusta el Proyecto

Si este proyecto te resultó útil:

- ⭐ Dale una estrella en GitHub
- 🍴 Haz un fork para tus proyectos
- 📢 Compártelo con otros estudiantes
- 🐛 Reporta bugs o sugiere mejoras
- 💬 Deja un comentario sobre tu experiencia

---

## 📜 Historial de Cambios

### v1.0.0 (Diciembre 2025)

- 🎉 Primera versión pública
- ✨ Todas las funcionalidades core implementadas
- 📚 Documentación completa

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
**Autor:** Mario Esteban Mateo
