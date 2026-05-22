export type Service = {
  slug: "consultas" | "demandas" | "procesos" | "asesorias";
  title: string;
  description: string;
  fee: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export const site = {
  lawyer: {
    name: "Dr. Wilfredo Hugo Sanchez",
    title: "Abogado",
    tagline: "Asesoría Legal Profesional",
    intro:
      "Más de veinte años acompañando a personas y empresas en asuntos civiles, " +
      "comerciales y administrativos. Atención cercana, criterio riguroso y " +
      "resultados defendibles.",
  },
  about: {
    headline: "Una práctica jurídica al servicio de las personas",
    paragraphs: [
      "Soy abogado con más de veinte años de ejercicio profesional en Lima, " +
      "con especialización en derecho civil y comercial. Mi práctica se centra " +
      "en la defensa de los intereses de mis clientes con discreción y rigor técnico.",
      "He representado a personas naturales y pequeñas empresas en litigios, " +
      "negociaciones contractuales y procedimientos administrativos. Cada caso " +
      "recibe atención personalizada y un plan jurídico claro desde la primera reunión.",
    ],
    credentials: [
      "Más de 20 años de ejercicio profesional",
      "Especialización en derecho civil y comercial",
      "Estudio jurídico en San Isidro, Lima",
    ],
  },
  services: [
    {
      slug: "consultas",
      title: "Consultas",
      description:
        "Reuniones de orientación legal para evaluar su situación, identificar " +
        "riesgos y definir un plan de acción. Diagnóstico claro y recomendaciones " +
        "prácticas sin compromiso de continuidad.",
      fee: "Desde USD 60 / consulta",
    },
    {
      slug: "demandas",
      title: "Demandas",
      description:
        "Preparación, presentación y seguimiento de demandas civiles, comerciales " +
        "y laborales. Redacción rigurosa, estrategia procesal y representación " +
        "ante los tribunales competentes.",
      fee: "Consultar honorarios",
    },
    {
      slug: "procesos",
      title: "Procesos",
      description:
        "Acompañamiento integral en procesos judiciales y administrativos en curso. " +
        "Audiencias, escritos, pruebas y recursos, con informes periódicos del estado " +
        "del expediente.",
      fee: "Consultar honorarios",
    },
    {
      slug: "asesorias",
      title: "Asesorías",
      description:
        "Asesoramiento permanente para personas y pequeñas empresas. Revisión de " +
        "contratos, prevención de litigios y respuesta rápida ante requerimientos " +
        "legales del día a día.",
      fee: "Plan mensual desde USD 150",
    },
  ] satisfies Service[],
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
