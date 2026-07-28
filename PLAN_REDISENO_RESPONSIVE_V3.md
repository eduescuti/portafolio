# Plan v3 — Rediseño responsive + tecnologías dinámicas + optimización mobile

> Objetivo: dejar la experiencia **mobile** fluida y profesional. Cubre 3 pedidos
> (Home, Trayectoria/Proyectos, Contacto), un rediseño dinámico de cómo se muestran
> las **tecnologías/stack** en todo el portafolio, y un hilo transversal de
> **optimización responsive** aplicado a cada cambio.
>
> Basado en la doc de Motion (motion.dev/docs/react) y en el análisis del código actual.

**Fecha:** 2026-07-27
**Stack:** `framer-motion@12` (vía `LazyMotion` + `m`), `lenis`, Tailwind v4, Vite.
**Alcance:** este documento es un **plan**. No implementa nada todavía; cada fase se
aprueba y ejecuta como en las rondas anteriores.

---

## 0. Investigación: ¿Motion afecta el rendimiento en mobile?

**Respuesta corta: sí, un poco — pero no es el villano principal.** Los mayores tirones
que quedan vienen de 3 cosas que *no* son Motion. Detalle con evidencia del código:

### 0.1 Lo que Motion SÍ aporta al costo (contribuye, pero es menor)

- **Reveals por scroll (`whileInView`).** `Reveal` / `RevealGroup` se usan en casi todas
  las secciones (labels, títulos, párrafos, cada `TimelineItem`, cada card, y los chips
  del modal). Cada uno monta un `IntersectionObserver` y, al entrar, anima `opacity`+`y`.
  En un scroll rápido en mobile, varios disparan a la vez → recalculo de estilo + creación
  de capas de composición. `RevealGroup` con `staggerChildren` multiplica la cantidad de
  nodos animados (ej. los chips de stack del modal).
- **Bundle de features.** Hoy cargamos `LazyMotion features={domMax}` (~25kb) porque el
  modal usa `layoutId` (layout animations). En mobile ya apagamos ese `layoutId`, así que
  ahí se paga bundle que casi no se usa (ver §6.5).
- **Springs / motion values continuos** (MagneticButton, CustomCursor, glow del cursor):
  **ya están apagados en táctil** en las rondas anteriores. ✅ No suman en mobile.

**Regla de Motion aplicable:** anima solo `transform`/`opacity` (compositor). El código ya
lo respeta; el costo no es *qué* anima sino *cuántos* nodos animan a la vez en scroll.

### 0.2 Los culpables reales que quedan (NO son Motion)

1. **`min-h-screen` = `100vh` en el Hero y en el wrapper** ([Hero.jsx:55](src/components/Hero.jsx#L55),
   [App.jsx:23](src/App.jsx#L23)). En mobile, cuando la barra de URL del navegador
   aparece/desaparece al scrollear, `100vh` **cambia de valor** → el layout se recalcula y
   el contenido "salta". Es una causa clásica de scroll trabado + de que el Home "no entre
   en pantalla". Fix: `100svh`/`100dvh` (§2, §6.1).
2. **Fondo fijo con blur a pantalla completa.** `GlobalBackground` es `position: fixed` con
   blobs `blur-2xl` + ruido + viñeta. Aunque sean estáticos, componer una capa fija grande
   y borrosa **mientras toda la página scrollea por encima** es caro en GPUs móviles de gama
   baja. Fix: bajar aún más el blur / hornear el degradado sin `filter: blur` en mobile (§6.4).
3. **`backdrop-blur` sueltos que siguen activos en mobile:**
   - Badge "Full Stack Dev" del Hero: `backdrop-blur-md` ([Hero.jsx:140](src/components/Hero.jsx#L140)).
   - Botón cerrar del modal y flechas del gallery ([Projects.jsx:208](src/components/Projects.jsx#L208), [:308](src/components/Projects.jsx#L308)).
   - `ScrollToTop`.
   `backdrop-blur` repinta el área detrás en cada frame que está visible durante el scroll.
   Fix: quitarlo o volverlo sólido en mobile (§6.3).
4. **Sin `content-visibility`.** Todas las secciones pintan aunque estén fuera de pantalla.
   `content-visibility: auto` deja al navegador saltear el render de lo que no se ve (§6.6).

**Conclusión:** apagar Motion en mobile daría poco. La ganancia grande está en (1) `100vh`,
(2) fondo fijo con blur y (3) los `backdrop-blur` restantes — más un "presupuesto de motion"
que limite cuántos reveals corren a la vez (§6.2). Todo eso va integrado en las fases.

---

## 1. Home / Hero — rediseño responsive (Pedido #1)

### 1.1 Problemas observados (screenshot 1)

- El Home **no entra completo en pantalla**: `min-h-screen` + `pt-20` + nombre gigante
  (`text-5xl`) + rol + 2 líneas + botones + socials + foto `h-80` (320px) → excede el viewport.
- Los **botones se ven desalineados**: "Contactame" + "Descargar CV" + 3 íconos sociales
  están todos en un mismo `flex flex-wrap gap-3` ([Hero.jsx:94](src/components/Hero.jsx#L94)),
  que en mobile envuelve de forma despareja.
- La foto y el badge quedan empujados abajo del fold; la jerarquía visual se pierde.

### 1.2 Solución propuesta (mobile-first, sigue prolijo en desktop)

- **Que entre en un viewport:** `min-h-[100svh]` + centrado vertical (`justify-center`),
  y **compactar** el contenido en mobile.
- **Layout mobile (recomendado):** vertical y centrado —
  saludo → nombre (más chico, `text-4xl`) → rol → **una** línea de estado (pill) → foto
  más chica → botones full-width apilados → fila de socials centrada.
- **Botones alineados:** en mobile, CTA primario ("Contactame") a ancho completo y
  "Descargar CV" a ancho completo (o 2 columnas 50/50 con `grid-cols-2`), y los **socials en
  su propia fila** centrada, separados de los botones. En desktop se mantiene el layout actual.
- **Foto:** en mobile reducir a un avatar más contenido (o `max-w-[220px]`) para que no coma
  toda la altura; en desktop queda igual.

```
Mobile (recomendado)                 Desktop (se mantiene)
┌───────────────────────────┐        ┌───────────────────────────────────┐
│         Hola, soy          │        │ Hola, soy            ┌──────────┐  │
│                            │        │ EDUARDO              │          │  │
│      Eduardo Escuti        │        │ ESCUTI               │   foto   │  │
│  Software Engineer · FS    │        │ Software Engineer    │          │  │
│   ● En continuo desarrollo │        │ ● Abierto a…         └──────────┘  │
│                            │        │ [Contactame][CV] gh in ✉           │
│        ┌──────────┐        │        └───────────────────────────────────┘
│        │   foto   │        │
│        └──────────┘        │
│  ┌──────────────────────┐  │
│  │     Contactame       │  │  ← full width
│  ├──────────────────────┤  │
│  │     Descargar CV     │  │  ← full width
│  └──────────────────────┘  │
│        gh   in   ✉         │  ← fila social centrada
└───────────────────────────┘
```

**Decidido:** foto compacta debajo del texto (no avatar circular). Todo centrado vertical
en `100svh` para que entre en un viewport.

### 1.3 Optimización asociada
- `min-h-screen` → `min-h-[100svh]` (mata el reflow por barra de URL).
- Badge "Full Stack Dev": quitar `backdrop-blur-md` en mobile (fondo sólido `bg-navy-900/95`).
- Reducir el reveal inicial del Hero en mobile (menos stagger) para no competir con el
  primer paint (LCP).

---

## 2. Trayectoria / Proyectos — menos texto en mobile (Pedido #2)

> **Decidido: solo Trayectoria.** El screenshot 2 es la sección **Trayectoria** ("My path"),
> cuyos ítems tienen justo *título, empresa, fecha, stack* + los **bullets** ("descripción del
> medio"). El cambio se aplica ahí. Las cards de **Proyectos se dejan como están** (§2.2 queda
> como referencia por si más adelante se quiere el mismo criterio).

### 2.1 Trayectoria (`Timeline.jsx`)
- En **mobile**, ocultar los `highlights` (los bullets) → queda: título, empresa (`place`),
  fecha (`period`) y stack (chips). En desktop se muestran igual.
  - Implementación: envolver el `<ul>` de highlights en `hidden md:block`
    ([Timeline.jsx:58-67](src/components/Timeline.jsx#L58-L67)), o gate por `useCoarsePointer`.
- Resultado: tarjetas mucho más compactas y escaneables en celular.

### 2.2 Proyectos (`Projects.jsx`) — opcional, mismo criterio
- La card de proyecto muestra `description` (`line-clamp-2`) ([Projects.jsx:~138]). Si querés
  el mismo "menos texto", ocultarla en mobile (`hidden sm:block`) dejando título, subtítulo
  (empresa) y chips de stack.

### 2.3 Optimización asociada
- Menos nodos de texto en mobile = menos layout/paint por card y menos altura total de la
  sección (menos que pintar). Bien alineado con `content-visibility` (§6.6).

---

## 3. Tecnologías / Stack — rediseño dinámico con animaciones (Pedido #2 bis)

> Pedido: hacer *mucho más dinámico* cómo se ven las tecnologías/stack en **todo** el
> portafolio (Trayectoria + Proyectos + modal). Analizo posibilidades y recomiendo.

### 3.1 Estado actual
- Los chips son un `<span>` estático con ícono + nombre, mismo estilo en Timeline y Projects
  (`bg-white/[0.04] text-accent-light`). Sin color de marca, sin interacción, sin entrada
  animada individual.
- Ya existe: `techIcons` (mapa nombre→ícono de marca de `react-icons/si`) y un array
  **`skills` categorizado** (`frontend/backend/data/tools/ai`) que **hoy no se renderiza**.
  Es materia prima ideal para algo más rico.

### 3.2 Posibilidades (con trade-offs y costo de performance)

**Opción A — Chips con color de marca + micro-interacción (base transversal).**
Un componente `TechBadge` único, usado en todos lados. Al entrar en viewport hace un
stagger reveal; en hover (desktop) / tap (mobile) toma el **color de marca** de la tech,
escala suave y hace glow. Ícono ya viene de `react-icons/si`.
- Dinámico ✅, consistente en todo el sitio ✅, barato (transform/opacity) ✅.
- Costo mobile: bajo si la animación es `once` y sin loops.

```
 ▢ React   ▢ Supabase   ▢ PostgreSQL   ▢ n8n      (reposo: gris)
 ◼ React   (tap/hover → color de marca #61DAFB + glow + scale 1.05)
```

**Opción B — Cinta/marquee infinita de logos.**
Una fila de logos que se desplaza en loop (`translateX` infinito, pausable al tocar).
Muy "vivo".
- Muy dinámico ✅. Pero **anima en loop** → en mobile hay que gatearla (pausar <768px o
  usar duración larga) para no reintroducir jank. Riesgo medio.

**Opción C — Sección "Stack" dedicada e interactiva (aprovecha `skills`).**
Nueva sección con tabs por categoría (Frontend / Backend / Data / Tools / IA) y grilla de
badges que se **reordena con animación** al filtrar (`AnimatePresence` + layout).
- Alto impacto visual ✅, reutiliza data existente ✅, muestra el stack completo (hoy no hay
  una sección así). Es la más "profesional/portfolio".
- Costo: el layout animation del filtro es medio caro → en mobile usar `AnimatePresence`
  con fade simple (sin layout projection), o el patrón `sharedLayout` gateado como en el modal.

**Opción D — Constelación/órbita de íconos.** Llamativa pero cara y difícil de hacer
responsive bien. **No recomendada** para el objetivo de fluidez mobile.

### 3.3 Recomendación
**Decidido: Opción A ahora; C más adelante.** Se implementa el `TechBadge` (Opción A) como
pieza transversal para Timeline/Proyectos/modal (consistencia + dinamismo barato,
`transform`/`opacity`, `once`, gateo mobile). La **sección "Stack"** (Opción C, con el array
`skills`) y la cinta marquee (B) quedan como fase posterior opcional.

### 3.4 Sub-tareas
- [ ] `TechBadge` reutilizable (color de marca por tech; mapa de hex o vía `simple-icons`).
- [ ] Reemplazar los chips de Timeline y Projects/modal por `TechBadge`.
- [ ] Reveal escalonado de badges al entrar (con presupuesto mobile, §6.2).
- [ ] (Opción C) Sección `Stack` con tabs por categoría + animación de filtro.
- [ ] Medir en mobile que el stagger no genere jank (§7).

---

## 4. Contacto "Let's talk" — rediseño responsive (Pedido #3)

### 4.1 Problema (screenshots 3 y 4)
- La sección es muy alta en mobile (heading + 5 contact-links + formulario completo) → "no
  se ve todo en una pantalla" y se siente pesada.

### 4.2 Solución propuesta
- **Compactar la jerarquía en mobile:** heading + subtítulo más ajustados; los 5
  contact-links como lista más densa (menos padding, ícono + label + valor en una línea).
- **Separar "contactos rápidos" del "formulario":** en mobile, mostrar primero los links
  (email/WhatsApp/LinkedIn/GitHub/ubicación) y el formulario debajo con un pequeño
  encabezado, o detrás de un botón "Enviar un mensaje" que revela el form (acordeón) para
  que la sección no arranque tan larga.
- **Que respire dentro del viewport:** padding vertical menor en mobile, y opcional
  `min-h`/scroll-snap suave por sub-bloque.
- Mantener accesibilidad ya resuelta (labels, `aria-live` del success, reCAPTCHA).

```
Mobile (propuesta)
┌───────────────────────────┐
│ Contacto                   │
│ Hablemos                   │
│ Busco part-time/pasantías. │
│ ┌───────────────────────┐  │  ← links densos
│ │ ✉  Email   …@gmail.com│  │
│ │ ⌾  WhatsApp +54 9 …   │  │
│ │ in LinkedIn Eduardo   │  │
│ │ gh GitHub  @eduescuti │  │
│ │ ⚲  Buenos Aires, AR   │  │
│ └───────────────────────┘  │
│ [  Enviar un mensaje  ▾ ]  │  ← revela el form (acordeón)
└───────────────────────────┘
```

### 4.3 Optimización asociada
- Menos altura pintada de arranque; el form pesado (inputs + reCAPTCHA) puede diferirse al
  abrir el acordeón.

---

## 5. Optimización responsive transversal (hilo pedido en todos los cambios)

Se aplica **junto** a cada cambio de arriba, no como fase aparte:

| # | Acción | Dónde | Impacto |
|---|--------|-------|---------|
| 6.1 | `min-h-screen` → `min-h-[100svh]` | Hero, App wrapper | 🔴 mata el reflow por barra de URL |
| 6.2 | "Presupuesto de motion" en mobile: menos stagger, `amount` mayor, duraciones algo menores; considerar reveal CSS-only en gama baja | Reveal/RevealGroup | 🟠 menos animaciones simultáneas en scroll |
| 6.3 | Quitar `backdrop-blur` restantes en mobile (badge Hero, botón cerrar/flechas modal, ScrollToTop) | Hero, Projects, ScrollToTop | 🟠 menos repintado en scroll |
| 6.4 | Fondo fijo: bajar más el blur en mobile o hornear el degradado sin `filter` | GlobalBackground | 🟠 menos composición de capa fija |
| 6.5 | Evaluar `domAnimation` (15kb) en vez de `domMax` (25kb): el único uso de layout es el `layoutId` del modal, ya apagado en mobile → si se reemplaza por fade/scale, se puede bajar el feature pack | App / Projects | 🟡 bundle/TTI |
| 6.6 | `content-visibility: auto` + `contain-intrinsic-size` en secciones fuera de viewport | index.css / secciones | 🟠 saltea render de lo no visible |
| 6.7 | Reconfirmar imágenes (previews ya optimizadas) y `decoding="async"` donde falte | varios | 🟢 ya casi hecho |

---

## 6. Fases de implementación (orden sugerido)

**Fase A — Home + optimización base (mayor impacto visible)**
1. Hero: `100svh`, layout mobile, botones full-width, foto compacta, badge sin blur.
2. `min-h-screen` → `svh` en App wrapper.
3. Quitar `backdrop-blur` mobile restantes.

**Fase B — Trayectoria/Proyectos + Contacto**
4. Ocultar highlights de Timeline en mobile (y opcional description de Projects).
5. Rediseño responsive de Contacto (links densos + form en acordeón).
6. `content-visibility` en secciones.

**Fase C — Tecnologías dinámicas (solo Opción A)**
7. `TechBadge` transversal (color de marca + micro-interacción) en Timeline/Proyectos/modal.
8. Presupuesto de motion + medición mobile.
9. *(Pospuesto)* Sección "Stack" con tabs por categoría usando `skills` (Opción C).

**Fase D — Afinado bundle**
10. Evaluar `domAnimation` vs `domMax` según decisión sobre `layoutId`.

---

## 7. Cómo medir (antes / después)
- Chrome DevTools → **Performance** con *CPU throttling 4–6×* + emulación mobile; grabar
  scroll completo y apertura de secciones; buscar frames >16ms.
- **Rendering → Paint flashing / Frame Rendering Stats**: ver que el fondo y los reveals no
  parpadeen de más.
- Probar en el **celu real** (Chrome remoto `chrome://inspect`), que es donde se nota.
- Lighthouse mobile: TBT / CLS (el `svh` debería mejorar CLS) antes y después.

## 8. Riesgos y notas
- El cambio de `100vh`→`svh` puede mover levemente composiciones; verificar en varios
  navegadores mobile (iOS Safari es el más quisquilloso).
- La sección "Stack" (Opción C) agrega DOM: construirla con gateo mobile y `once`.
- Colores de marca: algunos íconos de marca son muy saturados sobre fondo navy; definir un
  tratamiento (solo en hover/tap, o desaturado en reposo).
- Se mantiene todo lo de accesibilidad y `prefers-reduced-motion` ya resuelto.
- Este doc es de trabajo (como los otros PLAN_*): si querés, lo dejo fuera de git.

---

### Decisiones confirmadas (2026-07-27)
1. **Home mobile:** foto compacta **debajo del texto** (no avatar circular).
2. **"Menos texto":** **solo Trayectoria** (Proyectos se deja como está).
3. **Tecnologías:** **solo Opción A** (TechBadge dinámico transversal) por ahora; la sección
   "Stack" (Opción C) queda pospuesta.
