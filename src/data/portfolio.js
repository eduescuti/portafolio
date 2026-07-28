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
  age: 26,
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

export const projects = [
  {
    id: 'dashboard-ac',
    folder: 'AnderssonConsultores/Dashboard',
    title: { es: 'Dashboard Analítico AC', en: 'AC Analytics Dashboard' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    description: {
      es: 'Panel para clientes médicos, con roles admin y cliente sobre Supabase.',
      en: 'Medical client panel with admin and client roles, built on Supabase.',
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
      '/projects/previews/preview-ac-dash-1.png',
      '/projects/previews/preview-ac-dash-2.png',
    ],
  },
  {
    id: 'edge-functions',
    folder: 'AnderssonConsultores/Edge Functions',
    title: { es: 'Edge Functions & Automatizaciones', en: 'Edge Functions & Automations' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    description: {
      es: 'Automatizaciones serverless para emails, encuestas y seguimiento de leads.',
      en: 'Serverless automations for emails, surveys and lead follow-up.',
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
    previews: [
      '/projects/previews/preview-supabase-1.png',
      '/projects/previews/preview-supabase-2.png',
    ],
  },
  {
    id: 'crm-whapp',
    folder: 'AnderssonConsultores/CRM',
    title: { es: 'CRM WhatsApp', en: 'WhatsApp CRM' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    description: {
      es: 'CRM para secretarias: gestión de conversaciones de WhatsApp sobre Chatwoot.',
      en: 'CRM for secretaries: WhatsApp conversation management built on Chatwoot.',
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
    previews: ['/projects/previews/preview-chatwoot.png'],
  },
  {
    id: 'estetica-app',
    folder: 'estetica-app',
    title: { es: 'Sistema de Turnos', en: 'Appointment System' },
    subtitle: { es: 'Alexandria Solutions', en: 'Alexandria Solutions' },
    description: {
      es: 'Gestión de turnos para centros de estética, construido con Laravel Filament.',
      en: 'Appointment management for beauty centers, built with Laravel Filament.',
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
      '/projects/previews/preview-alexandria-1.png',
      '/projects/previews/preview-alexandria-2.png',
    ],
  },
  {
    id: 'uca-planner',
    folder: 'uca-planner',
    title: { es: 'UCA Planner', en: 'UCA Planner' },
    subtitle: { es: 'Proyecto universitario UCA', en: 'UCA university project' },
    description: {
      es: 'Organizador de horarios para estudiantes de la UCA, con backend en Flask.',
      en: 'Schedule organizer for UCA students, backend built with Flask.',
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
      '/projects/previews/uca-planner-1.png',
      '/projects/previews/uca-planner-2.png',
    ],
  },
  {
    id: 'coming-soon',
    folder: '...',
    title: { es: 'Próximamente...', en: 'Coming soon...' },
    subtitle: { es: 'Desarrollando algo propio', en: 'Developing something on my own' },
    description: {
      es: 'Estoy emprendiendo por mi cuenta: un proyecto personal que combina una aplicación web con integración de agentes de IA, y que estará disponible pronto.',
      en: 'I am venturing out on my own: a personal project that combines a web application with AI agent integration, coming soon.',
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
