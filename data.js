/*
 * DATOS DEL DIAGRAMA — edita solo este archivo para actualizar el contenido.
 * app.js lee estos datos y dibuja el diagrama; nunca necesitas tocar app.js
 * para cambiar textos, valores o agregar/quitar trabajos, áreas o habilidades.
 *
 * Estructura, de izquierda a derecha en el diagrama:
 *   orgs (trabajos y proyectos) -> pillars (las 4 áreas) -> skills (habilidades)
 *
 * "value" en orgLinks es el NÚMERO DE LOGROS REALES del CV que sostienen esa
 * conexión (no un número inventado) — controla el grosor de la cinta.
 * "note" es el texto que aparece en el tooltip al pasar el cursor.
 */

window.SANKEY_DATA = {

  // Colores por área. Los valores hex reales están en style.css (--inv, --com,
  // --ges, --doc); aquí solo se referencian para que cada área tenga su color.
  pcolor: { inv: "var(--inv)", com: "var(--com)", ges: "var(--ges)", doc: "var(--doc)" },

  // Las 4 áreas de trabajo (columna del centro).
  pillars: [
    { id: "inv", label: "Investigación", full: "Investigación y análisis de políticas públicas",
      fact: "Tesis depositada sept. 2026 · defensa dic. 2026 (UPF)." },
    { id: "com", label: "Comunicación",  full: "Comunicación estratégica",
      fact: "De redes comunitarias a comunicación institucional." },
    { id: "ges", label: "Gestión",       full: "Gestión de programas y alianzas",
      fact: "PM4R (BID) · 4 niveles certificados." },
    { id: "doc", label: "Docencia",      full: "Docencia y traducción de conocimiento complejo",
      fact: "145+ estudiantes en 3 idiomas, entre UPF y Tec de Monterrey." }
  ],

  // Trabajos y proyectos reales (columna de la izquierda). "id" se usa para
  // conectar con orgLinks más abajo — si agregas uno nuevo, dale un id corto
  // y único (sin espacios) y úsalo en las conexiones que quieras crear.
  orgs: [
    { id: "upf",       label: "UPF",                 full: "Universitat Pompeu Fabra — PhD Candidate" },
    { id: "tec",       label: "Tec de Monterrey",     full: "Tecnológico de Monterrey — Area Coordinator & Adjunct Professor" },
    { id: "colmenas",  label: "Colmenas de Zapopan",  full: "Colmenas de Zapopan — Zapopan City Council" },
    { id: "ethos",     label: "Ethos Lab",            full: "Ethos Laboratory of Public Policies — Policy Analysis Intern" },
    { id: "interarts", label: "Interarts Foundation", full: "Interarts Foundation, Barcelona — Comms Intern" },
    { id: "techo",     label: "TECHO México",         full: "TECHO México — voluntariado, 4 años" },
    { id: "raun",      label: "RA-UN / OSCE",         full: "RA-UN / OSCE — Principal Investigator, fellowship de investigación (voluntario, independiente de la UPF)" },
    { id: "redglobal", label: "Red Global MX",        full: "Red Global MX, Capítulo Barcelona — voluntariado, 2025–presente" },
    { id: "spado",     label: "SPADO Consulting",     full: "SPADO Consulting, Guadalajara — Logistics Operator, 2014 (rol de inicio de carrera)" }
  ],

  // Habilidades / patrones (columna de la derecha). "pillar" dice a qué área
  // pertenece cada una (debe ser uno de los id de "pillars" arriba).
  skills: [
    { id: "s1", short: "Investigación de campo",    full: "Investigación cualitativa y de campo",                      pillar: "inv" },
    { id: "s2", short: "Políticas públicas",        full: "Análisis y redacción de políticas públicas",                pillar: "inv" },
    { id: "s3", short: "Comunicación digital",      full: "Comunicación digital y de contenidos",                      pillar: "com" },
    { id: "s4", short: "Comunicación institucional",full: "Comunicación institucional y relaciones con actores clave", pillar: "com" },
    { id: "s5", short: "Alianzas y partnerships",   full: "Gestión de alianzas y partnerships",                        pillar: "ges" },
    { id: "s6", short: "Equipos y voluntariado",    full: "Gestión de equipos y voluntariado",                         pillar: "ges" },
    { id: "s7", short: "Programas y eventos",       full: "Gestión de programas y eventos",                            pillar: "ges" },
    { id: "s8", short: "Docencia universitaria",    full: "Docencia universitaria multilingüe",                        pillar: "doc" },
    { id: "s9", short: "Formación y talleres",      full: "Diseño de formación y talleres",                            pillar: "doc" }
  ],

  // Conexiones trabajo -> habilidad. "s" = id del trabajo (de "orgs"),
  // "t" = id de la habilidad (de "skills"), "v" = número de logros reales
  // que la sostienen, "note" = texto del tooltip.
  orgLinks: [
    { s: "upf",       t: "s1", v: 1, note: "Investigación doctoral sobre perspectivas decoloniales aplicadas a la comunicación para el desarrollo." },
    { s: "upf",       t: "s3", v: 1, note: "Lidera la comunicación digital del grupo de investigación (newsletter, buzón institucional, web en Liferay)." },
    { s: "upf",       t: "s7", v: 1, note: "Planifica de principio a fin 30+ seminarios híbridos de investigación (Zoom, Eventum)." },
    { s: "upf",       t: "s8", v: 1, note: "Imparte dos cursos de grado en tres idiomas (ES/CAT/EN) a 85 estudiantes." },

    { s: "tec",       t: "s5", v: 2, note: "Mentoría de 20+ proyectos de innovación social con Ashoka, Hult Prize, TECHO, Colmenas y Aldea Arcoiris; alianzas con ONGs y organizaciones locales." },
    { s: "tec",       t: "s7", v: 2, note: "Diseño y transferencia de liderazgo de Changemaker Fest 2022; comunicación y promoción de eventos como Hult Prize (+85% de enganche)." },
    { s: "tec",       t: "s3", v: 1, note: "Creación de contenido estratégico y colaboración con partners en plataformas digitales." },
    { s: "tec",       t: "s8", v: 1, note: "Diseña e imparte tres cursos de grado a 60+ estudiantes (Conflicto y Negociación, Diversidad, Teorías del Desarrollo)." },

    { s: "colmenas",  t: "s1", v: 1, note: "Codiseña un estudio de caso académico con el Tec de Monterrey sobre intervención comunitaria." },
    { s: "colmenas",  t: "s3", v: 2, note: "Crecimiento de comunidad en redes de 200 a 3,000 seguidores en 8 meses (+45% asistencia a talleres); lanza y mantiene el sitio WordPress de la organización." },
    { s: "colmenas",  t: "s4", v: 2, note: "Aumenta la visibilidad del centro comunitario con una estrategia de comunicación; estandariza protocolos de comunicación entre centros." },
    { s: "colmenas",  t: "s5", v: 2, note: "3 alianzas formales entre sectores público, privado y académico; diseña oportunidades de servicio con la Oficina de Servicio Social del Tec de Monterrey." },
    { s: "colmenas",  t: "s6", v: 2, note: "Gestiona un promedio de 10 becarios por semestre, más una beca federal (Jóvenes Construyendo el Futuro); diseña manuales operativos y capacita al equipo." },
    { s: "colmenas",  t: "s9", v: 1, note: "Diseña e imparte talleres de alfabetización digital para mujeres, jóvenes y niños." },

    { s: "ethos",     t: "s2", v: 3, note: "Analiza marcos de política pública (Presupuesto Basado en Resultados, Sistema de Evaluación del Desempeño, Programa de Mejora de la Gestión); produce recomendaciones accionables y traduce el análisis técnico para públicos no expertos." },

    { s: "interarts", t: "s3", v: 2, note: "Estrategia digital y perfil de LinkedIn de la fundación; codiseña el nuevo sitio web." },
    { s: "interarts", t: "s4", v: 1, note: "Colabora en campañas internacionales, fortaleciendo la comunicación intercultural y la relación con actores clave." },
    { s: "interarts", t: "s5", v: 1, note: "Construye un repositorio europeo de proyectos, centralizando recursos para 100+ organizaciones socias." },

    { s: "techo",     t: "s1", v: 2, note: "Diseña y lidera una metodología de investigación cualitativa de campo, ampliando la cobertura de 4 a 16 asentamientos; los hallazgos alimentan campañas nacionales de incidencia." },
    { s: "techo",     t: "s4", v: 2, note: "Gestiona canales sociales y de comunicación alineados con campañas nacionales de incidencia; fortalece la presencia en medios." },
    { s: "techo",     t: "s6", v: 2, note: "Coordina equipos de comunicación y equipos multidisciplinarios de voluntariado durante los 4 años de colaboración." },
    { s: "techo",     t: "s9", v: 1, note: "Redacta materiales de formación en incidencia usados por cientos de voluntarios." },

    { s: "raun",      t: "s2", v: 1, note: "Principal Investigator del policy brief «Bringing all to the Table: How to Include Men in Combating Gender Inequalities», presentado en la OSCE (Palacio de Hofburgo) y la sede de la ONU en Viena — proyecto propio, independiente de la UPF, realizado como doctorando." },

    { s: "redglobal", t: "s6", v: 1, note: "Coordina el diseño y lanzamiento de un formulario digital para renovar la base de datos de socios." },
    { s: "redglobal", t: "s7", v: 1, note: "Organiza y facilita foros virtuales internacionales entre México y España, coordinando husos horarios." },

    { s: "spado",     t: "s7", v: 1, note: "Coordinó una campaña de prevención de adicciones para 300 adolescentes en Guadalajara (talleres, ferias urbanas, actividades culturales y deportivas) — rol de inicio de carrera, 2014." }
  ]
};
