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
      es: 'Panel web para clientes médicos con autenticación Supabase, visualización de métricas de email marketing, funnels de encuestas, carga de datos CSV y estandarización de información. Incluye gráficos interactivos con Recharts y gestión de roles admin/cliente.',
      en: 'Web panel for medical clients with Supabase authentication, email marketing metrics visualization, survey funnels, CSV data upload and data standardization. Includes interactive charts with Recharts and admin/client role management.',
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
      es: [
        'Dashboard Analítico', 'Gráficos interactivos', 'Carga de Archivos', 'Panel admin',
        'Recharts', 'APIs', 'Email Marketing', 'UX/UI Design',
      ],
      en: [
        'Analytics Dashboard', 'Interactive charts', 'File Upload', 'Admin panel',
        'Recharts', 'APIs', 'Email Marketing', 'UX/UI Design',
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
      },
      {
        src: '/projects/previews/preview-ac-dash-2.png',
        title: { es: 'Panel de administración', en: 'Admin panel' },
        description: {
          es: 'Vista de administrador: selector de cliente, rango de fechas con comparación contra el período anterior y separación entre gestión interna e informes de pacientes.',
          en: 'Admin view: client selector, date range with previous-period comparison, and a split between internal management and patient reports.',
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
      es: 'Funciones serverless en Supabase para envío de emails, registro de encuestas, webhooks de Brevo y crons automatizados. Workflows en n8n para seguimiento de conversaciones y retargeting.',
      en: 'Supabase serverless functions for email sending, survey registration, Brevo webhooks and automated crons. n8n workflows for conversation follow-up and retargeting.',
    },
    role: {
      es: 'Diseño e implementación de las funciones, los crons y los workflows de automatización.',
      en: 'Design and implementation of the functions, crons and automation workflows.',
    },
    // 'Webhooks' salió del stack: no es una tecnología con logo y ya figura como highlight.
    tech: ['Supabase', 'Brevo', 'PostgreSQL', 'Typescript', 'Git', 'JWT', 'n8n', 'GitHub',
      'Claude Code', 'AI Cursor', 'Docker'],
    highlights: {
      es: ['Serverless', 'Crons', 'Edge Functions', 'Webhooks', 'n8n workflows'],
      en: ['Serverless', 'Crons', 'Edge Functions', 'Webhooks', 'n8n workflows'],
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
      },
      {
        src: '/projects/previews/preview-supabase-2.png',
        title: { es: 'Métricas de uso', en: 'Usage metrics' },
        description: {
          es: 'Reportes de Supabase con el volumen de requests a la API y a Auth, que es la métrica que se sigue para dimensionar los crons y el retargeting.',
          en: 'Supabase reports showing API and Auth request volume — the metric used to size crons and retargeting.',
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
      es: 'CRM para facilitar el manejo de conversaciones de WhatsApp por secretarias. Backend Node.js con Supabase como base de datos, drag & drop de conversaciones entre secciones, filtros y respuestas rápidas.',
      en: 'CRM to streamline WhatsApp conversation management for secretaries. Node.js backend with Supabase as database, drag & drop conversations between sections, filters and quick replies.',
    },
    role: {
      es: 'Integración de Chatwoot con WhatsApp y n8n, y armado del flujo de respuesta asistida por IA.',
      en: 'Chatwoot integration with WhatsApp and n8n, plus the AI-assisted reply flow.',
    },
    // 'AI Agents' y 'Bots' eran capacidades, no tecnologías: el agente corre sobre
    // Claude, que sí es una herramienta concreta y con logo.
    tech: ['n8n', 'Chatwoot', 'PostgreSQL', 'Docker', 'Claude', 'Git', 'Whatsapp', 'AI Cursor', 'GitHub'],
    highlights: {
      es: ['Filtros', 'Respuestas rápidas', 'Tiempo real', 'AI Response', 'Bots'],
      en: ['Filters', 'Quick replies', 'Real-time', 'AI Response', 'Bots'],
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
      es: 'Plataforma de gestión de turnos para centros de estética con paneles separados para administradores y clientes. Gestión de servicios, empleados, citas y pagos mediante Laravel Filament con entorno Docker.',
      en: 'Appointment management platform for beauty centers with separate panels for administrators and clients. Services, employees, appointments and payments management using Laravel Filament with Docker environment.',
    },
    role: {
      es: 'Desarrollo del sistema sobre Laravel + Filament y armado del entorno con Docker.',
      en: 'System development on Laravel + Filament and Docker environment setup.',
    },
    tech: ['Laravel', 'Filament', 'PHP', 'MySQL', 'Docker', 'Git', 'GitHub'],
    highlights: {
      es: ['Panel admin', 'Panel cliente', 'Turnos', 'Pagos'],
      en: ['Admin panel', 'Client panel', 'Appointments', 'Payments'],
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
      },
      {
        src: '/projects/previews/preview-alexandria-2.png',
        title: { es: 'Configuración de agenda', en: 'Schedule setup' },
        description: {
          es: 'Panel de disponibilidad semanal: duración del turno, franjas horarias por día y reglas de sobreturno, más las secciones de link de reserva, usuarios y reseñas.',
          en: 'Weekly availability panel: appointment duration, per-day time ranges and overbooking rules, plus booking link, users and ratings sections.',
        },
      },
    ],
  },
  {
    id: 'uca-planner',
    folder: 'uca-planner',
    title: { es: 'UCA Planner', en: 'UCA Planner' },
    subtitle: { es: 'Proyecto universitario UCA', en: 'UCA university project' },
    rarity: 'rare',
    serie: 'UCA',
    year: '2024',
    status: 'live',
    description: {
      es: 'Organizador de horarios para estudiantes de la UCA, con backend en Flask.',
      en: 'Schedule organizer for UCA students, backend built with Flask.',
    },
    longDescription: {
      es: 'Organizador de horarios favorito de la UCA. Permite armar cronogramas visuales de materias y realizar inscripciones a comisiones. Backend Flask con MySQL, roles de administrador y alumno, y gestión completa de cursos, materias y comisiones.',
      en: "UCA's favorite schedule organizer. Allows building visual subject timetables and enrolling in course sections. Flask backend with MySQL, admin and student roles, and full management of courses, subjects and sections.",
    },
    role: {
      es: 'Backend en Flask, modelo de datos en MySQL y la grilla visual de horarios.',
      en: 'Flask backend, MySQL data model and the visual timetable grid.',
    },
    tech: ['Python', 'Flask', 'MySQL', 'XAMPP', 'JavaScript', 'HTML/CSS', 'AWS', 'Git', 'GitHub'],
    highlights: {
      es: ['Organizador visual', 'Inscripciones', 'Roles admin/alumno', 'MySQL'],
      en: ['Visual scheduler', 'Enrollments', 'Admin/student roles', 'MySQL'],
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
          es: 'Página de entrada: qué resuelve el planner —ver la semana armada antes de anotarse— con la oferta académica actualizada por la facultad.',
          en: 'Landing page: what the planner solves — seeing your full week before enrolling — with the course catalog kept up to date by the faculty.',
        },
      },
      {
        src: '/projects/previews/uca-planner-2.png',
        title: { es: 'Organizador de horarios', en: 'Timetable organizer' },
        description: {
          es: 'La grilla semanal con las materias elegidas, cada una con su color y su franja horaria, para detectar superposiciones de un vistazo antes de inscribirse.',
          en: 'The weekly grid with the chosen subjects, each with its own color and time slot, to spot overlaps at a glance before enrolling.',
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
      es: 'Estoy emprendiendo por mi cuenta: un proyecto personal que combina una aplicación web con integración de agentes de IA, y que estará disponible pronto.',
      en: 'I am venturing out on my own: a personal project that combines a web application with AI agent integration, coming soon.',
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
