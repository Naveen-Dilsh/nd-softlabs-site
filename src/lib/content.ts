export const site = {
  name: "ND Softlabs",
  owner: "Naveen Kavindu Dilshan",
  /** Browser tab title and the description Google shows for the home page. */
  title: "ND Softlabs — Modern Software for Your Needs",
  description:
    "ND Softlabs is a small software studio by Naveen Kavindu Dilshan. We build websites, mobile apps, AI automation tools and custom software.",
  email: "naveenkavinduofficial@gmail.com",
  whatsapp: "https://wa.me/94778925859",
  booking: "/contact",
};

// Same order as the template's dropdown. The template also lists "Careers"
// (a job-listings page); leave it out until there is a page for it.
/** Top bar links. "Services" opens the dropdown below instead of linking. */
export const nav = {
  links: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "" },
    { label: "Pricing", href: "/#pricing" },
  ],
  cta: { label: "Start a project", href: "/contact" },
  /** Icons are 24px stroke paths, drawn at 18px. */
  services: [
    {
      label: "Websites",
      blurb: "Fast, responsive sites that look sharp on every screen.",
      href: "/contact",
      icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z",
    },
    {
      label: "Custom Software",
      blurb: "Web apps and systems built around how your business works.",
      href: "/contact",
      icon: "m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
    },
    {
      label: "Mobile Apps",
      blurb: "One codebase for iOS and Android, ready for the stores.",
      href: "/contact",
      icon: "M9.5 2.5h5A2.5 2.5 0 0 1 17 5v14a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 7 19V5a2.5 2.5 0 0 1 2.5-2.5ZM11 18.5h2",
    },
    {
      label: "AI Automation",
      blurb: "Chatbots, agents and workflows that take the busywork off.",
      href: "/contact",
      icon: "M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9ZM19 3v3M17.5 4.5h3M5 17v3M3.5 18.5h3",
    },
  ],
  /** Quick links along the bottom of the dropdown and the mobile menu. */
  extras: [
    { label: "All services", href: "/#services" },
    { label: "How it works", href: "/#process" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],
};

/**
 * "What We Build" service list. Hovering a row with a mouse floats a preview
 * card beside the pointer: `image` shows a screenshot captioned `host`;
 * without one the card shows `label` on a soft gradient instead.
 */
export const services = {
  eyebrow: "Our Services",
  heading: ["What We Build" ] as [string],
  cta: "Discuss your project",
  items: [
    {
      title: "Websites",
      blurb: "Fast, responsive websites that look sharp on every screen and are easy for you to update.",
      href: "/contact",
      image: "/img/naveen-portfolio.webp",
      host: "Naveen Portfolio",
      label: "Websites",
    },
    {
      title: "Custom Software & Web Apps",
      blurb: "Secure, scalable systems built around how your business actually works.",
      href: "/contact",
      image: "/img/laxshman-home.webp",
      host: "Laxshman Auto Parts",
      label: "Custom Software",
    },
    {
      title: "Mobile Apps",
      blurb: "One codebase for iOS and Android, so you reach every customer for less.",
      href: "/contact",
      image: "",
      host: "",
      label: "iOS + Android",
    },
    {
      title: "AI Automation",
      blurb: "Chatbots, agents and smart workflows that take the busywork off your plate.",
      href: "/contact",
      image: "",
      host: "",
      label: "AI Automation",
    },
    {
      title: "UI/UX Design",
      blurb: "Clean, simple interfaces your customers understand at a glance.",
      href: "/contact",
      image: "/img/epencil-home.webp",
      host: "ePencil Academy",
      label: "UI/UX Design",
    },
    {
      title: "Maintenance & Support",
      blurb: "Updates, fixes, backups and monitoring, so your product keeps running smoothly.",
      href: "/contact",
      image: "",
      host: "",
      label: "Always on",
    },
  ],
};

export const hero = {
  badge: { text: "Open for New Projects", action: "Let’s Talk" },
  /**
   * The headline reads "{lead} [card] {leadMuted} / {joiner} [card] {tail}".
   * Bold words are black, muted ones 50% grey. Keep each part short: the
   * layout relies on the line breaking after the first card's word.
   */
  headline: {
    lead: "Modern",
    leadMuted: "Software",
    joiner: "for",
    tail: "Your Needs",
  },
  subtitle:
    "We build websites, apps, AI tools and any custom software, and take the busywork off your plate.",
  cta: "Start a Project",
  trustLabel: "Trusted by Clients",
  /** Client logos, as round badges. */
  avatars: ["/img/logo-epencil.png", "/img/logo-laxshman.png"],
  // The two inline cards that sit inside the headline and cycle images
  cardA: ["/img/epencil-home.webp", "/img/laxshman-home.webp"],
  cardB: ["/img/naveen-portfolio.webp", "/img/epencil-home.webp"],
};

export const showcase = {
  cta: "See Recent Work",
  columnA: [
    "/img/epencil-home.webp",
    "/img/naveen-portfolio.webp",
    "/img/laxshman-home.webp",
  ],
  columnB: [
    "/img/laxshman-home.webp",
    "/img/epencil-home.webp",
    "/img/naveen-portfolio.webp",
  ],
};

export const statement = {
  eyebrow: "Hello!",
  text: "We turn your ideas into fast websites, mobile apps and smart AI tools that save you time and help your business grow",
  /**
   * Floating capability tags, all measured off the live site.
   *   pos: [top, x] per breakpoint (phone / 810+ / 1440+), in px relative to
   *        the text block; x is the tag's left edge measured from its centre.
   *        Phone and tablet positions are ours, sized to these labels: three
   *        rows of two under the text on phones, two rows of three from 810px
   *        (the template's tablet spots hung off both edges). Desktop is the
   *        template's.
   *   from / to: entrance start and resting state — [rotate°, x, y].
   */
  tags: [
    {
      label: "Websites",
      bg: "rgb(255,213,0)",
      fg: "rgb(102,0,128)",
      icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z",
      stroke: true,
      pos: { m: [366, 30], t: [213, -241], d: [250.4, 425.4] },
      from: [13, 150, 58],
      to: [4, 0, 0],
    },
    {
      label: "UI/UX",
      bg: "rgb(71,71,71)",
      fg: "rgb(186,255,208)",
      icon: "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H88V56H216V200Z",
      pos: { m: [310, -152], t: [305, -242], d: [171.2, -527] },
      from: [-7, -210, -33],
      to: [4, 0, -20],
    },
    {
      label: "Mobile Apps",
      bg: "rgb(255,69,171)",
      fg: "rgb(201,255,251)",
      icon: "M9.5 2.5h5A2.5 2.5 0 0 1 17 5v14a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 7 19V5a2.5 2.5 0 0 1 2.5-2.5ZM11 18.5h2",
      stroke: true,
      pos: { m: [310, -22], t: [233, -94], d: [171.2, 423.2] },
      from: [-10, 175, -43],
      to: [-4, 0, -20],
    },
    {
      label: "AI Automation",
      bg: "rgb(82,255,105)",
      fg: "rgb(50,36,255)",
      icon: "M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9ZM19 3v3M17.5 4.5h3M5 17v3M3.5 18.5h3",
      stroke: true,
      pos: { m: [214, 2], t: [213, 76], d: [51, 428] },
      from: [-19, 150, 2],
      to: [-5, 0, 0],
    },
    {
      label: "Custom Software",
      bg: "rgb(5,169,255)",
      fg: "rgb(248,255,191)",
      icon: "m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
      stroke: true,
      pos: { m: [366, -166], t: [285, -118], d: [250.4, -545] },
      from: [-25, -84, 46],
      to: [-4, 0, 0],
    },
    {
      label: "Maintenance",
      bg: "rgb(255,94,0)",
      fg: "rgb(255,243,194)",
      icon: "M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3ZM9 12l2 2 4-4",
      stroke: true,
      pos: { m: [214, -164], t: [285, 85], d: [62, -590] },
      from: [20, -182, -86],
      to: [3, 0, 0],
    },
  ],
};


export const process = {
  eyebrow: "How We Work",
  heading: "From idea to launch in 3 steps",
  steps: [
    {
      n: "1",
      title: "Free Call",
      body: "Tell us your idea in a free call. We'll ask the right questions and suggest the simplest way to build it.",
    },
    {
      n: "2",
      title: "Plan & Build",
      body: "You get a clear quote and timeline. We design and build it, showing you progress every week.",
    },
    {
      n: "3",
      title: "Launch & Support",
      body: "We test, launch and hand everything over, then stay on to fix, update and improve it.",
    },
  ],
};

/**
 * "What clients say": a rating card plus a rotating quote. The rating shown is
 * the average of `rating` (out of 5) across the items. These two reviews are
 * the template's placeholders: replace them with your own clients' words.
 */
/**
 * Client reviews. Each one is tied to its project (the card links to the case
 * study). A review with `approved: false` is a draft we wrote from the
 * project's brief: it shows in dev only and is left out of
 * production builds until the client has read it and said yes. Edit the
 * quote to the client's own words, then set `approved: true`.
 */
export const testimonials = {
  eyebrow: "Testimonials",
  heading: ["What clients say.", "In their own words."] as [string, string],
  items: [
    {
      name: "ePencil Academy",
      role: "Teacher, Grades 6–11",
      logo: "/img/logo-epencil.png",
      project: "epencil",
      image: "/img/epencil-home.webp",
      highlight: "Lessons, payments and live classes in one place",
      approved: true,
      quote:
        "I asked for a platform my students would actually enjoy, and that's what I got. I upload each month's lessons and they watch them right on the site, with no way to download them. Payments, ATM receipts, live class links and courier details are all in one place now, so I spend my time teaching instead of chasing records. The credits keep the kids coming back.",
    },
    {
      name: "Laxshman Auto Parts",
      role: "Japanese parts importer",
      logo: "/img/logo-laxshman.png",
      project: "laxshman-auto-parts",
      image: "/img/laxshman-home.webp",
      highlight: "Selling online with stock always up to date",
      approved: true,
      quote:
        "We import parts from Japan and needed to sell them online without losing track of stock. Now customers find the right part on their phone and order straight on WhatsApp, and we update stock in a few clicks. The site looks premium, which matters when people are trusting you with genuine parts for their car.",
    },
  ],
};

/**
 * Projects, as on the live site. Each one lists on the home page (#work) and
 * gets its own page at /work/<slug>; the "More Projects" strip at the foot of
 * a project page shows the first two other projects.
 */
export type Project = {
  slug: string;
  title: string;
  tags: string[];
  /** The filter group on the "All projects" grid, e.g. "Website". */
  category: string;
  year: string;
  /** Card image on the home page, and the cover on the project page (unless it has a video). */
  image: string;
  /** One paragraph; it reveals word by word on the project page. */
  description: string;
  /** Leave empty to hide the "Live Link" button. */
  liveUrl: string;
  services: string;
  stack: string;
  timeline: string;
  client: string;
  /** Full-width screens under the solution, at their own aspect ratio. */
  gallery: string[];
  /** A short film shown in place of the cover on the project page (an mp4 in /public/videos, plus a poster frame). */
  video?: { src: string; poster: string };
  /** One or two sentences for the top of the project page. */
  summary?: string;
  /**
   * The client's request, in their own words; shown in quote marks. For an
   * in-house project, `kind: "goal"` relabels it as our own goal.
   */
  brief?: { quote: string; name: string; role: string; kind?: "request" | "goal" };
  /** What the client asked for (or our goals), as numbered cards under the brief. */
  requirements?: { title: string; body: string }[];
};

export const caseStudies: {
  eyebrow: string;
  items: Project[];
} = {
  eyebrow: "Our Projects",
  items: [
    {
      slug: "epencil",
      title: "ePencil Academy",
      tags: ["Learning Platform", "Web App"],
      category: "Web App",
      year: "2026",
      image: "/img/epencil-home.webp",
      video: { src: "/videos/epencil.mp4", poster: "/videos/epencil-poster.jpg" },
      summary:
        "A learning management system for grade 6 to 11 students: monthly video lessons, secure live classes, online and manual payments, and rewards that keep students coming back.",
      brief: {
        quote:
          "I need a learning management system for my grade 6 to 11 students. It has to look attractive and fun for students. Every month I upload new videos, and students should be able to watch them but never download them. Students should be able to pay online, or pay manually at an ATM and send the receipt, and I need to track all of it. I also want to share live lesson links securely through the website, give students credits to keep them motivated, and keep every courier detail in one place so I can track deliveries easily.",
        name: "ePencil Academy",
        role: "Teacher, Grades 6–11",
      },
      requirements: [
        { title: "Fun for students", body: "A bright, playful design that feels made for 11 to 16 year olds, and is still easy for parents to trust." },
        { title: "Monthly video lessons", body: "The teacher uploads each month's lessons, sorted by grade and subject, ready for students to watch." },
        { title: "No downloads", body: "Lessons stream inside the site only, so paid videos can't be saved or shared outside it." },
        { title: "Online or ATM payments", body: "Students pay by card online, or pay at an ATM or bank and upload a photo of the receipt." },
        { title: "Payment tracking", body: "One place for the teacher to check receipts, approve payments and see who has paid each month." },
        { title: "Secure live lessons", body: "Live class links are shared through the site and shown only to students who are enrolled and paid up." },
        { title: "Credits & rewards", body: "Students earn credits for watching lessons and joining classes, to keep them motivated week after week." },
        { title: "Courier tracking", body: "Every student's delivery details and tracking numbers for study packs, easy for the teacher to follow up." },
      ],
      description:
        "ePencil Academy is a complete learning platform. Students get a cheerful home page, a searchable course catalogue and a personal dashboard with this month's videos, upcoming live classes and their credit balance.  Lessons are streamed inside a protected player with downloads switched off, and live class links appear only for students whose payment is confirmed. Card payments go through online, while ATM and bank payments come in as receipt uploads that the teacher approves from an admin panel.  The same panel lets the teacher upload monthly videos, see every student's payment history, award credits, and manage courier details for study material, so the whole academy runs from one place.",
      liveUrl: "",
      services: "Web Design, UI/UX Design, LMS Development",
      stack: "Next.js 16 · React 19",
      timeline: "2026 Release",
      client: "ePencil Academy",
      gallery: [],
    },
    {
      slug: "laxshman-auto-parts",
      title: "Laxshman Auto Parts",
      tags: ["E-Commerce", "Stock Management"],
      category: "Web App",
      year: "2026",
      image: "/img/laxshman-home.webp",
      video: { src: "/videos/laxshman.mp4", poster: "/videos/laxshman-poster.jpg" },
      summary:
        "An online store and stock system for a Japanese auto parts importer: customers browse and order genuine parts from anywhere in Sri Lanka, while the team manages every item in stock from one dashboard.",
      brief: {
        quote:
          "We import genuine Japanese auto parts, and we need a website where customers can find and buy our parts online. It has to look premium and match the quality of what we sell. Customers should be able to reach us on WhatsApp straight away, and we deliver across Sri Lanka. Most of all, we need to manage our stock easily through the website, so we always know what we have and nothing sells after it runs out.",
        name: "Laxshman Auto Parts",
        role: "Japanese parts importer, Colombo",
      },
      requirements: [
        { title: "Sell parts online", body: "A full shop where customers browse genuine parts, check prices and place orders." },
        { title: "Easy stock management", body: "Add parts, update quantities and prices from one dashboard, with no spreadsheets." },
        { title: "Live stock levels", body: "Out-of-stock parts are flagged on the shop automatically, so nothing is sold twice." },
        { title: "Find the right part", body: "Search and categories that help customers find the exact part for their vehicle." },
        { title: "WhatsApp ordering", body: "One-tap WhatsApp and hotline buttons on every page, for quick questions and orders." },
        { title: "Island-wide delivery", body: "Orders are taken from anywhere in Sri Lanka and tracked through to delivery." },
        { title: "Premium look", body: "A dark, high-performance design that matches the quality of genuine Japanese parts." },
        { title: "Built for phones", body: "Most customers shop on mobile, so every page is designed for small screens first." },
      ],
      description:
        "The shop opens on a dark, high-performance hero, with bold \"Genuine Japanese Parts\" type beside a studio shot of a car and its parts, and a red WhatsApp button and Colombo hotline always in the header.  Customers browse the catalogue by category, search for a part, see its price and stock status, and order online or straight through WhatsApp. Delivery covers the whole island.  Behind the shop, the team gets a stock dashboard: they add new imports, update quantities and prices, and see low-stock items at a glance. Stock updates the shop as soon as it changes, so customers only ever see parts that are actually available.",
      liveUrl: "",
      services: "Web Design, E-Commerce, Stock Management System",
      stack: "Next.js · Tailwind CSS",
      timeline: "2026 Release",
      client: "Laxshman Auto Parts Pvt Ltd",
      gallery: [],
    },
    {
      slug: "naveen-portfolio",
      title: "Naveen Portfolio",
      tags: ["In-house", "Portfolio"],
      category: "Website",
      year: "2026",
      image: "/img/naveen-portfolio.webp",
      video: { src: "/videos/naveen-portfolio.mp4", poster: "/videos/naveen-portfolio-poster.jpg" },
      summary:
        "The personal portfolio of our founder, Naveen: a bold, dark and fully animated site that shows full-stack and AI work, from pixel to database.",
      brief: {
        kind: "goal",
        quote:
          "I wanted a portfolio that feels as bold as the work I do: big type, smooth animation, and a first screen people remember. It had to load fast, work perfectly on a phone, show my projects and skills clearly, and make it easy for anyone to reach me.",
        name: "Naveen Kavindu Dilshan",
        role: "Founder, ND Softlabs",
      },
      requirements: [
        { title: "A first screen to remember", body: "A giant name in bold type, with the photo cut out and stepping through the letters." },
        { title: "Smooth animation", body: "Motion on load and on scroll that feels polished, never slow or distracting." },
        { title: "Fast to load", body: "Light pages and optimised images, so the site opens quickly even on mobile data." },
        { title: "Perfect on phones", body: "Every section reworked for small screens, not just shrunk down." },
        { title: "Projects & skills, clearly", body: "Work and tech stack laid out so a visitor understands what I do in seconds." },
        { title: "Easy to reach", body: "An \"Available for work\" badge and one-tap GitHub, LinkedIn and WhatsApp links." },
      ],
      description:
        "The site opens on a dark grid with a lime accent. The name NAVEEN fills the screen in heavy white type, with the photo cut out so it steps in front of the letters, while an outlined DEVELOPER sits behind and a handwritten \"full-stack\" line draws across it.  Small details keep it alive: glowing nodes drift over the grid, the navigation uses wide-spaced capitals, and an \"Available for work\" pill sits beside GitHub, LinkedIn and WhatsApp buttons, so getting in touch is always one tap away.  Projects, skills and contact each get their own section in the same dark style, built to load fast and adapt cleanly from a wide desktop down to a phone.",
      liveUrl: "",
      services: "Web Design, Branding, Front-end Development",
      stack: "Next.js · Tailwind CSS · GSAP",
      timeline: "2026 Release",
      client: "In-house",
      gallery: [],
    },
  ],
};

/**
 * Pricing, after bihanganimhan.me: three website plans, a plan finder and a
 * "custom" bar. Prices are "starting from". Apps, platforms, AI and systems
 * have no plan: the finder sends them to a custom quote.
 */
export type Plan = {
  slug: string;
  name: string;
  price: string;
  blurb: string;
  popular?: boolean;
  features: string[];
};

export const pricing = {
  eyebrow: "Pricing",
  heading: ["Clear prices.", "No surprises."] as [string, string],
  plans: [
    {
      slug: "starter",
      name: "Starter",
      price: "$100",
      blurb: "Perfect for small projects: a simple, responsive website with the essentials.",
      features: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO"],
    },
    {
      slug: "pro",
      name: "Pro",
      price: "$200",
      popular: true,
      blurb: "Ideal for growing businesses: a custom design with advanced features and a CMS.",
      features: [
        "Everything in Starter",
        "Up to 10 pages",
        "Custom design with animations",
        "Advanced contact form",
        "Basic CMS integration",
        "Google Maps integration",
      ],
    },
    {
      slug: "ultimate",
      name: "Ultimate",
      price: "$399",
      blurb: "The full package: custom design, e-commerce and complete tools.",
      features: [
        "Everything in Pro",
        "Up to 15 pages",
        "Full-featured CMS",
        "Fully custom design",
        "Full SEO setup",
      ],
    },
  ] as Plan[],
  custom: {
    title: "Need something custom?",
    body: "Web apps, mobile apps, AI automation and business systems are quoted on scope. Tell us what you need.",
    cta: "Get a quote",
  },
  /**
   * "Not sure which plan fits?" Each answer can only raise the plan: the
   * page count sets a floor and every picked need lifts it to that need's
   * plan. Types in `customTypes` skip straight to a custom quote.
   */
  finder: {
    title: "Not sure which plan fits?",
    body: "Answer three quick questions and get a recommendation with the real price.",
    /** Icons are 24px stroke paths. */
    types: [
      { id: "website", label: "A website for my business", icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" },
      { id: "store", label: "An online store", icon: "M9 18.7a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6ZM18 18.7a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6ZM2.5 3.5h2.6l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.4-1.1L21 7.5H6" },
      { id: "platform", label: "Bookings, courses or member area", icon: "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM3 9h18M9 9v11" },
      { id: "system", label: "A web app or business system", icon: "m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" },
      { id: "mobile", label: "A mobile app", icon: "M9.5 2.5h5A2.5 2.5 0 0 1 17 5v14a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 7 19V5a2.5 2.5 0 0 1 2.5-2.5ZM11 18.5h2" },
      { id: "ai", label: "AI automation or a chatbot", icon: "M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9ZM19 3v3M17.5 4.5h3M5 17v3M3.5 18.5h3" },
    ],
    pages: [
      { label: "Up to 5", value: 5 },
      { label: "6 to 10", value: 10 },
      { label: "11 to 15", value: 15 },
      { label: "More than 15", value: 99 },
    ],
    needs: [
      { id: "animations", label: "Custom design with animations", plan: "pro" },
      { id: "cms", label: "Edit text and images myself", plan: "pro" },
      { id: "maps", label: "Google Maps", plan: "pro" },
      { id: "unique", label: "A fully custom, one-of-a-kind design", plan: "ultimate" },
      { id: "full_cms", label: "Manage lots of content (full CMS)", plan: "ultimate" },
      { id: "seo", label: "Full SEO setup", plan: "ultimate" },
    ],
    /** Most pages each plan covers, smallest first. */
    limits: [
      ["starter", 5],
      ["pro", 10],
      ["ultimate", 15],
    ] as [string, number][],
    storePlan: "ultimate",
    customTypes: ["platform", "system", "mobile", "ai"],
  },
};

export const faq = {
  eyebrow: "FAQ",
  heading: "Your Questions, Answered",
  /** The card beside the questions; its button opens `site.whatsapp`. */
  asideTitle: "Still have a question?",
  asideBody: "Message us on WhatsApp and we'll reply within 24 hours.",
  asideCta: "Chat on WhatsApp",
  items: [
    {
      q: "How long does a project take?",
      a: "A business website usually takes 1–3 weeks. A custom web app or mobile app usually takes 4–10 weeks. You get a clear timeline before we start.",
    },
    {
      q: "How do payments work?",
      a: "A 50% deposit to start, and the rest when the project is finished, before final handover. Prices are in USD, and you can pay by bank transfer or another method we agree on.",
    },
    {
      q: "How many changes can I ask for?",
      a: "Changes are welcome while we work. The number of revision rounds is agreed in your quote before we start, so there are no surprises.",
    },
    {
      q: "Can you handle hosting and the domain?",
      a: "Yes. We can set up hosting and a domain in your name, or work with the hosting you already have.",
    },
    {
      q: "What happens after launch?",
      a: "We stay available for fixes, updates and new features. Support options are agreed before the project starts.",
    },
    {
      q: "Do you work with clients in other countries?",
      a: "Yes. We work with clients anywhere and reply within 24 hours, whatever your time zone.",
    },
    {
      q: "How do we communicate?",
      a: "WhatsApp, email or video calls, whichever suits you. You get regular updates and a preview link while we build.",
    },
  ],
};

export const contactCta = {
  eyebrow: "Limited project intake",
  headingLight: "Let's",
  headingMuted: "Connect",
  body: "Feel free to contact us if you have any questions. We are available for new projects or just for chatting.",
  cta: "Get Started Today",
  copyright: "© ND Softlabs, 2026",
  byline: "By Naveen Kavindu Dilshan",
};
