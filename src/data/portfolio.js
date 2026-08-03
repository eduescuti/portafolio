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
 * - `serie` / `year`: se muestran juntos en el encabezado del dorso.
 * - `status`: 'live' no dibuja nada; 'wip' dibuja el chip "En desarrollo".
 *
 * Textos:
 * - `description`: una línea. La usa el dorso en mobile, donde no entra más.
 * - `longDescription`: 3-4 líneas. La usa el dorso en desktop, que tiene lugar de sobra.
 * - `role`: qué hiciste vos en el proyecto. Es lo que busca un reclutador y no estaba en
 *   ninguna otra parte del sitio.
 *
 * `previews`: cada una es una carta del mazo, con su propio título y descripción de lo que
 * muestra esa captura puntual. También se acepta un string suelto (formato viejo): el
 * normalizador de `src/lib/projectDeck.js` lo convierte en una preview sin texto.
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
      es: 'Panel para clientes médicos, con roles admin y cliente sobre Supabase.',
      en: 'Medical client panel with admin and client roles, built on Supabase.',
    },
    longDescription: {
      es: 'Panel web para clientes médicos con autenticación Supabase y vistas separadas por rol. Reúne métricas de email marketing, funnels de encuestas por variante y ratings de médicos, con paneles de consultorio, cirugía y encuestas. Carga por CSV con mapeo de columnas, estandarización y control de duplicados.',
      en: 'Web panel for medical clients with Supabase authentication and role-based views. It brings together email marketing metrics, survey funnels by variant and doctor ratings, with dedicated stationary, surgery and survey panels. CSV upload with column mapping, standardization and duplicate control.',
    },
    role: {
      es: 'Desarrollo full stack: interfaz en React, modelo de datos y Edge Functions en Supabase.',
      en: 'Full stack development: React interface, data model and Supabase Edge Functions.',
    },
    // `tech` alimenta la tira animada (TechRow) y por eso lleva sólo tecnologías con
    // logo propio. Lo que es una capacidad y no una herramienta —Recharts entra acá
    // porque no tiene logo en ningún set de íconos— vive en `highlights`.
    tech: ['React', 'Supabase', 'PostgreSQL', 'Brevo', 'JavaScript', 'Git', 'Typescript', 'JWT', 'GitHub',
      'Chatwoot', 'Claude Code', 'AI Cursor', 'Docker', 'HTML / CSS'],
    highlights: {
      // Los cuatro primeros son los que ve `ShotBack` (corta en 4), así que van los más
      // específicos del proyecto y no los genéricos de cualquier dashboard.
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
        description: {
          es: 'Pantalla de ingreso con autenticación de Supabase, recuperación de contraseña y alta de nuevas cuentas de clínica.',
          en: 'Login screen with Supabase authentication, password recovery and new clinic account sign-up.',
        },
        detail: {
          es: 'El alta no crea la cuenta directamente: deja una solicitud en una tabla aparte que un admin revisa y aprueba desde una edge function. Lo pensé así porque el dashboard es multi-cliente: cada cuenta ve datos de pacientes de una clínica puntual —nombres, prepaga, médicos, reseñas— y ese acceso no puede quedar habilitado por el solo hecho de completar un formulario.',
          en: 'Signing up does not create the account directly: it files a request in a separate table that an admin reviews and approves through an edge function. I designed it that way because the dashboard is multi-client: each account sees one clinic patient data — names, insurance plan, doctors, reviews — and that access cannot be granted just because someone filled out a form.',
        },
      },
      {
        src: '/projects/previews/preview-ac-dash-2.png',
        title: { es: 'Panel de administración', en: 'Admin panel' },
        description: {
          es: 'Vista de administrador: selector de cliente, rango de fechas con comparación contra el período anterior y separación entre gestión interna e informes de pacientes.',
          en: 'Admin view: client selector, date range with previous-period comparison, and a split between internal management and patient reports.',
        },
        detail: {
          es: 'Todas las métricas del header —las del cliente elegido y las de la comparación contra el período anterior— salen de una sola RPC en Postgres y no de selects sueltos armados desde el front. Cambiar de cliente o mover el rango dispara una consulta, no doce: la lógica de qué se compara contra qué vive en la base, así que no hay riesgo de que el mismo número salga distinto en dos pantallas.',
          en: 'Every metric on the header — for the selected client and for the comparison against the previous period — comes from a single Postgres RPC instead of separate selects assembled on the front end. Switching client or moving the range fires one query, not twelve: the logic of what gets compared against what lives in the database, so there is no risk of the same number coming out different on two screens.',
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
      es: 'Automatizaciones serverless para emails, encuestas y seguimiento de leads.',
      en: 'Serverless automations for emails, surveys and lead follow-up.',
    },
    longDescription: {
      es: 'Funciones serverless en Supabase para envío de emails, registro de encuestas de consultorio y cirugía, webhooks de Brevo y reportes a clientes. Los crons arman cada día la cola de envíos e identifican retargets, con el seguimiento de aperturas y bajas centralizado en una tabla de intentos de contacto.',
      en: 'Supabase serverless functions for email sending, stationary and surgery survey registration, Brevo webhooks and client reports. Crons build the daily send queue and identify retargets, with open and unsubscribe tracking centralized in a contact attempts table.',
    },
    role: {
      es: 'Diseño e implementación de las funciones, los crons y los workflows de automatización.',
      en: 'Design and implementation of the functions, crons and automation workflows.',
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
    // OJO: estas dos capturas son de la plataforma Supabase, no del proyecto en sí (ver
    // nota al pie del archivo). Los textos describen la herramienta, no se atribuyen como
    // trabajo propio. Conviene reemplazarlas por capturas reales de las funciones.
    previews: [
      {
        src: '/projects/previews/preview-supabase-1.png',
        title: { es: 'Logs de las funciones', en: 'Function logs' },
        description: {
          es: 'Panel de Logs & Analytics de Supabase: el lugar desde donde se monitorean las Edge Functions, el API Gateway y los errores en producción.',
          en: 'Supabase Logs & Analytics panel: where Edge Functions, the API Gateway and production errors are monitored.',
        },
        detail: {
          es: 'Lo usé sobre todo para una falla que no avisa: los envíos del día dependen de dos crons encadenados —primero el que marca duplicados, después el que arma la cola—, y si el primero no corre, el segundo se ejecuta igual y deja la cola vacía. No salta ningún error: simplemente ese día no sale un solo mail. Haber rastreado eso desde acá fue lo que me llevó a dejar documentado el orden de ejecución y la consulta de verificación, para no tener que diagnosticarlo de cero la próxima vez.',
          en: 'I mostly used this for a failure that never announces itself: the daily sends depend on two chained crons — the one flagging duplicates first, then the one building the queue — and if the first never runs, the second still executes and leaves the queue empty. No error is raised: that day simply not a single email goes out. Tracking that down from here is what led me to document the execution order and the verification query, so I would not have to diagnose it from scratch next time.',
        },
      },
      {
        src: '/projects/previews/preview-supabase-2.png',
        title: { es: 'Métricas de uso', en: 'Usage metrics' },
        description: {
          es: 'Reportes de Supabase con el volumen de requests a la API y a Auth, que es la métrica que se sigue para dimensionar los crons y el retargeting.',
          en: 'Supabase reports showing API and Auth request volume — the metric used to size crons and retargeting.',
        },
        detail: {
          es: 'Lo miro para ajustar cuántos emails por día puede mandar cada clínica sin que una tanda de retargeting se coma el margen de las demás. Cada cliente tiene su propio tope diario y un acumulado semanal, así que el volumen de requests es lo que me dice si ese reparto quedó bien puesto o si hay que correr un cron de horario para que dos clientes grandes no caigan en la misma franja. Es la diferencia entre enterarme por acá o enterarme porque un cliente avisa que dejaron de salir sus campañas.',
          en: 'I check this to tune how many emails a day each clinic can send without one follow-up wave eating into everyone else\'s headroom. Each client has its own daily cap and a weekly running total, so that curve is what tells me whether the split was set right or whether a cron needs its schedule moved so two large clients do not land in the same window. It is the difference between catching it here and hearing about it because a clinic says their campaigns stopped going out.',
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
      es: 'CRM para secretarias: gestión de conversaciones de WhatsApp sobre Chatwoot.',
      en: 'CRM for secretaries: WhatsApp conversation management built on Chatwoot.',
    },
    longDescription: {
      // OJO: NO decir "drag & drop". El tablero mueve conversaciones por cambio de estado
      // (`onMoveConversation`), y kanban-board.js aclara en un comentario "sin drag & drop
      // por ahora". Si algún día se implementa el arrastre, se puede volver a mencionar.
      es: 'CRM para que las secretarias manejen las conversaciones de WhatsApp sin perder el hilo. Backend Node.js con Supabase, tablero kanban de cuatro estados —nuevos, en proceso, agendados y cerrados—, filtros de búsqueda, respuestas rápidas, ficha de paciente y alta de turnos desde la propia conversación.',
      en: 'CRM so secretaries can handle WhatsApp conversations without losing track. Node.js backend with Supabase, a four-stage kanban board — new, in progress, scheduled and closed — plus search filters, quick replies, patient profiles and appointment booking from the conversation itself.',
    },
    role: {
      es: 'Integración de Chatwoot con WhatsApp y n8n, y armado del flujo de respuesta asistida por IA.',
      en: 'Chatwoot integration with WhatsApp and n8n, plus the AI-assisted reply flow.',
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
        description: {
          es: 'Interfaz de Chatwoot, la base sobre la que se montó el CRM: bandeja unificada por canal, asignación entre agentes, etiquetas y ficha de contacto al costado.',
          en: 'Chatwoot interface, the base the CRM was built on: unified inbox per channel, agent assignment, labels and a contact panel on the side.',
        },
        detail: {
          es: 'No uso esta interfaz como producto final, la uso como capa de transporte. El CRM habla con la API de Chatwoot cuenta por cuenta —el id va parametrizado, nunca fijo— y una tabla de configuración decide sobre qué clínica actúa cada automatización, así que sumar una cuenta nueva no toca una línea de código. Encima de eso monté el tablero por estados y el flujo de respuesta asistida por IA. Y un workflow que corre cada hora levanta los mensajes que Chatwoot no logró entregar y los sincroniza al dashboard, para que un envío fallido no dependa de que alguien esté mirando la bandeja justo en ese momento.',
          en: 'I do not use this interface as the final product, I use it as a transport layer. The CRM talks to the Chatwoot API account by account — the id is parameterized, never hardcoded — and a config table decides which clinic each automation acts on, so adding a new account touches no code at all. On top of that I built the status board and the AI-assisted reply flow. And an hourly workflow picks up the messages Chatwoot failed to deliver and syncs them to the dashboard, so a failed send does not depend on someone happening to watch the inbox at that moment.',
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
      es: 'Organizador de horarios para estudiantes de la UCA, con backend en Flask.',
      en: 'Schedule organizer for UCA students, backend built with Flask.',
    },
    longDescription: {
      es: 'Organizador de horarios favorito de la UCA: permite armar la semana en una grilla visual y detectar superposiciones antes de inscribirse a las comisiones. Backend Flask con MySQL, roles de administrador y alumno, control de cupos por comisión y validaciones en tiempo real al cargar materias y usuarios.',
      en: "UCA's favorite schedule organizer: build your week on a visual grid and spot overlaps before enrolling in course sections. Flask backend with MySQL, admin and student roles, per-section capacity control and real-time validation when adding subjects and users.",
    },
    role: {
      es: 'Desarrollo Backend en Flask, modelo de datos en MySQL usando TiDB y Desarrollo frontend de la grilla visual de horarios.',
      en: 'Flask backend, MySQL data model and the visual timetable grid.',
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
    // `kind: 'value'` y no métricas: el proyecto no está en uso, así que no hay números
    // reales que mostrar y no se inventan. Lo que aporta es qué problema saca del medio.
    impact: {
      kind: 'value',
      items: [
        { es: 'La semana completa armada antes de inscribirte', en: 'Your full week laid out before you enroll' },
        { es: 'Las superposiciones se ven, no se descubren después', en: 'Overlaps are visible, not discovered later' },
        { es: 'El cupo de cada comisión, al momento', en: 'Each section capacity, in the moment' },
      ],
    },
    color: 'from-blue-800 to-black-800',
    icon: 'GraduationCap',
    url: 'https://uca-planner.vercel.app/',
    imageBackground: '/projects/uca-planner.png',
    previews: [
      {
        src: '/projects/previews/uca-planner-1.png',
        title: { es: 'Portada', en: 'Landing' },
        description: {
          es: 'Página de entrada: qué resuelve el planner con la oferta académica actualizada por la facultad. Contiene una opción de poder visualizar el organizador de horarios y posibilidad de registrarse para poder guardar los horarios armados.',
          en: 'Landing page: what the planner solves with the course catalog kept up to date by the faculty. It contains an option to view the timetable organizer and the ability to register to save the schedules you create.',
        },
        detail: {
          es: 'Realizé la siguiente interfaz dada con uso de motion frame y tailwind para tener una mejor UX/UI para el usuario, además de un diseño responsive para que se pueda visualizar en cualquier dispositivo.',
          en: 'I created the following interface using motion frame and tailwind for a better UX/UI for the user, as well as a responsive design so that it can be viewed on any device.',
        }
      },
      {
        src: '/projects/previews/uca-planner-2.png',
        title: { es: 'Organizador de horarios', en: 'Timetable organizer' },
        description: {
          es: 'La grilla semanal con las materias elegidas, cada una con su color y su franja horaria, para detectar superposiciones de un vistazo antes de inscribirse.',
          en: 'The weekly grid with the chosen subjects, each with its own color and time slot, to spot overlaps at a glance before enrolling.',
        },
        detail: {
          es: 'El cupo se verifica contra la base en el momento de inscribirse y no al armar la grilla: dos alumnos anotándose a la vez no pueden quedarse los dos con el último lugar. Usé el mismo criterio en los formularios de materias y comisiones: cada campo dispara su propia consulta contra una ruta chica dedicada, y el error aparece al lado del campo, no después de mandar el formulario entero.',
          en: 'Capacity is checked against the database at enrollment time, not while building the grid: two students enrolling at once cannot both take the last seat. I used the same approach on the subject and section forms: each field fires its own request against a small dedicated route, so the error shows up next to the field instead of after submitting the whole form.',
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
      es: 'Gestión de turnos para centros de estética, construido con Laravel Filament.',
      en: 'Appointment management for beauty centers, built with Laravel Filament.',
    },
    longDescription: {
      es: 'Plataforma de turnos para centros de estética con dos paneles Filament separados: uno de administración y otro para el cliente. Cubre servicios, empleados y qué servicio presta cada uno, estados del turno, métodos de pago y cobros, sobre Laravel con entorno Docker.',
      en: 'Appointment platform for beauty centers with two separate Filament panels: one for administration and one for the client. It covers services, employees and which service each one provides, appointment statuses, payment methods and charges, on Laravel with a Docker environment.',
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
    // Mismo criterio que 'uca-planner': sin uso real, sin métricas inventadas.
    impact: {
      kind: 'value',
      items: [
        { es: 'El turno, el servicio y el cobro en un solo lugar', en: 'Appointment, service and payment in one place' },
        { es: 'Cada empleado con los servicios que sabe hacer', en: 'Each employee with the services they actually do' },
        { es: 'El cliente entra a su propio panel, no llama', en: 'The client opens their own panel instead of calling' },
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
        description: {
          es: 'Login del sistema con cuentas de demostración separadas por rol —dueño, encargado y líder—, cada una con su propio alcance dentro del panel.',
          en: 'System login with demo accounts split by role — owner, manager and leader — each with its own scope inside the panel.',
        },
        detail: {
          es: 'Son dos paneles de Filament separados —uno de administración y otro de cliente— y no un panel único con permisos condicionales. Separarlos a nivel de aplicación, en vez de esconder secciones con un if de rol, hace que el panel del cliente ni siquiera cargue las pantallas de administración: esas rutas y esos recursos directamente no existen para él.',
          en: 'These are two separate Filament panels — one for administration, one for the client — rather than a single panel with conditional permissions. Splitting them at the application level, instead of hiding sections behind a role check, means the client panel never even loads the admin screens: those routes and resources simply do not exist for them.',
        },
      },
      {
        src: '/projects/previews/preview-alexandria-2.png',
        title: { es: 'Configuración de agenda', en: 'Schedule setup' },
        description: {
          es: 'Panel de disponibilidad semanal: duración del turno, franjas horarias por día y reglas de sobreturno, más las secciones de link de reserva, usuarios y reseñas.',
          en: 'Weekly availability panel: appointment duration, per-day time ranges and overbooking rules, plus booking link, users and ratings sections.',
        },
        detail: {
          es: 'La disponibilidad se guarda como JSON en el turno y no como columnas fijas por día. Migré la tabla justamente para eso: con columnas fijas, sumar una franja nueva o una regla de sobreturno distinta un día puntual hubiera significado tocar el esquema. Así cada centro define sus horarios —duración incluida— sin que ningún cambio de configuración pida una migración.',
          en: 'Availability is stored as JSON on the appointment instead of fixed per-weekday columns. I migrated the table specifically for this: with fixed columns, adding a new slot or a different overbooking rule for one day would have meant touching the schema. Now each center defines its own schedule — duration included — without any configuration change needing a migration.',
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
    // Corta a propósito, del mismo largo que la de los demás proyectos (~70-90 caracteres):
    // en la carta abierta de mobile el dorso tiene alto fijo y esto entra completo en dos
    // renglones. "Estará disponible pronto" se sacó por redundante, no por recortada —ya lo
    // dice el título ("Próximamente…") y el chip "En desarrollo" del pie—, así que no se
    // perdió información, sólo el relleno. Si se alarga de nuevo, va a volver a cortarse.
    description: {
      es: 'Proyecto personal en desarrollo: app web con agentes de IA integrados.',
      en: 'Personal project in development: web app with integrated AI agents.',
    },
    longDescription: {
      es: 'Proyecto propio, todavía en desarrollo: una aplicación web con agentes de IA integrados en el flujo de trabajo, pensada desde el arranque para escalar a una app móvil. Es el primer producto que llevo de punta a punta por mi cuenta, desde la idea y la arquitectura hasta el despliegue.',
      en: 'My own project, still in development: a web application with AI agents integrated into the workflow, designed from the start to scale into a mobile app. It is the first product I am taking end to end on my own, from idea and architecture through to deployment.',
    },
    role: {
      es: 'Todo: producto, arquitectura, desarrollo e infraestructura.',
      en: 'Everything: product, architecture, development and infrastructure.',
    },
    tech: ['AWS', 'React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'GitHub', 'Redis', 'Claude', 'Git'],
    highlights: {
      // 'Redis' pasó a `tech` (tiene logo) y 'AI Agents' se volvió 'Claude' allá: acá
      // queda sólo la capacidad, que es lo que describe al proyecto.
      es: ['Aplicacion Web', 'Futura App Móvil', 'Integración con AI Agents'],
      en: ['Web Application', 'Future Mobile App', 'Integration with AI Agents'],
    },
    impact: {
      kind: 'value',
      // El segundo ítem entraba en dos renglones (56 caracteres) y ese renglón de más era
      // lo que terminaba empujando el corte de la descripción de arriba: el dorso mobile
      // reparte un alto fijo entre las dos, y acá se estaba llevando más de lo que le tocaba.
      // Acortado al mismo largo que sus vecinos para que los tres midan una línea pareja.
      items: [
        { es: 'Agentes de IA integrados para ayudar al usuario', en: 'AI agents integrated to assist the user' },
        { es: 'Cada modelo, especializado en su tarea', en: 'Each model specialized for its task' },
        { es: 'Gran problema de la actualidad...', en: 'A major challenge of today...' },
      ],
    },
    color: 'from-blue-800 to-darkblue-600',
    icon: 'Zap',
    imageBackground: '/projects/app.png',
  },
]

/*
 * PENDIENTE — capturas que no son del proyecto
 *
 * Tres de las nueve previews no son del producto sino de la plataforma sobre la que está
 * construido, tal como las publica el proveedor:
 *
 *   · preview-supabase-1.png y preview-supabase-2.png → capturas de marketing de Supabase
 *     (proyectos "meme.town" y "todo-list-live", 2021/2024).
 *   · preview-chatwoot.png → demo pública de Chatwoot ("Paperlayer", contactos ficticios).
 *
 * Los textos de esas tres describen la herramienta y NO se atribuyen como trabajo propio,
 * justamente para no decirle a un reclutador algo que no es. Cuando haya capturas reales
 * de las Edge Functions y del CRM, reemplazarlas y reescribir el texto en primera persona.
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
