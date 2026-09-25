/*
 * DATOS DEL DIAGRAMA — edita solo este archivo para actualizar el contenido.
 * app.js lee estos datos y dibuja el diagrama; nunca necesitas tocar app.js
 * para cambiar textos, valores o agregar/quitar trabajos, áreas o habilidades.
 *
 * Estructura, de izquierda a derecha en el diagrama:
 *   orgs (trabajos y proyectos) -> pillars (las 4 áreas) -> skills (habilidades)
 *
 * IDIOMAS: todo texto visible es un objeto {es, en, cat}. Para corregir o
 * mejorar una traducción, edita solo el idioma que quieras — los otros dos
 * no cambian. Si agregas un trabajo/habilidad nuevo, escribe los 3 idiomas
 * (puedes copiar el español en los 3 de momento y traducirlo después; el
 * diagrama no se rompe por dejar un idioma provisional).
 *
 * "value" en orgLinks es el NÚMERO DE LOGROS REALES del CV que sostienen esa
 * conexión (no un número inventado) — controla el grosor de la cinta.
 * "note" es el texto que aparece en el tooltip al pasar el cursor.
 */

window.SANKEY_DATA = {

  // Textos fijos de la página (título, subtítulo, encabezados de columna, pie).
  ui: {
    es: {
      eyebrow: "Trayectoria profesional · a partir del CV maestro",
      h1: "Cuatro áreas, una sola narrativa",
      subtitle: "Nueve trabajos y proyectos reales —incluido voluntariado— confluyen en las cuatro áreas que explican cómo trabajo: investigación, comunicación, gestión y docencia no son roles dispersos, son la misma forma de trabajar aplicada a contextos distintos. Cada área se abre, a su vez, en los patrones de habilidad concretos que la sostienen.",
      bylineRole: "doctorando en Comunicación, UPF",
      colHead1: "Trabajos y proyectos",
      colHead2: "Áreas de trabajo",
      colHead3: "Habilidades",
      footnoteLeft: "El grosor de cada cinta es el número de logros reales del CV que la sostienen; pasa el cursor sobre nodos o enlaces para leerlos.",
      pillarStat: "{n} trabajos · {m} habilidades"
    },
    en: {
      eyebrow: "Professional trajectory · from the master CV",
      h1: "Four areas, one narrative",
      subtitle: "Nine real jobs and projects —volunteering included— converge on the four areas that explain how I work: research, communication, management, and teaching aren't scattered roles, they're the same way of working applied to different contexts. Each area, in turn, opens into the concrete skill patterns behind it.",
      bylineRole: "PhD candidate in Communication, UPF",
      colHead1: "Jobs and projects",
      colHead2: "Areas of work",
      colHead3: "Skills",
      footnoteLeft: "Ribbon thickness is the number of real CV achievements behind it; hover any node or link to read them.",
      pillarStat: "{n} jobs · {m} skills"
    },
    cat: {
      eyebrow: "Trajectòria professional · a partir del CV mestre",
      h1: "Quatre àrees, una sola narrativa",
      subtitle: "Nou feines i projectes reals —voluntariat inclòs— conflueixen en les quatre àrees que expliquen com treballo: investigació, comunicació, gestió i docència no són rols dispersos, són la mateixa manera de treballar aplicada a contextos diferents. Cada àrea s'obre, alhora, en els patrons d'habilitat concrets que la sostenen.",
      bylineRole: "doctorand en Comunicació, UPF",
      colHead1: "Feines i projectes",
      colHead2: "Àrees de treball",
      colHead3: "Habilitats",
      footnoteLeft: "El gruix de cada cinta és el nombre de fites reals del CV que la sostenen; passa el cursor per sobre dels nodes o enllaços per llegir-les.",
      pillarStat: "{n} feines · {m} habilitats"
    }
  },

  // Colores por área. Los valores hex reales están en style.css (--inv, --com,
  // --ges, --doc); aquí solo se referencian para que cada área tenga su color.
  pcolor: { inv: "var(--inv)", com: "var(--com)", ges: "var(--ges)", doc: "var(--doc)" },

  // Las 4 áreas de trabajo (columna del centro).
  pillars: [
    { id: "inv",
      label: { es: "Investigación", en: "Research", cat: "Investigació" },
      full:  { es: "Investigación y análisis de políticas públicas", en: "Research and public policy analysis", cat: "Investigació i anàlisi de polítiques públiques" },
      fact:  { es: "Tesis depositada sept. 2026 · defensa dic. 2026 (UPF).", en: "Dissertation deposited Sept. 2026 · defense expected Dec. 2026 (UPF).", cat: "Tesi dipositada set. 2026 · defensa desembre 2026 (UPF)." } },
    { id: "com",
      label: { es: "Comunicación", en: "Communication", cat: "Comunicació" },
      full:  { es: "Comunicación estratégica", en: "Strategic communication", cat: "Comunicació estratègica" },
      fact:  { es: "De redes comunitarias a comunicación institucional.", en: "From community networks to institutional communication.", cat: "De xarxes comunitàries a comunicació institucional." } },
    { id: "ges",
      label: { es: "Gestión", en: "Management", cat: "Gestió" },
      full:  { es: "Gestión de programas y alianzas", en: "Program and partnerships management", cat: "Gestió de programes i aliances" },
      fact:  { es: "PM4R (BID) · 4 niveles certificados.", en: "PM4R (IDB) · 4 certified tracks.", cat: "PM4R (BID) · 4 nivells certificats." } },
    { id: "doc",
      label: { es: "Docencia", en: "Teaching", cat: "Docència" },
      full:  { es: "Docencia y traducción de conocimiento complejo", en: "Teaching and translating complex knowledge", cat: "Docència i traducció de coneixement complex" },
      fact:  { es: "145+ estudiantes en 3 idiomas, entre UPF y Tec de Monterrey.", en: "145+ students in 3 languages, across UPF and Tec de Monterrey.", cat: "145+ estudiants en 3 idiomes, entre la UPF i el Tec de Monterrey." } }
  ],

  // Trabajos y proyectos reales (columna de la izquierda). "id" se usa para
  // conectar con orgLinks más abajo — si agregas uno nuevo, dale un id corto
  // y único (sin espacios) y úsalo en las conexiones que quieras crear.
  orgs: [
    { id: "upf",
      label: { es: "UPF", en: "UPF", cat: "UPF" },
      full:  { es: "Universitat Pompeu Fabra — PhD Candidate", en: "Universitat Pompeu Fabra — PhD Candidate", cat: "Universitat Pompeu Fabra — Doctorand" } },
    { id: "tec",
      label: { es: "Tec de Monterrey", en: "Tec de Monterrey", cat: "Tec de Monterrey" },
      full:  { es: "Tecnológico de Monterrey — Area Coordinator & Adjunct Professor", en: "Tecnológico de Monterrey — Area Coordinator & Adjunct Professor", cat: "Tecnológico de Monterrey — Area Coordinator i professor adjunt" } },
    { id: "colmenas",
      label: { es: "Colmenas de Zapopan", en: "Colmenas de Zapopan", cat: "Colmenas de Zapopan" },
      full:  { es: "Colmenas de Zapopan — Zapopan City Council", en: "Colmenas de Zapopan — Zapopan City Council", cat: "Colmenas de Zapopan — Ajuntament de Zapopan" } },
    { id: "ethos",
      label: { es: "Ethos Lab", en: "Ethos Lab", cat: "Ethos Lab" },
      full:  { es: "Ethos Laboratory of Public Policies — Policy Analysis Intern", en: "Ethos Laboratory of Public Policies — Policy Analysis Intern", cat: "Ethos Laboratory of Public Policies — Becari d'anàlisi de polítiques" } },
    { id: "interarts",
      label: { es: "Interarts Foundation", en: "Interarts Foundation", cat: "Interarts Foundation" },
      full:  { es: "Interarts Foundation, Barcelona — Comms Intern", en: "Interarts Foundation, Barcelona — Comms Intern", cat: "Interarts Foundation, Barcelona — Becari de comunicació" } },
    { id: "techo",
      label: { es: "TECHO México", en: "TECHO Mexico", cat: "TECHO Mèxic" },
      full:  { es: "TECHO México — voluntariado, 4 años", en: "TECHO Mexico — volunteering, 4 years", cat: "TECHO Mèxic — voluntariat, 4 anys" } },
    { id: "raun",
      label: { es: "RA-UN / OSCE", en: "RA-UN / OSCE", cat: "RA-UN / OSCE" },
      full:  { es: "RA-UN / OSCE — Principal Investigator, fellowship de investigación (voluntario, independiente de la UPF)", en: "RA-UN / OSCE — Principal Investigator, research fellowship (volunteer, independent of UPF)", cat: "RA-UN / OSCE — Principal Investigator, fellowship de recerca (voluntari, independent de la UPF)" } },
    { id: "redglobal",
      label: { es: "Red Global MX", en: "Red Global MX", cat: "Red Global MX" },
      full:  { es: "Red Global MX, Capítulo Barcelona — voluntariado, 2025–presente", en: "Red Global MX, Barcelona Chapter — volunteering, 2025–present", cat: "Red Global MX, Capítol Barcelona — voluntariat, 2025–present" } },
    { id: "spado",
      label: { es: "SPADO Consulting", en: "SPADO Consulting", cat: "SPADO Consulting" },
      full:  { es: "SPADO Consulting, Guadalajara — Logistics Operator, 2014 (rol de inicio de carrera)", en: "SPADO Consulting, Guadalajara — Logistics Operator, 2014 (early-career role)", cat: "SPADO Consulting, Guadalajara — Logistics Operator, 2014 (rol d'inici de carrera)" } }
  ],

  // Habilidades / patrones (columna de la derecha). "pillar" dice a qué área
  // pertenece cada una (debe ser uno de los id de "pillars" arriba).
  skills: [
    { id: "s1", pillar: "inv",
      short: { es: "Investigación de campo", en: "Field research", cat: "Investigació de camp" },
      full:  { es: "Investigación cualitativa y de campo", en: "Qualitative & field research", cat: "Investigació qualitativa i de camp" } },
    { id: "s2", pillar: "inv",
      short: { es: "Políticas públicas", en: "Public policy", cat: "Polítiques públiques" },
      full:  { es: "Análisis y redacción de políticas públicas", en: "Public policy analysis & writing", cat: "Anàlisi i redacció de polítiques públiques" } },
    { id: "s3", pillar: "com",
      short: { es: "Comunicación digital", en: "Digital communications", cat: "Comunicació digital" },
      full:  { es: "Comunicación digital y de contenidos", en: "Digital & content communications", cat: "Comunicació digital i de continguts" } },
    { id: "s4", pillar: "com",
      short: { es: "Comunicación institucional", en: "Institutional communications", cat: "Comunicació institucional" },
      full:  { es: "Comunicación institucional y relaciones con actores clave", en: "Institutional & stakeholder communications", cat: "Comunicació institucional i relacions amb actors clau" } },
    { id: "s5", pillar: "ges",
      short: { es: "Alianzas y partnerships", en: "Partnerships", cat: "Aliances i partnerships" },
      full:  { es: "Gestión de alianzas y partnerships", en: "Partnership & alliance management", cat: "Gestió d'aliances i partnerships" } },
    { id: "s6", pillar: "ges",
      short: { es: "Equipos y voluntariado", en: "Teams & volunteers", cat: "Equips i voluntariat" },
      full:  { es: "Gestión de equipos y voluntariado", en: "Team & volunteer management", cat: "Gestió d'equips i voluntariat" } },
    { id: "s7", pillar: "ges",
      short: { es: "Programas y eventos", en: "Programs & events", cat: "Programes i esdeveniments" },
      full:  { es: "Gestión de programas y eventos", en: "Program & event management", cat: "Gestió de programes i esdeveniments" } },
    { id: "s8", pillar: "doc",
      short: { es: "Docencia universitaria", en: "University teaching", cat: "Docència universitària" },
      full:  { es: "Docencia universitaria multilingüe", en: "Multilingual university teaching", cat: "Docència universitària multilingüe" } },
    { id: "s9", pillar: "doc",
      short: { es: "Formación y talleres", en: "Training & workshops", cat: "Formació i tallers" },
      full:  { es: "Diseño de formación y talleres", en: "Training & workshop design", cat: "Disseny de formació i tallers" } }
  ],

  // Conexiones trabajo -> habilidad. "s" = id del trabajo (de "orgs"),
  // "t" = id de la habilidad (de "skills"), "v" = número de logros reales
  // que la sostienen, "note" = texto del tooltip en los 3 idiomas.
  orgLinks: [
    { s: "upf", t: "s1", v: 1, note: {
      es: "Investigación doctoral sobre perspectivas decoloniales aplicadas a la comunicación para el desarrollo.",
      en: "Doctoral research on decolonial perspectives applied to communication for development.",
      cat: "Investigació doctoral sobre perspectives decolonials aplicades a la comunicació per al desenvolupament." } },
    { s: "upf", t: "s3", v: 1, note: {
      es: "Lidera la comunicación digital del grupo de investigación (newsletter, buzón institucional, web en Liferay).",
      en: "Leads the research group's digital communications (newsletter, institutional inbox, Liferay website).",
      cat: "Lidera la comunicació digital del grup de recerca (butlletí, bústia institucional, web a Liferay)." } },
    { s: "upf", t: "s7", v: 1, note: {
      es: "Planifica de principio a fin 30+ seminarios híbridos de investigación (Zoom, Eventum).",
      en: "Plans 30+ hybrid research seminars end-to-end (Zoom, Eventum).",
      cat: "Planifica de principi a fi 30+ seminaris híbrids de recerca (Zoom, Eventum)." } },
    { s: "upf", t: "s8", v: 1, note: {
      es: "Imparte dos cursos de grado en tres idiomas (ES/CAT/EN) a 85 estudiantes.",
      en: "Teaches two undergraduate courses across three languages (Spanish, Catalan, English) to 85 students.",
      cat: "Imparteix dos cursos de grau en tres idiomes (ES/CAT/EN) a 85 estudiants." } },

    { s: "tec", t: "s5", v: 2, note: {
      es: "Mentoría de 20+ proyectos de innovación social con Ashoka, Hult Prize, TECHO, Colmenas y Aldea Arcoiris; alianzas con ONGs y organizaciones locales.",
      en: "Mentored 20+ social-innovation projects with Ashoka, Hult Prize, TECHO, Colmenas, and Aldea Arcoiris; partnerships with NGOs and local organizations.",
      cat: "Mentoria de 20+ projectes d'innovació social amb Ashoka, Hult Prize, TECHO, Colmenas i Aldea Arcoiris; aliances amb ONG i organitzacions locals." } },
    { s: "tec", t: "s7", v: 2, note: {
      es: "Diseño y transferencia de liderazgo de Changemaker Fest 2022; comunicación y promoción de eventos como Hult Prize (+85% de enganche).",
      en: "Designed Changemaker Fest 2022 and transferred its leadership; communications and promotion for events like Hult Prize (+85% engagement).",
      cat: "Disseny i transferència de lideratge de Changemaker Fest 2022; comunicació i promoció d'esdeveniments com el Hult Prize (+85% d'implicació)." } },
    { s: "tec", t: "s3", v: 1, note: {
      es: "Creación de contenido estratégico y colaboración con partners en plataformas digitales.",
      en: "Strategic content creation and partner collaboration on digital platforms.",
      cat: "Creació de contingut estratègic i col·laboració amb partners en plataformes digitals." } },
    { s: "tec", t: "s8", v: 1, note: {
      es: "Diseña e imparte tres cursos de grado a 60+ estudiantes (Conflicto y Negociación, Diversidad, Teorías del Desarrollo).",
      en: "Designed and taught three undergraduate courses to 60+ students (Conflict and Negotiation, Diversity in a Globalized World, Development Theories).",
      cat: "Dissenya i imparteix tres cursos de grau a 60+ estudiants (Conflicte i Negociació, Diversitat, Teories del Desenvolupament)." } },

    { s: "colmenas", t: "s1", v: 1, note: {
      es: "Codiseña un estudio de caso académico con el Tec de Monterrey sobre intervención comunitaria.",
      en: "Co-designed an academic case study with Tec de Monterrey on community intervention.",
      cat: "Codissenya un estudi de cas acadèmic amb el Tec de Monterrey sobre intervenció comunitària." } },
    { s: "colmenas", t: "s3", v: 2, note: {
      es: "Crecimiento de comunidad en redes de 200 a 3,000 seguidores en 8 meses (+45% asistencia a talleres); lanza y mantiene el sitio WordPress de la organización.",
      en: "Grew the social media community from 200 to 3,000 followers in 8 months (+45% workshop attendance); launched and maintained the organization's WordPress site.",
      cat: "Creixement de la comunitat a les xarxes socials de 200 a 3.000 seguidors en 8 mesos (+45% d'assistència a tallers); llança i manté el lloc WordPress de l'organització." } },
    { s: "colmenas", t: "s4", v: 2, note: {
      es: "Aumenta la visibilidad del centro comunitario con una estrategia de comunicación; estandariza protocolos de comunicación entre centros.",
      en: "Increased the community center's visibility through a communications strategy; standardized cross-center communication protocols.",
      cat: "Augmenta la visibilitat del centre comunitari amb una estratègia de comunicació; estandarditza protocols de comunicació entre centres." } },
    { s: "colmenas", t: "s5", v: 2, note: {
      es: "3 alianzas formales entre sectores público, privado y académico; diseña oportunidades de servicio con la Oficina de Servicio Social del Tec de Monterrey.",
      en: "3 formal agreements across public, private, and academic sectors; designed service opportunities with Tec de Monterrey's Social Service Office.",
      cat: "3 aliances formals entre els sectors públic, privat i acadèmic; dissenya oportunitats de servei amb l'Oficina de Servei Social del Tec de Monterrey." } },
    { s: "colmenas", t: "s6", v: 2, note: {
      es: "Gestiona un promedio de 10 becarios por semestre, más una beca federal (Jóvenes Construyendo el Futuro); diseña manuales operativos y capacita al equipo.",
      en: "Managed an average of 10 interns per semester, plus a federally-funded scholarship holder (Jóvenes Construyendo el Futuro); designed operational manuals and trained the team.",
      cat: "Gestiona una mitjana de 10 becaris per semestre, més una beca federal (Jóvenes Construyendo el Futuro); dissenya manuals operatius i forma l'equip." } },
    { s: "colmenas", t: "s9", v: 1, note: {
      es: "Diseña e imparte talleres de alfabetización digital para mujeres, jóvenes y niños.",
      en: "Designed and taught digital-literacy workshops for women, youth, and children.",
      cat: "Dissenya i imparteix tallers d'alfabetització digital per a dones, joves i infants." } },

    { s: "ethos", t: "s2", v: 3, note: {
      es: "Analiza marcos de política pública (Presupuesto Basado en Resultados, Sistema de Evaluación del Desempeño, Programa de Mejora de la Gestión); produce recomendaciones accionables y traduce el análisis técnico para públicos no expertos.",
      en: "Analyzed public-policy frameworks (Results-Based Budgeting, Performance Evaluation System, Management Improvement Program); produced actionable recommendations and translated technical analysis for non-expert audiences.",
      cat: "Analitza marcs de política pública (Pressupost Basat en Resultats, Sistema d'Avaluació de l'Acompliment, Programa de Millora de la Gestió); produeix recomanacions accionables i tradueix l'anàlisi tècnica per a públics no experts." } },

    { s: "interarts", t: "s3", v: 2, note: {
      es: "Estrategia digital y perfil de LinkedIn de la fundación; codiseña el nuevo sitio web.",
      en: "Digital strategy and LinkedIn profile for the foundation; co-designed the new website.",
      cat: "Estratègia digital i perfil de LinkedIn de la fundació; codissenya el nou lloc web." } },
    { s: "interarts", t: "s4", v: 1, note: {
      es: "Colabora en campañas internacionales, fortaleciendo la comunicación intercultural y la relación con actores clave.",
      en: "Collaborated on international campaigns, strengthening cross-cultural communication and stakeholder relationships.",
      cat: "Col·labora en campanyes internacionals, enfortint la comunicació intercultural i la relació amb actors clau." } },
    { s: "interarts", t: "s5", v: 1, note: {
      es: "Construye un repositorio europeo de proyectos, centralizando recursos para 100+ organizaciones socias.",
      en: "Built a European project repository, centralizing resources for 100+ partner organizations.",
      cat: "Construeix un repositori europeu de projectes, centralitzant recursos per a 100+ organitzacions sòcies." } },

    { s: "techo", t: "s1", v: 2, note: {
      es: "Diseña y lidera una metodología de investigación cualitativa de campo, ampliando la cobertura de 4 a 16 asentamientos; los hallazgos alimentan campañas nacionales de incidencia.",
      en: "Designed and led an on-the-ground qualitative research methodology, expanding coverage from 4 to 16 informal settlements; findings fed national advocacy campaigns.",
      cat: "Dissenya i lidera una metodologia de recerca qualitativa de camp, ampliant la cobertura de 4 a 16 assentaments; les troballes alimenten campanyes nacionals d'incidència." } },
    { s: "techo", t: "s4", v: 2, note: {
      es: "Gestiona canales sociales y de comunicación alineados con campañas nacionales de incidencia; fortalece la presencia en medios.",
      en: "Managed social and communications channels aligned with national advocacy campaigns; strengthened media presence.",
      cat: "Gestiona canals socials i de comunicació alineats amb campanyes nacionals d'incidència; enforteix la presència als mitjans." } },
    { s: "techo", t: "s6", v: 2, note: {
      es: "Coordina equipos de comunicación y equipos multidisciplinarios de voluntariado durante los 4 años de colaboración.",
      en: "Coordinated communications teams and multidisciplinary volunteer teams over 4 years of engagement.",
      cat: "Coordina equips de comunicació i equips multidisciplinaris de voluntariat durant els 4 anys de col·laboració." } },
    { s: "techo", t: "s9", v: 1, note: {
      es: "Redacta materiales de formación en incidencia usados por cientos de voluntarios.",
      en: "Authored advocacy-training materials used by hundreds of volunteers.",
      cat: "Redacta materials de formació en incidència utilitzats per centenars de voluntaris." } },

    { s: "raun", t: "s2", v: 1, note: {
      es: "Principal Investigator del policy brief «Bringing all to the Table: How to Include Men in Combating Gender Inequalities», presentado en la OSCE (Palacio de Hofburgo) y la sede de la ONU en Viena — proyecto propio, independiente de la UPF, realizado como doctorando.",
      en: "Principal Investigator of the policy brief \"Bringing all to the Table: How to Include Men in Combating Gender Inequalities,\" presented at the OSCE (Hofburg Palace) and the UN Vienna International Centre — an independent project, not run through UPF, done as a PhD candidate.",
      cat: "Principal Investigator del policy brief «Bringing all to the Table: How to Include Men in Combating Gender Inequalities», presentat a l'OSCE (Palau de Hofburg) i la seu de l'ONU a Viena — projecte propi, independent de la UPF, fet com a doctorand." } },

    { s: "redglobal", t: "s6", v: 1, note: {
      es: "Coordina el diseño y lanzamiento de un formulario digital para renovar la base de datos de socios.",
      en: "Coordinated the design and rollout of a new digital form to renew the member database.",
      cat: "Coordina el disseny i llançament d'un formulari digital per renovar la base de dades de socis." } },
    { s: "redglobal", t: "s7", v: 1, note: {
      es: "Organiza y facilita foros virtuales internacionales entre México y España, coordinando husos horarios.",
      en: "Organized and facilitated international virtual forums between Mexico and Spain, coordinating across time zones.",
      cat: "Organitza i facilita fòrums virtuals internacionals entre Mèxic i Espanya, coordinant husos horaris." } },

    { s: "spado", t: "s7", v: 1, note: {
      es: "Coordinó una campaña de prevención de adicciones para 300 adolescentes en Guadalajara (talleres, ferias urbanas, actividades culturales y deportivas) — rol de inicio de carrera, 2014.",
      en: "Coordinated a drug-prevention campaign reaching 300 adolescents in Guadalajara (workshops, urban fairs, cultural and sports activities) — early-career role, 2014.",
      cat: "Va coordinar una campanya de prevenció d'addiccions per a 300 adolescents a Guadalajara (tallers, fires urbanes, activitats culturals i esportives) — rol d'inici de carrera, 2014." } }
  ]
};
