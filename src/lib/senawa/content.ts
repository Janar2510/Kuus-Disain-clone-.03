export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/process" },
  { label: "Elements", href: "/elements" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/process" },
  { label: "Elements", href: "/elements" },
  { label: "Services", href: "/services" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
];

export const studio = {
  email: "contact.senawastudio@gmail.com",
  phone: "+62 812 1354 7006",
  phoneHref: "tel:+6281213547006",
  instagram: "https://www.instagram.com/senawa.studio/",
  location: "BSD, Tangerang Selatan",
  hours: ["Monday to Friday", "10.00 to 18.00 WIB"],
};

export type TeamMember = {
  name: string;
  role: string[];
  mask: string;
  ratio: string;
  bio?: string[];
};

export const team: TeamMember[] = [
  {
    name: "Enrico Melvin",
    role: ["Principal", "Creative Director"],
    mask: "/sites/senawa/studio/1fc7de23-af47-4e3e-841e-3cfc1bea0235.png",
    ratio: "278 / 309",
    bio: [
      "Enrico Melvin is the Principal and Creative Director of Senawa Studio. He began his career in architecture and interior design in 2017, working as a Junior Designer at KIAT Architect while also collaborating on various architectural visualization projects. In 2018 he established his own design practice, which later evolved into Senawa Studio in 2025. To broaden his creative perspective, he pursued a Master’s Degree in Communication Design at Northumbria University.",
      "Enrico believes that architecture should create a meaningful connection between people and space. His approach focuses on understanding the needs of its users, creating environments that are functional, timeless, and grounded in their context. Through Senawa Studio he continues to explore the relationship between people, space, and materiality, guided by the philosophy of one breath and one soul.",
    ],
  },
  {
    name: "Sophia Ivana Satya",
    role: ["Client Relations", "Managing Director"],
    mask: "/sites/senawa/studio/b405e2fc-0d7b-4bfe-afc8-876beec340fb.png",
    ratio: "165 / 351",
  },
  {
    name: "Yoyok Kiswanto",
    role: ["Project", "Manager"],
    mask: "/sites/senawa/studio/8d3a088e-7432-48c7-aa37-2ea94ed4d199.png",
    ratio: "136 / 368",
  },
  {
    name: "Tri Indah",
    role: ["Head", "Drafter"],
    mask: "/sites/senawa/studio/f95b56b8-be9a-474b-b6a2-d937d69ab7d3.png",
    ratio: "156 / 368",
  },
  {
    name: "Vania",
    role: ["Head", "Architect"],
    mask: "/sites/senawa/studio/51d70ff7-6177-4b36-86c8-ffa0250eb5f3.png",
    ratio: "183 / 330",
  },
  {
    name: "Farah Salsa",
    role: ["Interior", "Designer"],
    mask: "/sites/senawa/studio/40328124-f31c-4748-b04d-e0d53268e309.png",
    ratio: "102 / 366",
  },
  {
    name: "Fiky",
    role: ["Interior", "Designer"],
    mask: "/sites/senawa/studio/1fa55467-ebbb-4fd7-9d3f-5726b6095296.png",
    ratio: "298 / 369",
  },
  {
    name: "Falih",
    role: ["Junior", "Architect"],
    mask: "/sites/senawa/studio/e16ae298-ef41-4a6d-8a3b-d841752819dd.png",
    ratio: "201 / 375",
  },
  {
    name: "Falah",
    role: ["Junior", "Drafter"],
    mask: "/sites/senawa/studio/40328124-f31c-4748-b04d-e0d53268e309.png",
    ratio: "102 / 366",
  },
];

export type ProcessPhase = {
  phase: string;
  name: string;
  blurb: string;
  steps: { num: string; title: string; body: string; part: string }[];
};

export const processPhases: ProcessPhase[] = [
  {
    phase: "Phase 01",
    name: "Getting started",
    blurb:
      "We get to know you, your site, and what you are hoping for, then put it all down in plain language before anything begins.",
    steps: [
      {
        num: "01",
        title: "Discovery conversation",
        body: "We meet, in the studio or over a call, to understand how you live, what your site is like, where your budget sits, and what you are hoping for.",
        part: "Share the vision",
      },
      {
        num: "02",
        title: "Proposal and agreement",
        body: "We set out the scope, the stages, the fees, and the timeline in language anyone can follow. Nothing starts until you have read it over and feel comfortable saying yes.",
        part: "Read it over, ask anything",
      },
    ],
  },
  {
    phase: "Phase 02",
    name: "Design",
    blurb:
      "The idea takes shape on paper first, then in three dimensions, so you can see and feel it long before it is built.",
    steps: [
      {
        num: "03",
        title: "Concept design",
        body: "The first sketches arrive, along with the thinking that holds it all together: how the building sits on its site, how the light moves through it, and how you live inside it.",
        part: "Take in the big idea",
      },
      {
        num: "04",
        title: "Design development",
        body: "We refine the materials, the proportions, and the small details, and bring everything to life in 3D so you can see and feel the space well before anyone breaks ground.",
        part: "React, and help us refine",
      },
    ],
  },
  {
    phase: "Phase 03",
    name: "Delivery",
    blurb:
      "We handle the documents and stay close to the build, all the way through to handover.",
    steps: [
      {
        num: "05",
        title: "Technical drawings and permits",
        body: "We prepare the detailed documentation that approvals and builders rely on. The drawings, the permit submissions, the paperwork: we take care of all of it so you do not have to.",
        part: "Leave it with us",
      },
      {
        num: "06",
        title: "Construction and handover",
        body: "We stay close through the build, visiting the site and keeping watch over the work, right up to the day the keys change hands and the space finally becomes yours.",
        part: "Watch it come to life",
      },
    ],
  },
];

export type ElementEntry = {
  name: string;
  description: string;
  refs: { slug: string; title: string }[];
  crop: { left: string; top: string };
  markers: { left: string; top: string };
  images: string[];
  tall?: boolean;
};

export const elements: ElementEntry[] = [
  {
    name: "skylight",
    description:
      "Light brought from above. A roof aperture pulls the sky into the plan and moves across the walls through the day, turning a stair or a corridor into a lantern.",
    crop: { left: "53.83%", top: "29.19%" },
    markers: { left: "50%", top: "24.125%" },
    images: [
      "/sites/senawa/work/aa-house/00.jpg",
      "/sites/senawa/work/aa-house/02.jpg",
      "/sites/senawa/work/aa-house/04.jpg",
      "/sites/senawa/work/aa-house/06.jpg",
    ],
    refs: [
      { slug: "aa-house", title: "AA House" },
      { slug: "nsb-ps", title: "NSB PS" },
      { slug: "am-house", title: "AM House" },
    ],
  },
  {
    name: "edge",
    description:
      "The line where one thing becomes another: a roof meeting the sky, a floor meeting a garden, the shadow gap between two materials. We design the edge as the place a building is read.",
    crop: { left: "76.83%", top: "39.32%" },
    markers: { left: "80.67%", top: "34.25%" },
    images: [
      "/sites/senawa/work/nsb-ps/00.jpg",
      "/sites/senawa/work/nsb-ps/02.jpg",
      "/sites/senawa/work/nsb-ps/04.jpg",
      "/sites/senawa/work/nsb-ps/06.jpg",
      "/sites/senawa/work/nsb-ps/08.jpg",
    ],
    refs: [
      { slug: "nsb-ps", title: "NSB PS" },
      { slug: "aa-house", title: "AA House" },
      { slug: "hy-house", title: "HY House" },
      { slug: "am-house", title: "AM House" },
      { slug: "tv-house", title: "TV House" },
    ],
  },
  {
    name: "roster",
    description:
      "A perforated screen of brick or block that filters light and air. The roster layers privacy while letting the house breathe in the tropical climate.",
    crop: { left: "69.17%", top: "69.69%" },
    markers: { left: "65.33%", top: "64.625%" },
    images: [
      "/sites/senawa/work/am-house/00.jpg",
      "/sites/senawa/work/am-house/02.jpg",
      "/sites/senawa/work/am-house/04.jpg",
      "/sites/senawa/work/am-house/05.jpg",
    ],
    refs: [
      { slug: "am-house", title: "AM House" },
      { slug: "aa-house", title: "AA House" },
    ],
  },
  {
    name: "inner courtyard",
    description:
      "A room without a roof at the heart of the plan, organising the house around light and air. In the tropics, the courtyard is where daily life gathers.",
    crop: { left: "38.5%", top: "59.56%" },
    markers: { left: "34.67%", top: "54.5%" },
    images: [
      "/sites/senawa/work/aa-house/01.jpg",
      "/sites/senawa/work/aa-house/03.jpg",
      "/sites/senawa/work/aa-house/05.jpg",
      "/sites/senawa/work/aa-house/07.jpg",
      "/sites/senawa/work/aa-house/09.jpg",
      "/sites/senawa/work/aa-house/11.jpg",
    ],
    refs: [
      { slug: "aa-house", title: "AA House" },
      { slug: "am-house", title: "AM House" },
    ],
  },
  {
    name: "wood",
    description:
      "Solid timber as structure, surface, and warmth. Oak, teak, and shingle bring texture and age into the work, grounding each room in something tactile.",
    crop: { left: "23.17%", top: "79.81%" },
    markers: { left: "19.33%", top: "74.75%" },
    images: [
      "/sites/senawa/work/louver-house/00.jpg",
      "/sites/senawa/work/louver-house/02.jpg",
      "/sites/senawa/work/tv-house/00.jpg",
      "/sites/senawa/work/tv-house/02.jpg",
      "/sites/senawa/work/k-villa/00.jpg",
    ],
    refs: [
      { slug: "am-house", title: "AM House" },
      { slug: "aa-house", title: "AA House" },
      { slug: "tv-house", title: "TV House" },
      { slug: "louver-house", title: "Louver House" },
    ],
  },
];

export const services = [
  {
    title: "Architecture",
    body: "Buildings designed from the ground up, shaped by their site, climate, and the way they will be used. Houses, primarily, alongside commercial work.",
  },
  {
    title: "Interior",
    body: "Interiors developed with the architecture or on their own, built around light, proportion, and a restrained material palette.",
  },
  {
    title: "Furniture Design",
    body: "Furniture designed for specific spaces and often built into them, made to last.",
  },
];

export const faqs = [
  {
    q: "What does Senawa do?",
    a: "Senawa is an architecture, interior, and furniture design studio. We design private houses, apartments, retail spaces, and villas, and carry a project from the first conversation through construction to handover.",
  },
  {
    q: "Where is the studio based, and which areas do you serve?",
    a: "The studio is based in BSD, Tangerang Selatan, in the Greater Jakarta area, and meets by appointment. Our work spans Jakarta, Tangerang, Depok, and Bogor, and reaches as far as Ubud, Bali.",
  },
  {
    q: "What kinds of projects do you take on?",
    a: "Mostly residential: new houses, renovations, and apartment interiors. We also take on selected commercial work, such as retail and boutique spaces.",
  },
  {
    q: "How does a project start?",
    a: "Send a note through the form or email contact.senawastudio@gmail.com. It begins with a conversation about your site, how you live, and what you are hoping for. From there the project moves through six steps, from the first meeting to the day the keys are in your hand.",
  },
  {
    q: "How quickly do you reply?",
    a: "Every enquiry is read personally by one of us, and we reply within a couple of days.",
  },
];

export const selectOptions = {
  propertyType: [
    "New house",
    "Renovation",
    "Apartment interior",
    "Villa",
    "Commercial / retail",
  ],
  scope: ["Architecture", "Interior", "Furniture", "Architecture and interior"],
  budget: [
    "Under Rp 1 billion",
    "Rp 1–3 billion",
    "Rp 3–6 billion",
    "Above Rp 6 billion",
    "Not sure yet",
  ],
};
