# Ecommerce ONE

Tienda digital de productos de consumo diario (alimentos, bebidas, higiene, limpieza, etc.)

Descripción
-----------
Ecommerce ONE es una aplicación SPA construida con React que incluye:
- Página de inicio con productos destacados.
- Página de listado de productos (búsqueda, filtrado y paginación).
- Página de detalle de producto.
- Carrito de compras con persistencia en `localStorage` y formulario de pedido integrado con Formspree.
- Panel de administración (login simulado) para crear/editar/eliminar productos.
- Modo oscuro mediante `styled-components` y `ThemeProvider`.
- Notificaciones con `react-toastify`.

Tecnologías
-----------
- React (v18+)
- Vite
- styled-components
- react-router-dom
- react-toastify
- react-helmet-async
- react-icons

Instalación
-----------
Requisitos:
- Node.js 16+ y npm

Pasos:
```bash
# instalar dependencias
npm install

# arrancar en modo desarrollo
npm run dev

# construir para producción
npm run build

# preview del build (opcional)
npm run preview
```

Variables de entorno
--------------------
Crear un archivo `.env` en la raíz con la URL de la API (ejemplo ya incluido en el repo):

```
VITE_API_URL=https://68e6e8ac10e3f82fbf3d7c2f.mockapi.io/products
```

Estructura relevante
--------------------
- `src/main.jsx`: punto de entrada; aquí se montan los providers (`AuthProvider`, `ThemeProvider`, `CartProvider`, `ProductsProvider`) y el `ToastContainer`.
- `src/App.jsx`: rutas y `ThemeProvider` de `styled-components`.
- `src/contexts/`: lógica de estado (Auth, Cart, Products, Theme).
- `src/components/`: componentes reutilizables (cards, formularios, modales, layout).
- `src/pages/`: vistas principales (Home, ProductsExample, ProductDetail, Cart, ProductsAdmin, Login).
- `src/config/api.js`: lee `VITE_API_URL`.

Modelo de producto esperado
-------------------------
La app normaliza los productos internamente a este esquema:

```json
{
  "id": "string|number",
  "name": "string",
  "price": number,
  "image": "string (url)",
  "description": "string",
  "category": "string",
  "featured": boolean
}
```

Persistencia local
------------------
- Carrito: key `cart_items` en `localStorage`.
- Usuario autenticado (mock): key `auth_user` en `localStorage`.

Características y funcionalidades
--------------------------------
- Listado de productos con búsqueda por nombre y filtro por categoría.
- Paginación en listados (component `Pagination`).
- Formulario de creación/edición de productos con validaciones.
- Eliminación con modal de confirmación (`DeleteModal`).
- Añadir/quitar/actualizar cantidad en carrito; total calculado automáticamente.
- Checkout mediante Formspree (configurable).
- Dark mode toggle guardado en estado y aplicado por `ThemeProvider`.

Problemas conocidos y notas
--------------------------
- El login de administración es simulado (no hay back-end real para autenticación).
- La API usada en `.env` apunta a MockAPI; para producción deberás cambiar `VITE_API_URL`.
- Recomendado revisar que no queden referencias a `product.title` o `product.img` tras la normalización.
---
Ecommerce ONE — proyecto de ejemplo para una tienda front-end con React - Creado por Nahuel Tempesta.
