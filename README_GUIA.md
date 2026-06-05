# Guía de despliegue — Portafolio Eduardo Escuti

Esta guía te explica paso a paso cómo publicar tu portafolio en un **host gratuito**. El proyecto es una SPA (Single Page Application) hecha con **React + Vite**, por lo que solo necesitás generar la carpeta `dist/` y subirla a cualquier servicio de hosting estático.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior instalado
- Cuenta en GitHub (recomendado para la mayoría de los hosts gratuitos)
- El proyecto clonado o disponible en tu máquina

---

## 1. Preparar el proyecto localmente

Abrí una terminal en la carpeta `portafolio`:

```bash
cd portafolio
npm install
npm run dev
```

Verificá que todo se vea bien en `http://localhost:5173`.

Cuando estés listo para publicar:

```bash
npm run build
```

Esto genera la carpeta **`dist/`** con todos los archivos estáticos listos para subir.

Para probar la versión de producción localmente:

```bash
npm run preview
```

---

## 2. Opciones de hosting gratuito

| Plataforma | Ventajas | Ideal para |
|---|---|---|
| **Vercel** | Deploy automático desde GitHub, HTTPS, dominio `.vercel.app` | Proyectos React/Vite |
| **Netlify** | Muy fácil de usar, drag & drop o GitHub | Sitios estáticos |
| **GitHub Pages** | Gratis con tu repo de GitHub | Portafolios personales |
| **Cloudflare Pages** | Rápido, CDN global, gratis | Proyectos con mucho tráfico |

---

## 3. Desplegar en Vercel (recomendado)

### Paso 1 — Subir el código a GitHub

Si todavía no tenés el repo en GitHub:

```bash
git add .
git commit -m "Portafolio personal Eduardo Escuti"
git push origin main
```

### Paso 2 — Conectar con Vercel

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión con GitHub.
2. Click en **"Add New Project"**.
3. Seleccioná el repositorio `portafolio`.
4. Vercel detecta automáticamente Vite. La configuración por defecto es:

   | Campo | Valor |
   |---|---|
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Click en **Deploy**.

En 1–2 minutos tu sitio estará en `https://tu-proyecto.vercel.app`.

### Dominio personalizado (opcional)

En el dashboard de Vercel → **Settings → Domains** podés agregar un dominio propio (ej. `eduardoescuti.dev`).

---

## 4. Desplegar en Netlify

### Opción A — Desde GitHub (recomendada)

1. Entrá a [netlify.com](https://netlify.com) e iniciá sesión.
2. **Add new site → Import an existing project**.
3. Conectá GitHub y seleccioná el repo.
4. Configuración:

   | Campo | Valor |
   |---|---|
   | Build command | `npm run build` |
   | Publish directory | `dist` |

5. Click en **Deploy site**.

### Opción B — Drag & Drop (sin GitHub)

1. Ejecutá `npm run build` localmente.
2. Entrá a [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arrastrá la carpeta `dist/` a la página.
4. Listo — Netlify te da una URL al instante.

---

## 5. Desplegar en GitHub Pages

GitHub Pages requiere un pequeño ajuste porque sirve desde una subruta (`/nombre-repo/`).

### Paso 1 — Configurar la base en Vite

Editá `vite.config.js` y cambiá la propiedad `base`:

```js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/portafolio/', // ← reemplazá "portafolio" por el nombre de tu repo
})
```

### Paso 2 — Instalar gh-pages (opcional pero cómodo)

```bash
npm install --save-dev gh-pages
```

Agregá estos scripts en `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Paso 3 — Desplegar

```bash
npm run deploy
```

### Paso 4 — Activar GitHub Pages

1. En tu repo de GitHub → **Settings → Pages**.
2. Source: **Deploy from a branch**.
3. Branch: **`gh-pages`** / folder **`/ (root)`**.
4. Guardá. Tu sitio estará en `https://tu-usuario.github.io/portafolio/`.

> **Nota:** Si usás Vercel o Netlify, dejá `base: './'` como está (no hace falta cambiar nada).

---

## 6. Desplegar en Cloudflare Pages

1. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create**.
2. Conectá tu repo de GitHub.
3. Configuración:

   | Campo | Valor |
   |---|---|
   | Framework preset | None (o Vite si aparece) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

4. Click en **Save and Deploy**.

---

## 7. Checklist antes de publicar

- [ ] Probaste `npm run build` sin errores
- [ ] La foto de perfil se ve en `/profile.png`
- [ ] Los CVs descargables funcionan (`/cv-eduardo-escuti.pdf` y `/cv-eduardo-escuti-en.pdf`)
- [ ] El toggle ES/EN funciona correctamente
- [ ] El sitio se ve bien en mobile (Chrome DevTools → responsive)
- [ ] Actualizaste email y teléfono si cambiaron (archivo `src/data/portfolio.js`)

---

## 8. Actualizar el portafolio después del deploy

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Actualizar portafolio"
git push origin main
```

Si usás **Vercel**, **Netlify** o **Cloudflare Pages** con GitHub conectado, el redeploy es **automático** en cada push.

Si usás **drag & drop en Netlify**, volvé a generar `dist/` y arrastrá la carpeta de nuevo.

---

## 9. Solución de problemas comunes

### La página carga en blanco

- Verificá que `base` en `vite.config.js` coincida con tu hosting:
  - Vercel / Netlify / Cloudflare → `base: './'`
  - GitHub Pages → `base: '/nombre-del-repo/'`
- Revisá la consola del navegador (F12) por errores 404 en assets.

### Error en `npm run build`

```bash
rm -rf node_modules dist
npm install
npm run build
```

### La imagen de perfil no aparece

Confirmá que existe `public/profile.png`. Los archivos en `public/` se copian tal cual a `dist/` al hacer build.

### El formulario de contacto no envía emails

El formulario usa `mailto:` (abre tu cliente de email). Para un formulario real con backend, podés integrar [Formspree](https://formspree.io) (gratis hasta 50 envíos/mes) o [EmailJS](https://www.emailjs.com).

---

## 10. Comandos de referencia rápida

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo (localhost:5173)
npm run build        # Generar producción en dist/
npm run preview      # Probar dist/ localmente
npm run lint         # Verificar código con ESLint
```

---

## Estructura del proyecto

```
portafolio/
├── public/
│   ├── profile.png              # Foto de perfil
│   ├── cv-eduardo-escuti.pdf    # CV en español
│   ├── cv-eduardo-escuti-en.pdf # CV en inglés
│   └── favicon.svg
├── src/
│   ├── components/              # Secciones del portafolio
│   ├── context/                 # Contexto de idioma ES/EN
│   ├── data/portfolio.js        # ← Editá acá tu info personal
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README_GUIA.md               # Esta guía
```

---

¿Dudas? Revisá la [documentación oficial de Vite](https://vite.dev/guide/static-deploy.html) para más detalles sobre despliegue estático.
