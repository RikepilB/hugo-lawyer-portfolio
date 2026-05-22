export type SubService = {
  slug: string;
  title: string;
  description: string;
};

export type Specialization = {
  slug: string;
  title: string;
  description: string;
  fee: string;
  items: SubService[];
};

export type NavLink = {
  href: string;
  label: string;
};

export const site = {
  lawyer: {
    name: "Dr. Wilfredo Hugo Sánchez",
    title: "Especialista en Litigios Civiles, Derecho Inmobiliario y Defensa Constitucional",
    calRegistration: "Registro CAL N.° 31027",
    tagline: "Más de 20 años de trayectoria en litigios civiles e inmobiliarios",
    intro:
      "Más de 20 años de experiencia en litigios civiles, derecho inmobiliario y defensa " +
      "constitucional. Ex Especialista Legal del Poder Judicial. Resultados favorables ante " +
      "el Tribunal Constitucional, la Corte Suprema y las Cortes Superiores de Lima.",
  },
  about: {
    headline: "Trayectoria y excelencia al servicio del derecho",
    paragraphs: [
      "Con más de 20 años de trayectoria en el ejercicio del derecho, el Dr. Wilfredo " +
      "Hugo Sánchez es un referente en la resolución y defensa de litigios judiciales " +
      "complejos en el Perú. Su práctica se centra en el Derecho Civil e Inmobiliario, " +
      "abarcando la asesoría estratégica y el patrocinio eficaz en procesos de alta " +
      "exigencia técnica como Mejor Derecho de Propiedad, Reivindicación, Desalojo y " +
      "Ejecución de Garantías Inmobiliarias.",
      "Su experiencia se complementa con un dominio experto del mercado de subastas y " +
      "remates judiciales, brindando a sus clientes la seguridad jurídica necesaria para " +
      "la adquisición y recuperación de activos de manera óptima.",
      "La solidez de su práctica legal se asienta en una perspectiva integral del sistema " +
      "de justicia: habiéndose desempeñado como Especialista Legal en el Poder Judicial, " +
      "conoce a detalle la operatividad interna de los juzgados, lo que le permite " +
      "estructurar estrategias procesales con un alto índice de predictibilidad y éxito.",
      "A lo largo de su carrera, ha obtenido notables resoluciones favorables ante las " +
      "máximas instancias jurisdiccionales del país, incluyendo el Tribunal Constitucional, " +
      "la Corte Suprema de Justicia, así como las Cortes Superiores y Juzgados " +
      "Especializados, principalmente en el distrito judicial de Lima.",
      "El Dr. Hugo Sánchez combina el rigor académico, la destreza litigiosa y el " +
      "compromiso ético para ofrecer una defensa legal de vanguardia, orientada a proteger " +
      "el patrimonio, los derechos reales y la libertad jurídica de ciudadanos y empresas.",
    ],
    credentials: [
      "Más de 20 años de ejercicio profesional",
      "Ex Especialista Legal del Poder Judicial",
      "Registro CAL N.° 31027",
      "Resoluciones favorables ante el Tribunal Constitucional",
      "Resoluciones favorables ante la Corte Suprema de Justicia",
      "Estudio jurídico en San Isidro, Lima",
    ],
  },
  specializations: [
    {
      slug: "litigios-civiles",
      title: "Litigios Civiles e Inmobiliarios",
      description:
        "Especialización en litigios civiles e inmobiliarios con más de 20 años de " +
        "trayectoria. Estrategia procesal rigurosa, asesoría estratégica y patrocinio " +
        "eficaz en procesos de alta exigencia técnica.",
      fee: "Consultar honorarios",
      items: [
        {
          slug: "mejor-derecho-propiedad",
          title: "Mejor Derecho de Propiedad",
          description:
            "Defensa y declaración judicial del mejor derecho de propiedad sobre bienes " +
            "inmuebles. Análisis registral exhaustivo y estrategia procesal orientada a " +
            "la tutela efectiva de su derecho.",
        },
        {
          slug: "reivindicacion",
          title: "Reivindicación",
          description:
            "Acción reivindicatoria para la restitución de la posesión legítima de bienes " +
            "inmuebles. Recuperación judicial de la propiedad frente a poseedores no autorizados.",
        },
        {
          slug: "desalojo",
          title: "Desalojo",
          description:
            "Procesos de desalojo por ocupación precaria, vencimiento de contrato u otras " +
            "causales. Representación eficaz para la restitución del inmueble.",
        },
        {
          slug: "ejecucion-garantias",
          title: "Ejecución de Garantías Inmobiliarias",
          description:
            "Ejecución judicial de garantías reales (hipotecas, prendas). Procedimientos " +
            "expeditos para la realización del valor del bien y la satisfacción del crédito " +
            "garantizado.",
        },
      ],
    },
    {
      slug: "subastas-remates",
      title: "Subastas y Remates Judiciales",
      description:
        "Asesoría integral en subastas y remates judiciales. Seguridad jurídica para la " +
        "adquisición y recuperación de activos inmobiliarios de manera óptima.",
      fee: "Consultar honorarios",
      items: [
        {
          slug: "participacion-subastas",
          title: "Participación en Subastas Judiciales",
          description:
            "Asesoramiento completo para participar en subastas judiciales de inmuebles. " +
            "Debida diligencia registral y judicial, estrategia de postura y formalización " +
            "de la adjudicación.",
        },
        {
          slug: "recuperacion-activos",
          title: "Recuperación de Activos",
          description:
            "Estrategias legales para la recuperación de activos mediante mecanismos de " +
            "subasta y remate. Protección del patrimonio frente a ejecuciones forzosas.",
        },
      ],
    },
    {
      slug: "defensa-constitucional",
      title: "Defensa Constitucional",
      description:
        "Defensa ante las máximas instancias jurisdiccionales del país. Litigio estratégico " +
        "con alto índice de predictibilidad basado en el conocimiento profundo del sistema " +
        "judicial peruano.",
      fee: "Consultar honorarios",
      items: [
        {
          slug: "tribunal-constitucional",
          title: "Recursos ante el Tribunal Constitucional",
          description:
            "Procesos de amparo, habeas corpus y acciones de inconstitucionalidad. Defensa " +
            "de derechos fundamentales ante la máxima instancia constitucional del país.",
        },
        {
          slug: "corte-suprema",
          title: "Procesos ante la Corte Suprema",
          description:
            "Recursos de casación y demás medios impugnatorios ante la Corte Suprema de " +
            "Justicia. Argumentación jurídica rigurosa para la correcta aplicación del derecho.",
        },
        {
          slug: "cortes-superiores",
          title: "Litigios en Cortes Superiores y Juzgados Especializados",
          description:
            "Representación en procesos civiles, comerciales y constitucionales ante Cortes " +
            "Superiores y Juzgados Especializados del distrito judicial de Lima.",
        },
      ],
    },
  ] satisfies Specialization[],
  contact: {
    headline: "Reserve su consulta",
    intro:
      "Agende una reunión virtual o presencial seleccionando un horario disponible. " +
      "Recibirá confirmación inmediata por correo electrónico.",
    email: "contacto@ejemplo.com",
    phone: "+51 977 767 484",
    address: "Milanos 310, San Isidro — Lima, Perú",
    linkedin: "",
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/sobre-mi", label: "Sobre Mí" },
    { href: "/servicios", label: "Servicios" },
    { href: "/contacto", label: "Contacto" },
  ] satisfies NavLink[],
  cal: {
    username: process.env.NEXT_PUBLIC_CAL_USERNAME ?? "richard-pillaca-mqty24",
    eventSlug: process.env.NEXT_PUBLIC_CAL_EVENT_SLUG ?? "30min",
  },
} as const;
