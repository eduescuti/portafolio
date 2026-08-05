export const profile = {
  name: 'Eduardo Escuti',
  role: {
    es: 'Software Engineer · Full Stack Developer',
    en: 'Software Engineer · Full Stack Developer',
  },
  tagline: {
    es: 'Construyo soluciones web de punta a punta: interfaces, APIs y automatizaciones.',
    en: 'I build end-to-end web solutions: interfaces, APIs and automations.',
  },
  phrase: {
    es: 'En continuo desarrollo',
    en: 'Constantly evolving'
  },
  availability: {
    es: 'Abierto a oportunidades part time y pasantías',
    en: 'Open to part time roles and internships',
  },
  university: {
    es: 'Universidad Católica Argentina (UCA)',
    en: 'Argentina Catholic University (UCA)',
  },
  location: {
    es: 'Buenos Aires, Argentina',
    en: 'Buenos Aires, Argentina',
  },
  email: 'eduescuti99@gmail.com',
  phone: '+54 9 11-3878-2797',
  // La edad se calcula con `ageFrom` (src/lib/careerStats.js), no se escribe a mano:
  // un número fijo queda desactualizado el día del cumpleaños.
  birthDate: '1999-10-10',
  linkedin: 'https://www.linkedin.com/in/eduardo-escuti',
  github: 'https://github.com/eduescuti',
  instagram: 'https://instagram.com/eduescuti',
  cv: {
    es: '/cv-eduardo-escuti.pdf',
    en: '/cv-eduardo-escuti-en.pdf',
  },
  // Fecha ancla para calcular "años trabajando" de forma automática (no editar el número a mano).
  experienceStart: '2024-06',
  intro: {
    es: 'Estudiante avanzado de Ingeniería en Informática (UCA) y Full Stack Developer en Andersson Consultores. Combino frameworks modernos, bases de datos y automatización para llevar productos de la idea a producción.',
    en: 'Advanced Software Engineering student (UCA) and Full Stack Developer at Andersson Consultores. I combine modern frameworks, databases and automation to take products from idea to production.',
  },
}

export const skills = [
  { name: 'React', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'Typescript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Material UI', category: 'frontend' },
  { name: 'HTML / CSS', category: 'frontend' },
  { name: 'Python', category: 'backend' },
  { name: 'Supabase', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'PHP', category: 'backend' },
  { name: 'Flask', category: 'backend' },
  { name: 'Laravel', category: 'backend' },
  { name: 'PostgreSQL', category: 'data' },
  { name: 'MySQL', category: 'data' },
  { name: 'Supabase', category: 'data' },
  { name: 'Redis', category: 'data' },
  { name: 'phpMyAdmin', category: 'data' },
  { name: 'XAMPP', category: 'data' },
  { name: 'n8n', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Brevo', category: 'tools' },
  { name: 'SendGrid', category: 'tools' },
  { name: 'AI Cursor', category: 'ai' },
  { name: 'Claude Code', category: 'ai' },
  { name: 'Composer', category: 'ai' },
]

export const experience = [
  {
    id: 'andersson',
    company: 'Andersson Consultores',
    period: { es: 'Abr 2025 — Actualidad', en: 'Apr 2025 — Present' },
    role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    highlights: {
      es: [
        'Desarrollo backend y frontend con React, Supabase y PostgreSQL.',
        'Integración de APIs como Supabase Edge Functions y Brevo para email marketing.',
        'Creación de automatizaciones con crons de Supabase y workflows en n8n.',
        'Dashboard analítico con gráficos, carga de datos CSV y gestión de encuestas.',
      ],
      en: [
        'Backend & frontend development with React, Supabase and PostgreSQL.',
        'Integration of APIs such as Supabase Edge Functions and Brevo for email marketing.',
        'Automation with Supabase crons and n8n workflows.',
        'Analytics dashboard with charts, CSV data upload and survey management.',
      ],
    },
    tech: ['React', 'Supabase', 'PostgreSQL', 'n8n', 'Brevo', 'Redis'],
  },
  {
    id: 'alexandria',
    company: 'Alexandria Solutions',
    period: { es: 'Ene 2025 — Jun 2025', en: 'Jan 2025 — Jun 2025' },
    role: { es: 'Desarrollador Web', en: 'Web Developer' },
    highlights: {
      es: [
        'Sistema de turnos con Laravel + Filament como framework principal.',
        'Entorno de desarrollo containerizado con Docker.',
        'Gestión de base de datos con phpMyAdmin y MySQL.',
      ],
      en: [
        'Appointment scheduling system using Laravel + Filament as the main framework.',
        'Containerized development environment with Docker.',
        'Database management with phpMyAdmin and MySQL.',
      ],
    },
    tech: ['Laravel', 'Filament', 'PHP', 'MySQL', 'Docker'],
  },
]

export const education = [
  {
    institution: { es: 'Universidad Católica Argentina', en: 'Argentina Catholic University' },
    degree: { es: 'Ingeniería en Informática', en: 'Software Engineering' },
    period: { es: 'Mar 2023 — Actualidad', en: 'Mar 2023 — Present' },
  },
  {
    institution: { es: 'Universidad de Buenos Aires', en: 'University of Buenos Aires (UBA)' },
    degree: { es: 'Ingeniería en Informática (sin finalizar)', en: 'Software Engineering (not completed)' },
    period: { es: 'Mar 2018 — Dic 2022', en: 'Mar 2018 — Dec 2022' },
  },
  {
    institution: { es: 'Colegio Champagnat', en: 'Champagnat School' },
    degree: { es: 'Primaria y Secundaria', en: 'Primary & Secondary' },
    period: { es: '2003 — 2017', en: '2003 — 2017' },
  },
]

// Línea de tiempo unificada: experiencia laboral + educación, ordenada de más reciente a más antigua.
// `sort` = año.mes de inicio (para ordenar). Highlights acotados a 1–2 líneas cortas.
export const timeline = [
  {
    id: 'andersson',
    type: 'work',
    sort: 2025.04,
    title: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    place: 'Andersson Consultores',
    period: { es: 'Abr 2025 — Actualidad', en: 'Apr 2025 — Present' },
    highlights: {
      es: [
        'Desarrollo full stack con React, Supabase y PostgreSQL.',
        'Automatizaciones con Edge Functions, crons y workflows en n8n.',
      ],
      en: [
        'Full stack development with React, Supabase and PostgreSQL.',
        'Automations with Edge Functions, crons and n8n workflows.',
      ],
    },
    // El stack de cada trabajo se dibuja como una tira en movimiento (TechRow), no como
    // una lista: con 4 chips no da la vuelta y queda un hueco. Sólo tecnologías con logo
    // propio — TechRow filtra lo que no lo tenga, así que "APIs", "Webhooks" o
    // "Email Marketing" no entrarían igual: eso se cuenta en los highlights.
    tech: [
      'React', 'Supabase', 'PostgreSQL', 'Redis', 'n8n', 'Brevo',
      'JWT', 'Chatwoot', 'Claude Code', 'AI Cursor', 'Git', 'GitHub',
      'Whatsapp', 'JavaScript', 'Typescript', 'Docker', 'HTML / CSS'
    ],
  },
  {
    id: 'alexandria',
    type: 'work',
    sort: 2025.01,
    title: { es: 'Desarrollador Web', en: 'Web Developer' },
    place: 'Alexandria Solutions',
    period: { es: 'Ene 2025 — Jun 2025', en: 'Jan 2025 — Jun 2025' },
    highlights: {
      es: ['Sistema de turnos con Laravel + Filament, containerizado con Docker.'],
      en: ['Appointment system with Laravel + Filament, containerized with Docker.'],
    },
    // 'Composer' quedó afuera: su logo son 39 kB de SVG, no vale un chip (ver techIcons).
    tech: ['Laravel', 'Filament', 'PHP', 'MySQL', 'Docker', 'phpMyAdmin',
      'Git', 'GitHub', 'AI Cursor'],
  },
  {
    id: 'uca',
    type: 'education',
    sort: 2023.03,
    title: { es: 'Ingeniería en Informática', en: 'Software Engineering' },
    place: { es: 'Universidad Católica Argentina (UCA)', en: 'Argentina Catholic University (UCA)' },
    period: { es: 'Mar 2023 — Actualidad', en: 'Mar 2023 — Present' },
  },
  {
    id: 'uba',
    type: 'education',
    sort: 2018.03,
    title: { es: 'Ingeniería en Informática (sin finalizar)', en: 'Software Engineering (not completed)' },
    place: { es: 'Universidad de Buenos Aires (UBA)', en: 'University of Buenos Aires (UBA)' },
    period: { es: 'Mar 2018 — Dic 2022', en: 'Mar 2018 — Dec 2022' },
  },
]

/**
 * Proyectos, dibujados como "figuritas" coleccionables (ver PLAN_PROYECTOS_FIGURITAS.md).
 *
 * Campos de colección:
 * - `rarity`: 'legendary' | 'epic' | 'rare'. Asignada a mano, no derivada de heurísticas
 *   (contar tecnologías o mirar si hay URL da resultados arbitrarios). Sólo el dashboard
 *   es legendario: si hubiera varios, dejaría de significar algo.
 * - `serie` / `year`: contexto de la colección. YA NO se dibujan en el dorso —ese lugar lo
 *   ocupan ahora los números— pero se conservan porque son lo que ordena el mazo como
 *   colección y porque el frente sigue mostrando `subtitle`.
 * - `status`: 'live' no dibuja nada; 'wip' dibuja el chip "En desarrollo".
 *
 * Textos. Los mismos cuatro campos valen para el proyecto y para cada preview, y una
 * preview que no los trae hereda los del proyecto (ver `resolveBack` en `DeckCard`):
 *
 * - `description`: 4-5 renglones cortos. La usa el dorso en MOBILE, donde no entra más.
 *   Es la versión acotada de `longDescription`, no un resumen de otra cosa.
 * - `longDescription`: el texto completo. La usa el dorso en DESKTOP, que además scrollea
 *   por dentro, así que puede extenderse hasta donde valga la pena.
 * - `role`: qué hiciste vos. Es lo que busca un reclutador y no está en ninguna otra parte
 *   del sitio. Sólo se dibuja en desktop — en mobile no hay alto para dos bloques.
 * - `impact` / `impactMobile`: los números grandes del encabezado del dorso. Ver abajo.
 *
 * Dentro de cualquiera de esos textos, **lo que va entre dobles asteriscos** se pinta con
 * el color de acento (ver `Highlighted` en `DeckCard`).
 *
 * `impact.kind`:
 * - `'metrics'` — tres números con contador. Si son resultados de un CLIENTE y no del
 *   código, la `note` es obligatoria: es lo único que impide que "+240% pacientes" se lea
 *   como algo que generó este proyecto. `noteShort` es su versión de un renglón para mobile.
 * - `'pending'` — el proyecto no está terminado y no hay ningún número real. Dibuja el
 *   marcador en estado de carga, en vez de inventar cifras.
 *
 * `impactMobile` sólo hace falta cuando las etiquetas de desktop no entran en las tres
 * columnas de ~95px del marcador compacto.
 *
 * `previews`: cada una es una carta del mazo. `title` es lo que se lee en el FRENTE de esa
 * carta; el resto de los campos arman su dorso. También se acepta un string suelto (formato
 * viejo): el normalizador de `src/lib/projectDeck.js` lo convierte en una preview sin texto.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────
 * PRESUPUESTO DE CARACTERES. No es una guía de estilo: es el largo que ENTRA.
 *
 * El dorso no scrollea (la barra existe sólo como red para ventanas muy bajas), así que un
 * texto que se pasa se lee cortado. Los topes, medidos sobre la carta de 780×520:
 *
 *   · `role`          ≤ 200  · 13px en 684px de ancho, o sea ~108 caracteres por renglón,
 *                              y la caja está calculada para DOS renglones.
 *   · `longDescription` ≤ 480 · 14px en 708px, ~100 caracteres por renglón, cinco renglones.
 *                              UN SOLO PÁRRAFO: un salto de línea se come un renglón entero.
 *   · `description`   ≤ 225  · mobile, 11px en 304px, ~57 caracteres por renglón. Son cuatro
 *                     ≤ 285    renglones cuando el marcador lleva nota de alcance, y cinco
 *                              cuando no (ahí entran los 285).
 *
 * Los `**` de resaltado no cuentan: son cuatro caracteres que no se dibujan.
 * ─────────────────────────────────────────────────────────────────────────────────────
 */
export const projects = [
  {
    id: 'dashboard-ac',
    folder: 'AnderssonConsultores/Dashboard',
    title: { es: 'Dashboard Analítico AC', en: 'AC Analytics Dashboard' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    rarity: 'legendary',
    serie: 'Andersson Consultores',
    year: '2025',
    status: 'live',
    description: {
      es: 'Panel para clientes médicos con roles admin y cliente sobre Supabase: métricas de **email marketing**, funnels de encuestas y carga por CSV. Es el lugar donde se conectan las **Edge Functions** y el **CRM**.',
      en: 'Panel for medical clients with admin and client roles on Supabase: **email marketing** metrics, survey funnels and CSV upload. It is where the **Edge Functions** and the **CRM** connect.',
    },
    longDescription: {
      es: 'Panel web para clientes médicos con autenticación Supabase y vistas separadas por rol. Reúne métricas de email marketing, funnels de encuestas por variante y ratings de médicos, más carga por CSV con mapeo de columnas y control de duplicados. Corre sobre el mismo Supabase que las **Edge Functions** y que el **CRM de WhatsApp**: los tres proyectos son tres caras de una misma plataforma.',
      en: 'Web panel for medical clients with Supabase authentication and role-based views. It brings together email marketing metrics, survey funnels by variant and doctor ratings, plus CSV upload with column mapping and duplicate control. It runs on the same Supabase as the **Edge Functions** and as the **WhatsApp CRM**: the three projects are three faces of one platform.',
    },
    role: {
      es: 'Desarrollo de la interfaz completa en React para el frontend, y modelo del backend usando **Edge Functions** y **Automatizaciones** en Supabase.',
      en: 'Development of the complete frontend interface in React, and backend modeling using **Edge Functions** and **Automations** in Supabase.',
    },
    // `tech` alimenta la tira animada (TechRow) y por eso lleva sólo tecnologías con
    // logo propio. Lo que es una capacidad y no una herramienta —Recharts entra acá
    // porque no tiene logo en ningún set de íconos— vive en `highlights`.
    tech: ['React', 'Supabase', 'PostgreSQL', 'Brevo', 'JavaScript', 'Git', 'Typescript', 'JWT', 'GitHub',
      'Chatwoot', 'Claude Code', 'AI Cursor', 'Docker', 'HTML / CSS'],
    // OJO: `highlights` HOY NO SE DIBUJA en ninguna carta. Acompañaba al marcador de
    // impacto y se cayó cuando el dorso pasó a Rol + Descripción en contenedores propios:
    // no quedaba renglón para una tercera voz que dijera lo mismo en telegrama. Se
    // conserva porque es contenido escrito a mano y porque es el vocabulario del que sale
    // `tech` (ver el comentario de arriba), no porque esté enganchado a algo.
    highlights: {
      es: [
        'Dashboard analítico', 'Funnels de encuestas', 'Carga CSV con mapeo',
        'Estandarización de datos', 'Panel admin y cliente', 'Recharts',
        'Email Marketing', 'UX/UI Design',
      ],
      en: [
        'Analytics dashboard', 'Survey funnels', 'CSV upload with mapping',
        'Data standardization', 'Admin & client panels', 'Recharts',
        'Email Marketing', 'UX/UI Design',
      ],
    },
    // Resultados publicados en https://anderssonconsultores.com/casos-de-exito/
    // (leído 2026-08-03). Son de las CLÍNICAS y salen de todo el servicio de la agencia
    // —SEO, anuncios, sitio, reseñas, email—, no de este código: de ahí la `note`. Sin esa
    // línea la carta se leería como "este dev generó +240% de pacientes".
    impact: {
      kind: 'metrics',
      note: {
        es: 'Resultados del servicio de Andersson Consultores, medidos con este panel.',
        en: 'Results of the Andersson Consultores service, measured with this panel.',
      },
      // Versión de una línea para el dorso en mobile, donde la nota comparte renglón con el
      // rótulo. Conserva a QUIÉN pertenecen los números —lo único que la nota no puede
      // perder— y suelta el "medidos con este panel", que ahí lo dice el contexto.
      noteShort: {
        es: 'Resultados del servicio de Andersson Consultores',
        en: 'Results of the Andersson Consultores service',
      },
      items: [
        { value: 240, prefix: '+', suffix: '%', label: { es: 'pacientes nuevos', en: 'new patients' } },
        { value: 4.8, decimals: 1, suffix: '/5', label: { es: 'rating promedio', en: 'avg. rating' } },
        { value: 440, suffix: '%', label: { es: 'ROI promedio', en: 'avg. ROI' } },
      ],
    },
    color: 'from-blue-600 to-indigo-700',
    icon: 'BarChart3',
    url: 'https://app.anderssonconsultores.com',
    imageBackground: '/projects/dashboard-ac-preview.png',
    previews: [
      {
        src: '/projects/previews/preview-ac-dash-1.png',
        title: { es: 'Acceso al panel', en: 'Panel login' },
        // Números de escala del propio trabajo, no resultados de un cliente: por eso no
        // llevan `note`. No hay atribución que aclarar.
        impact: {
          kind: 'metrics',
          items: [
            { value: 4, label: { es: 'clientes activos', en: 'active clients' } },
            { value: 14, label: { es: 'campos por archivo', en: 'fields per file' } },
            { value: 7, label: { es: 'pasos de signup', en: 'signup steps' } },
          ],
        },
        role: {
          es: 'Desarrollo de la interfaz del Log In y Sign Up y modelo del backend con Edge Functions. Se utilizó **programación orientada a objetos** para diseñar la estandarización de la carga.',
          en: 'Development of the Log In and Sign Up interface and backend modeling with Edge Functions. **Object-oriented programming** was used to design the standardization of the upload.',
        },
        longDescription: {
          es: 'Esta pantalla parece sencilla así como se ve, pero tiene mucha más complejidad de la que parece. El diseño no sólo está en el frontend: desde el backend tiene algo muy importante, que es la **estandarización de los datos** que un cliente carga al dashboard, para poder subir archivos de pacientes y así retroalimentar los gráficos. Cada cliente tiene su propio formato y su propio mapeo: esa fue la verdadera complejidad, y la resolví con Supabase de intermediario y POO.',
          en: 'This screen looks simple the way you see it, but it carries far more complexity than it seems. The design is not only on the frontend: on the backend there is something very important, the **standardization of the data** a client uploads to the dashboard, so they can send patient files and feed the charts. Every client has its own file format and its own mapping: that was the real complexity, and I solved it with Supabase as the middle layer and OOP.',
        },
        description: {
          es: 'Parece una pantalla sencilla, pero detrás tiene la estandarización de los datos que cada cliente carga al dashboard. Cada uno tiene su propio formato de archivo y su propio mapeo: esa fue la verdadera complejidad, y la resolví con Supabase de intermediario y **POO**.',
          en: 'It looks like a simple screen, but behind it sits the standardization of the data each client uploads to the dashboard. Every one has its own file format and its own mapping: that was the real complexity, solved with Supabase as the middle layer and **OOP**.',
        },
      },
      {
        src: '/projects/previews/preview-ac-dash-2.png',
        title: { es: 'Panel del Dashboard', en: 'Dashboard panel' },
        impact: {
          kind: 'metrics',
          items: [
            { value: 20, label: { es: 'gráficos distintos', en: 'different charts' } },
            { value: 130, prefix: '+', label: { es: 'cálculos', en: 'calculations' } },
            { value: 6, label: { es: 'secciones del panel', en: 'panel sections' } },
          ],
        },
        role: {
          es: 'Desarrollo de la interfaz del **Dashboard**, separando roles de admin y usuario y limitando secciones de métricas, carga y configuración.',
          en: 'Development of the **Dashboard** interface, splitting admin and user roles and scoping metrics, upload and settings sections.',
        },
        longDescription: {
          es: 'La pantalla del **Dashboard** incluye demasiadas cosas, con rol de administrador y de usuario, y todavía sigue extendiendo sus funcionalidades. En primer lugar cuenta con un sector para visualizar en tiempo real todas las métricas de cada clínica: gráficos, tasas calculadas, porcentajes anuales, ratings de doctores y comentarios de los propios pacientes. Por otro lado, un sector de carga de CSV y, del lado del admin, observabilidad con logs, errores y configuración de emails.',
          en: 'The **Dashboard** screen packs in a lot, with an admin role and a user role, and it is still growing today. First, it has a section to see every clinic metric in real time: charts, calculated rates, yearly percentages, doctor ratings and tables with comments from the patients themselves. Then a CSV upload section and, on the admin side, observability with logs, errors and email configuration.',
        },
        description: {
          es: 'El Dashboard reúne en tiempo real todas las métricas de cada clínica ya sean gráficos, tasas, ratings de doctores y comentarios de pacientes, más un sector de carga de CSV y, del lado del admin, **observabilidad** con logs, errores y configuración de emails.',
          en: 'The Dashboard gathers every clinic metric in real time, whether charts, rates, doctor ratings or patient comments, plus a CSV upload section and, on the admin side, **observability** with logs, errors and email configuration.',
        },
      },
    ],
  },
  {
    id: 'edge-functions',
    folder: 'AnderssonConsultores/Edge Functions',
    title: { es: 'Edge Functions & Automatizaciones', en: 'Edge Functions & Automations' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    rarity: 'epic',
    serie: 'Andersson Consultores',
    year: '2025',
    status: 'live',
    description: {
      es: 'Supabase es la base que conecta el **Dashboard Analítico** con el **CRM de WhatsApp**: funciones serverless para emails, encuestas y webhooks de Brevo, más crons que arman cada día la cola de envíos.',
      en: 'Supabase is the database connecting the Analytics Dashboard with the WhatsApp CRM: serverless functions for emails, surveys and Brevo webhooks, plus crons that build the daily send queue.',
    },
    longDescription: {
      es: 'Supabase funciona como la base de datos que conecta ambos proyectos: el **Dashboard Analítico** y el **CRM de WhatsApp**. Cuenta con funciones serverless para el envío efectivo de emails, el registro de encuestas y reportes a clientes. Los crons arman cada día la cola de envíos, con el seguimiento de aperturas y bajas en una tabla de intentos de contacto, y repartidos en horarios distintos para no saturar.',
      en: 'Supabase works here as the database connecting both projects: the **Analytics Dashboard** and the **WhatsApp CRM**. It holds serverless functions for actually sending the emails, registering surveys and client reports. Crons build the daily send queue, with open and unsubscribe tracking in a contact attempts table, spread across different times so nothing saturates.',
    },
    role: {
      es: 'Diseño backend e implementación de las funciones, los crons y los workflows de automatización, que conectan tanto el proyecto del Dashboard Analítico como el del CRM.',
      en: 'Backend design and implementation of the functions, crons and automation workflows that connect both the Analytics Dashboard project and the CRM.',
    },
    // 'Webhooks' salió del stack: no es una tecnología con logo y ya figura como highlight.
    tech: ['Supabase', 'Brevo', 'PostgreSQL', 'Typescript', 'Git', 'JWT', 'n8n', 'GitHub',
      'Claude Code', 'AI Cursor', 'Docker'],
    highlights: {
      es: [
        'Edge Functions', 'Crons de envío diario', 'Retargeting automatizado',
        'Aperturas y bajas', 'Webhooks de Brevo', 'Workflows en n8n', 'Serverless',
        'Multi-tenant',
      ],
      en: [
        'Edge Functions', 'Daily send crons', 'Automated retargeting',
        'Opens & unsubscribes', 'Brevo webhooks', 'n8n workflows', 'Serverless',
        'Multi-tenant',
      ],
    },
    // Estas funciones son las que mandan los emails y registran las encuestas, o sea la
    // maquinaria que PIDE las reseñas: por eso le tocan las métricas de reseñas y rating y
    // no las de facturación. Misma fuente y misma advertencia de atribución que en
    // 'dashboard-ac'. +450 es de la Clínica Oftalmológica y +220% del Instituto de
    // Neurología: son casos distintos, y está asumido.
    impact: {
      kind: 'metrics',
      note: {
        es: 'Resultados de las clínicas que operan sobre estas automatizaciones.',
        en: 'Results from the clinics running on these automations.',
      },
      noteShort: {
        es: 'Resultados de las clínicas que las operan',
        en: 'Results from the clinics running them',
      },
      items: [
        // "emails x semana" y no "emails enviados x semana": es la única etiqueta del sitio
        // que no entra en una columna del marcador en mobile, y ahí partirse en dos
        // renglones le sumaba 10px de alto a TODO el bloque. El verbo lo pone el número.
        { value: 2500, prefix: '+', label: { es: 'emails x semana', en: 'emails per week' } },
        { value: 220, prefix: '+', suffix: '%', label: { es: 'reseñas', en: 'reviews' } },
        { value: 4.8, decimals: 1, suffix: '/5', label: { es: 'rating promedio', en: 'avg. rating' } },
      ],
    },
    color: 'from-violet-600 to-purple-700',
    icon: 'Zap',
    url: 'https://supabase.com/',
    imageBackground: '/projects/supabase.png',
    // OJO: esta captura es de la plataforma Supabase, no del proyecto en sí (ver nota al
    // pie del archivo). El texto lo aclara en la propia carta. Conviene reemplazarla por
    // una captura real de las funciones.
    //
    // La segunda preview ("Métricas de uso") se eliminó: contaba lo mismo que esta —cómo
    // se dimensionan los crons— con una captura más pobre, así que en el mazo era una
    // carta que el visitante pasaba sin ganar nada. Ese contenido vive ahora en la
    // `longDescription` de la portada.
    previews: [
      {
        src: '/projects/previews/preview-supabase-1.png',
        title: { es: 'Logs de las funciones', en: 'Function logs' },
        impact: {
          kind: 'metrics',
          items: [
            { value: 6, label: { es: 'Edge Functions', en: 'Edge Functions' } },
            { value: 23, label: { es: 'crons', en: 'crons' } },
            { value: 100, prefix: '+', label: { es: 'migraciones', en: 'migrations' } },
          ],
        },
        role: {
          es: 'Diseño backend e implementación de las funciones, los crons y los workflows, más el monitoreo de errores y logs de las edge/cron functions y el registro de esa observabilidad dentro del dashboard.',
          en: 'Backend design and implementation of the functions, crons and workflows, plus error and log monitoring of the edge/cron functions and recording that observability inside the dashboard.',
        },
        longDescription: {
          es: 'Esta imagen de la carta es un indicador de los Logs surgidos de las **Edge Functions** creadas para hacer efectivo el envío de los emails, el registro correcto de las encuestas y la vinculación con las APIs usadas, como Brevo. No sólo cuenta con muchas Edge Functions sino también con muchas Cron Functions, para automatizar los procesos de cada proyecto en horarios diarios distintos y no saturarlos (no es una imagen real del proyecto, por Políticas de Privacidad).',
          en: 'This card image stands for the Logs coming out of the **Edge Functions** built to actually send the emails, register the surveys correctly and wire up the APIs in use, such as Brevo. It is not only many Edge Functions but also many Cron Functions, automating every process of each project at different daily schedules so nothing saturates (not a real screenshot of the project, for Privacy Policy reasons).',
        },
        description: {
          es: 'Los Logs de las **Edge Functions** creadas para el envío de emails, el registro de encuestas y la vinculación con APIs como Brevo. Además hay muchas **Cron Functions**, repartidas en horarios distintos para no saturar los procesos (imagen no real, por Políticas de Privacidad.)',
          en: 'The Logs from the **Edge Functions** built for email sending, survey registration and wiring up APIs such as Brevo. There are also many **Cron Functions**, spread across different times so nothing saturates (not a real screenshot, for Privacy Policy reasons).',
        },
      },
    ],
  },
  {
    id: 'crm-whapp',
    folder: 'AnderssonConsultores/CRM',
    title: { es: 'CRM WhatsApp', en: 'WhatsApp CRM' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    rarity: 'epic',
    serie: 'Andersson Consultores',
    year: '2025',
    status: 'live',
    description: {
      es: 'CRM para manejar las conversaciones de WhatsApp sin perder el hilo, con bots y **Agentes de IA** que sacan trabajo de encima. Backend en Supabase y frontend sobre Chatwoot, unidos con webhooks y crons de n8n.',
      en: 'CRM to handle WhatsApp conversations without losing track, with bots and **AI Agents** that take work off your hands. Supabase backend and Chatwoot frontend, joined by n8n webhooks and crons.',
    },
    longDescription: {
      // OJO: NO decir "drag & drop". El tablero mueve conversaciones por cambio de estado
      // (`onMoveConversation`), y kanban-board.js aclara en un comentario "sin drag & drop
      // por ahora". Si algún día se implementa el arrastre, se puede volver a mencionar.
      es: 'Proyecto del CRM de WhatsApp para Andersson Consultores. Sirve para que los clientes manejen sus conversaciones de una manera práctica y sencilla, e incluso con procesos automatizados usando bots y **Agentes de IA** para responder a mensajes. Se usa backend de Supabase y se gestiona desde Chatwoot, con webhooks y crons de n8n. Encima monté un tablero kanban y el alta de turnos desde el chat.',
      en: 'WhatsApp CRM project for Andersson Consultores. It lets clients handle their conversations in a practical and simple way, even with automated processes using bots and **AI Agents** to reply to messages. It uses a Supabase backend and is run from Chatwoot, with n8n webhooks and crons. On top I built a kanban board and booking from the chat.',
    },
    role: {
      es: 'Integración de Chatwoot con WhatsApp y n8n, armado del flujo de respuesta asistida por **Agentes de IA**, mantenimiento de los contenedores con microservicios y nuevos workflows.',
      en: 'Chatwoot integration with WhatsApp and n8n, building the reply flow assisted by **AI Agents**, maintaining the containers running microservices, and new workflows.',
    },
    // 'AI Agents' y 'Bots' eran capacidades, no tecnologías: el agente corre sobre
    // Claude, que sí es una herramienta concreta y con logo.
    tech: ['n8n', 'Chatwoot', 'PostgreSQL', 'Docker', 'Claude', 'Git', 'Whatsapp', 'AI Cursor', 'GitHub'],
    highlights: {
      es: [
        'Tablero kanban', 'Respuestas rápidas', 'Ficha de paciente', 'Turnos desde el chat',
        'Filtros de búsqueda', 'Tiempo real', 'AI Response', 'Automatizaciones con n8n',
      ],
      en: [
        'Kanban board', 'Quick replies', 'Patient profile', 'Booking from chat',
        'Search filters', 'Real-time', 'AI Response', 'n8n automations',
      ],
    },
    // Las únicas métricas del sitio que NO son prestadas: describen la operación y la
    // infraestructura que este proyecto efectivamente sostiene. Se eligieron así a
    // propósito — un "+325% pacientes" acá se notaría prestado, porque ese aumento lo
    // genera el marketing y el CRM sólo ordena las conversaciones que ya llegaron.
    // "Conversaciones" y no "mensajes por semana": el conteo confirmado es de
    // conversaciones y no se sabe si es semanal, así que la nota no promete un período.
    impact: {
      kind: 'metrics',
      note: {
        es: 'Infraestructura y operación reales, sobre 2 VPS y la instancia multi-cuenta de Chatwoot.',
        en: 'Real infrastructure and operation, across 2 VPS and the multi-account Chatwoot instance.',
      },
      noteShort: {
        es: 'Infraestructura y operación reales',
        en: 'Real infrastructure and operation',
      },
      items: [
        { value: 7000, prefix: '+', label: { es: 'conversaciones', en: 'conversations' } },
        { value: 27, prefix: '+', label: { es: 'workflows en n8n', en: 'n8n workflows' } },
        { value: 8, prefix: '+', label: { es: 'microservicios', en: 'microservices' } },
      ],
    },
    color: 'from-emerald-600 to-teal-700',
    icon: 'MessageSquare',
    url: 'https://chatwoot.com/',
    imageBackground: '/projects/wapp2.png',
    // OJO: captura de la demo pública de Chatwoot ("Paperlayer", contactos ficticios), no
    // del CRM real. Ver nota al pie del archivo.
    previews: [
      {
        src: '/projects/previews/preview-chatwoot.png',
        title: { es: 'Bandeja de conversaciones', en: 'Conversation inbox' },
        // Sin `impact` ni `role` propios: hereda los de la portada. Es la única captura del
        // mazo y habla del mismo sistema, así que repetir los números con otra cara sería
        // inventar una diferencia que no existe.
        longDescription: {
          es: 'Interfaz de Chatwoot y visualización de los mensajes dentro del proyecto. El CRM habla con su API cuenta por cuenta y una tabla de configuración decide sobre qué clínica actúa cada automatización, así que sumar una cuenta nueva no toca una línea de código. Encima monté el tablero por estados y el flujo de respuesta asistida por **Agentes de IA** (no es una imagen real, por Políticas de Privacidad.)',
          en: 'Chatwoot interface and how messages are displayed inside the project. The CRM talks to its API account by account and a config table decides which clinic each automation acts on, so adding a new account touches no code. On top I built the status board and the reply flow assisted by **AI Agents** (not a real screenshot, for Privacy Policy reasons).',
        },
        description: {
          es: 'La interfaz de Chatwoot y cómo se ven los mensajes en el proyecto. No es el producto final: es la capa de transporte. Sumar una cuenta nueva no toca código. (Imagen no real, por privacidad.)',
          en: 'The Chatwoot interface and how messages look in the project. Not the final product: it is the transport layer. Adding a new account touches no code. (Not a real screenshot, for privacy.)',
        },
      },
    ],
  },
  {
    id: 'uca-planner',
    folder: 'uca-planner',
    title: { es: 'UCA Planner', en: 'UCA Planner' },
    subtitle: { es: 'Proyecto universitario UCA', en: 'UCA university project' },
    rarity: 'epic',
    serie: 'UCA',
    year: '2024',
    status: 'live',
    description: {
      es: 'Un **organizador de horarios** que surgió en la universidad y hoy llevé a producción. Permite armar la semana en una grilla visual y ver las superposiciones antes de inscribirse. Backend en TiDB usando MySQL, con **roles admin/alumno**, control de cupos y validaciones en tiempo real.',
      en: 'A **schedule organizer** that started at university and that I took to production. It lets you lay out your week on a visual grid and see overlaps before enrolling. TiDB backend on MySQL, **admin/student roles**, capacity control and real-time validation.',
    },
    longDescription: {
      es: 'Este es un organizador de horarios, un proyecto que surgió en la universidad y que hoy en día llevé a producción. **UCA Planner** permite armar la semana de manera sencilla, en una grilla visual, y detectar superposiciones antes de inscribirse a las comisiones. Es muy útil para los alumnos que tienen la cursada un poco desordenada y no saben cómo organizarla. Uso backend en TiDB usando MySQL, con roles de administrador y alumno, control de cupos y validaciones en tiempo real.',
      en: 'This is a schedule organizer, a project that started at university and that I took to production. **UCA Planner** lets you lay out your week easily, on a visual grid, and spot overlaps before enrolling in course sections. It is very useful for students whose term is a bit of a mess and who do not know how to organize it. I use a TiDB backend on MySQL, with admin and student roles, capacity control and real-time validation.',
    },
    role: {
      es: 'Desarrollo Backend en Flask, modelo de datos en MySQL usando TiDB y desarrollo frontend de la grilla visual de horarios, hecho con **Motion** para la experiencia de uso.',
      en: 'Flask backend, MySQL data model on TiDB and frontend development of the visual timetable grid, built with **Motion** for the user experience.',
    },
    tech: ['Python', 'Flask', 'MySQL', 'XAMPP', 'JavaScript', 'HTML/CSS', 'AWS', 'Git', 'GitHub'],
    highlights: {
      es: [
        'Grilla de horarios', 'Control de cupos', 'Validaciones en tiempo real',
        'Materias y comisiones', 'Inscripciones', 'Roles admin/alumno', 'MySQL',
      ],
      en: [
        'Timetable grid', 'Capacity control', 'Real-time validation',
        'Subjects & sections', 'Enrollments', 'Admin/student roles', 'MySQL',
      ],
    },
    // Números de escala del proyecto, no de negocio: no hay clientes pagando ni resultados
    // que reportar, y esto es lo que sí es verificable y propio. Por eso van sin `note`
    // —no hay atribución que aclarar— y por eso el marcador ya no titula "Impacto" (ver
    // `ImpactBlock`): cada cifra dice en su etiqueta exactamente qué está contando.
    impact: {
      kind: 'metrics',
      items: [
        { value: 29, label: { es: 'rutas backend', en: 'backend routes' } },
        { value: 8, label: { es: 'tablas de datos', en: 'data tables' } },
        { value: 2, label: { es: 'roles admin/alumno', en: 'admin/student roles' } },
      ],
    },
    color: 'from-blue-800 to-black-800',
    icon: 'GraduationCap',
    url: 'https://uca-planner.vercel.app/',
    imageBackground: '/projects/uca-planner.png',
    previews: [
      {
        src: '/projects/previews/uca-planner-1.png',
        title: { es: 'Página Principal', en: 'Main page' },
        impact: {
          kind: 'metrics',
          items: [
            { value: 15, label: { es: 'pantallas', en: 'screens' } },
            { value: 77, label: { es: 'funciones backend', en: 'backend functions' } },
            { value: 5, label: { es: 'dependencias', en: 'dependencies' } },
          ],
        },
        longDescription: {
          es: 'Esta es una representación de cómo se ve la página principal de UCA Planner: una interfaz hecha puramente con HTML, CSS y JavaScript, que utiliza **Motion** también en el frontend para tener una mejor experiencia de usuario. Consta de una pantalla de inicio de sesión y de registro simple, para poder hacer el organizador customizable para cada alumno y que cada uno guarde los horarios que arme. El stack es liviano a propósito: cinco dependencias.',
          en: 'This is a representation of how the UCA Planner main page looks: an interface built purely with HTML, CSS and JavaScript, which also uses **Motion** on the frontend for a better user experience. It has a simple sign-in and sign-up screen, so the organizer can be customized per student and each one can save the schedules they build. The stack is deliberately light: five dependencies.',
        },
        description: {
          es: 'La página principal de UCA Planner, hecha puramente con HTML, CSS y JavaScript, con **Motion** para la experiencia de uso. Consta de un inicio de sesión y registro simple, para que cada alumno guarde los horarios que arme. Stack liviano a propósito: cinco dependencias.',
          en: 'The UCA Planner main page, built purely with HTML, CSS and JavaScript, with **Motion** for the experience. It has a simple sign-in and sign-up, so each student can save the schedules they build. Deliberately light stack: five dependencies.',
        },
      },
      {
        src: '/projects/previews/uca-planner-2.png',
        title: { es: 'Organizador de horarios', en: 'Timetable organizer' },
        impact: {
          kind: 'metrics',
          items: [
            // "5×8" y no dos ítems separados: la grilla es una sola cosa —cinco días por
            // ocho franjas— y partirla en dos columnas del marcador haría que pareciera
            // que son dos datos distintos.
            { value: 5, suffix: '×8', label: { es: 'días × franjas', en: 'days × slots' } },
            { value: 7, label: { es: 'validaciones live', en: 'live validations' } },
            { value: 15, label: { es: 'llamadas AJAX', en: 'AJAX calls' } },
          ],
        },
        longDescription: {
          es: 'La grilla semanal con las **materias de la cursada** elegidas, cada una con su color y su franja horaria, para detectar superposiciones de un vistazo antes de inscribirse. El cupo se verifica contra la base en el momento de inscribirse y no al armar la grilla: dos alumnos anotándose a la vez no pueden quedarse los dos con el último lugar. Usé el mismo criterio en los formularios, donde cada campo dispara su propia consulta y el error aparece al lado, no después de mandar todo.',
          en: 'The weekly grid with the chosen **course subjects**, each with its own color and time slot, to spot overlaps at a glance before enrolling. Capacity is checked against the database at enrollment time, not while building the grid: two students enrolling at once cannot both take the last seat. I used the same approach on the forms, where each field fires its own request and the error shows up next to it, not after submitting.',
        },
        description: {
          es: 'La grilla semanal con las **materias de la cursada** elegidas, cada una con su color y su franja, para ver las superposiciones de un vistazo. El cupo se verifica contra la base al inscribirse y no al armar la grilla, así que dos alumnos a la vez no se quedan los dos con el último lugar.',
          en: 'The weekly grid with the chosen **course subjects**, each with its color and slot, to see overlaps at a glance. Capacity is checked against the database at enrollment time, not while building the grid, so two students at once cannot both take the last seat.',
        },
      },
    ],
  },
  {
    id: 'estetica-app',
    folder: 'estetica-app',
    title: { es: 'Sistema de Turnos', en: 'Appointment System' },
    subtitle: { es: 'Alexandria Solutions', en: 'Alexandria Solutions' },
    rarity: 'rare',
    serie: 'Alexandria Solutions',
    year: '2025',
    status: 'live',
    description: {
      es: 'Plataforma de turnos para centros de estética con dos paneles Filament separados, uno de administración y otro de cliente. Cubre servicios, empleados, estados del turno y cobros, sobre Laravel con Docker. Resuelve desde el panel lo mismo que el CRM desde el chat: agendar sin llamadas.',
      en: 'Appointment platform for beauty centers with two separate Filament panels, one for administration and one for the client. It covers services, employees, appointment statuses and charges, on Laravel with Docker. It solves from the panel what the CRM solves from the chat.',
    },
    longDescription: {
      es: 'Plataforma de turnos para centros de estética con dos paneles Filament separados: uno de administración y otro para el cliente. Cubre servicios, empleados y qué servicio presta cada uno, estados del turno, métodos de pago y cobros, sobre Laravel con Docker. Es el mismo problema que atacan los otros proyectos pero desde otro ángulo: acá el turno se agenda desde un panel propio y el **CRM de WhatsApp** lo agenda desde la conversación.',
      en: 'Appointment platform for beauty centers with two separate Filament panels: one for administration and one for the client. It covers services, employees and which service each one provides, appointment statuses, payment methods and charges, on Laravel with Docker. It is the same problem the other projects attack, from another angle: here the appointment is booked from its own panel and the **WhatsApp CRM** books it from the conversation.',
    },
    role: {
      es: 'Desarrollo del sistema sobre Laravel + Filament y armado del entorno con Docker.',
      en: 'System development on Laravel + Filament and Docker environment setup.',
    },
    tech: ['Laravel', 'Filament', 'PHP', 'MySQL', 'Docker', 'Git', 'GitHub'],
    highlights: {
      es: [
        'Panel admin y cliente', 'Agenda de turnos', 'Servicios por empleado',
        'Métodos de pago', 'Estados del turno', 'Roles de usuario', 'Entorno Docker',
      ],
      en: [
        'Admin & client panels', 'Appointment scheduling', 'Services per employee',
        'Payment methods', 'Appointment statuses', 'User roles', 'Docker environment',
      ],
    },
    // Mismo criterio que 'uca-planner': números de escala del proyecto, no de negocio.
    impact: {
      kind: 'metrics',
      items: [
        { value: 8, label: { es: 'modelos de datos', en: 'data models' } },
        { value: 18, label: { es: 'migraciones', en: 'migrations' } },
        { value: 3, label: { es: 'estados de turno', en: 'appointment statuses' } },
      ],
    },
    // En mobile "modelos de datos" y "estados de turno" comparten renglón con columnas de
    // ~95px y quedan al filo. Estos tres dicen lo mismo sobre la forma del proyecto con
    // etiquetas que entran holgadas, y de paso destacan la decisión que más lo define: los
    // dos paneles separados.
    impactMobile: {
      kind: 'metrics',
      items: [
        { value: 2, label: { es: 'paneles Filament', en: 'Filament panels' } },
        { value: 18, label: { es: 'migraciones', en: 'migrations' } },
        { value: 7, label: { es: 'recursos admin', en: 'admin resources' } },
      ],
    },
    color: 'from-pink-600 to-dark-700',
    icon: 'Calendar',
    url: 'https://app-turnos.alexandriademo.com/',
    imageBackground: '/projects/alexandria.png',
    previews: [
      {
        src: '/projects/previews/preview-alexandria-1.png',
        title: { es: 'Ingreso por rol', en: 'Role-based login' },
        impact: {
          kind: 'metrics',
          items: [
            { value: 8, label: { es: 'modelos de datos', en: 'data models' } },
            { value: 3, label: { es: 'estados de turno', en: 'appointment statuses' } },
            { value: 4, label: { es: 'páginas de reserva', en: 'booking pages' } },
          ],
        },
        impactMobile: {
          kind: 'metrics',
          items: [
            { value: 2, label: { es: 'paneles Filament', en: 'Filament panels' } },
            { value: 7, label: { es: 'recursos admin', en: 'admin resources' } },
            { value: 4, label: { es: 'páginas de reserva', en: 'booking pages' } },
          ],
        },
        longDescription: {
          es: 'Esta es una representación de cómo se ve el Login del sistema de turnos, con cuentas de demostración separadas por rol (dueño, encargado y líder), cada una con su propio alcance dentro del panel. Son dos paneles de Filament separados, uno de administración y otro de cliente, y no un panel único con permisos condicionales: separarlos a nivel de aplicación hace que el panel del cliente ni siquiera cargue las pantallas de admin, porque esas rutas no existen para él.',
          en: 'This is a representation of how the appointment system Login looks, with demo accounts split by role (owner, manager and leader), each with its own scope inside the panel. These are two separate Filament panels, one for administration and one for the client, and not a single panel with conditional permissions: splitting them at the application level means the client panel never even loads the admin screens, because those routes do not exist for them.',
        },
        description: {
          es: 'El Login del sistema, con cuentas de demostración separadas por rol y cada una con su propio alcance. Son dos paneles de Filament separados y no un panel único con permisos: el panel del cliente ni siquiera carga las pantallas de admin, porque esas rutas no existen para él.',
          en: 'The system Login, with demo accounts split by role and each with its own scope. These are two separate Filament panels, not one panel with permissions: the client panel never even loads the admin screens, because those routes do not exist for them.',
        },
      },
      {
        src: '/projects/previews/preview-alexandria-2.png',
        title: { es: 'Configuración de agenda', en: 'Schedule setup' },
        impact: {
          kind: 'metrics',
          items: [
            { value: 7, label: { es: 'días configurables', en: 'configurable days' } },
            { value: 15, suffix: ' min', label: { es: 'intervalos', en: 'intervals' } },
            { value: 4, label: { es: 'páginas de reserva', en: 'booking pages' } },
          ],
        },
        longDescription: {
          es: 'Muestra un poco cómo funciona el panel de disponibilidad semanal, con las duraciones de los turnos, franjas horarias por día y reglas de sobreturno, más las secciones de link de reserva, usuarios y reseñas. La disponibilidad se guarda como JSON en el turno y no como columnas fijas por día: con columnas fijas, sumar una franja nueva hubiera significado tocar el esquema. Así cada centro define sus horarios sin pedir una migración.',
          en: 'It shows a bit of how the weekly availability panel works, with appointment durations, per-day time ranges and overbooking rules, plus the booking link, users and ratings sections. Availability is stored as JSON on the appointment instead of fixed per-weekday columns: with fixed columns, adding a new slot would have meant touching the schema. Now each center sets its own schedule without needing a migration.',
        },
        description: {
          es: 'El panel de disponibilidad semanal: duración de los turnos, franjas por día y reglas de sobreturno, más link de reserva, usuarios y reseñas. La disponibilidad se guarda como JSON y no como columnas fijas por día, así cada centro define sus horarios sin pedir una migración.',
          en: 'The weekly availability panel: appointment durations, per-day ranges and overbooking rules, plus booking link, users and ratings. Availability is stored as JSON instead of fixed per-weekday columns, so each center sets its own schedule without needing a migration.',
        },
      },
    ],
  },
  {
    id: 'coming-soon',
    folder: '...',
    title: { es: 'Próximamente...', en: 'Coming soon...' },
    subtitle: { es: 'Desarrollando algo propio', en: 'Developing something on my own' },
    // Figurita normal: lo único que la distingue es el chip de `status: 'wip'` en el
    // dorso. Sin reverso ni marco especial — ver D5 del plan.
    rarity: 'rare',
    serie: { es: 'Proyecto propio', en: 'Personal project' },
    year: '2026',
    status: 'wip',
    description: {
      es: 'Proyecto propio, todavía en desarrollo: una app web con **Agentes de IA** integrados en el flujo de trabajo, pensada para escalar a móvil. Es el primer producto que llevo de punta a punta por mi cuenta.',
      en: 'My own project, still in development: a web app with **AI Agents** integrated into the workflow, designed to scale to mobile. It is the first product I am taking end to end on my own.',
    },
    longDescription: {
      es: 'Proyecto propio, todavía en desarrollo: una aplicación web con **Agentes de IA** integrados en el flujo de trabajo, pensada desde el arranque para escalar a una app móvil. Es el primer producto que llevo de punta a punta por mi cuenta, desde la idea y la arquitectura hasta el despliegue. ¿Qué resuelve? Los Agentes ayudan al usuario dentro del propio flujo y no como un chat pegado al costado, y cada modelo está especializado en la tarea que mejor hace.',
      en: 'My own project, still in development: a web application with **AI Agents** integrated into the workflow, designed from the start to scale into a mobile app. It is the first product I am taking end to end on my own, from idea and architecture through to deployment. What does it solve? The Agents help the user inside the flow itself and not as a chat bolted onto the side, and each model is specialized for the task it does best.',
    },
    role: {
      es: 'Desarrollo completo de la aplicación: producto, arquitectura e infraestructura. Diseño de backend, de frontend, de la marca y el logo, y de la estructura económica del proyecto.',
      en: 'End-to-end development of the application: product, architecture and infrastructure. Backend and frontend design, brand and logo design, and the economics of the project.',
    },
    tech: ['AWS', 'React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'GitHub', 'Redis', 'Claude', 'Git'],
    highlights: {
      // 'Redis' pasó a `tech` (tiene logo) y 'AI Agents' se volvió 'Claude' allá: acá
      // queda sólo la capacidad, que es lo que describe al proyecto.
      es: ['Aplicacion Web', 'Futura App Móvil', 'Integración con AI Agents'],
      en: ['Web Application', 'Future Mobile App', 'Integration with AI Agents'],
    },
    // El único `pending` del sitio, y es literal: el proyecto no está terminado, así que no
    // hay ningún número real que poner. El marcador se dibuja igual pero en estado de carga
    // (ver `ImpactBlock`) — es más honesto que inventar cifras y más claro que dejar el
    // hueco vacío, porque dice explícitamente "todavía no hay". Los tres "qué resuelve" que
    // vivían acá se mudaron a `longDescription`, donde se leen como frases y no como
    // titulares.
    impact: { kind: 'pending' },
    color: 'from-blue-800 to-darkblue-600',
    icon: 'Zap',
    imageBackground: '/projects/app.png',
  },
]

/*
 * PENDIENTE — capturas que no son del proyecto
 *
 * Dos de las ocho previews no son del producto sino de la plataforma sobre la que está
 * construido, tal como las publica el proveedor:
 *
 *   · preview-supabase-1.png → captura de marketing de Supabase (proyecto "meme.town").
 *   · preview-chatwoot.png → demo pública de Chatwoot ("Paperlayer", contactos ficticios).
 *
 * (preview-supabase-2.png quedó sin usar al eliminarse la preview de "Métricas de uso".)
 *
 * Las dos cartas lo aclaran en su propio texto —"no es una imagen real del proyecto, para
 * no revelar información del mismo por políticas de privacidad"— y cuentan PARA QUÉ se usó
 * la herramienta, nunca insinúan haberla construido. La distinción está en el sujeto de la
 * frase y hay que sostenerla si alguna vez se reescriben. Cuando haya capturas reales de
 * las Edge Functions y del CRM, reemplazarlas y sacar la aclaración.
 */

export const aboutText = {
  es: [
    'Soy estudiante de Ingeniería en Informática avanzado en la UCA y actualmente me desempeño como Full Stack Developer en AnderssonConsultores.',
    'Tengo experiencia desarrollando soluciones SaaS con frameworks modernos, bases de datos y herramientas de automatización.',
    'Busco seguir creciendo como profesional IT y colaborar en proyectos que generen impacto.',
  ],
  en: [
    'I am a Software Engineering student advanced at UCA and currently working as a Full Stack Developer at AnderssonConsultores.',
    'Experience building SaaS solutions with modern frameworks, databases and automation tools.',
    'Looking to keep growing as an IT professional and collaborate on impactful projects.',
  ],
}

export const navLinks = [
  { id: 'hero', es: 'Inicio', en: 'Home' },
  { id: 'projects', es: 'Proyectos', en: 'Projects' },
  { id: 'timeline', es: 'Trayectoria', en: 'Journey' },
  { id: 'contact', es: 'Contacto', en: 'Contact' },
]
