/**
 * ═══════════════════════════════════════════════════════════════════
 *  COMPANY KNOWLEDGE — this is the ONLY information the chatbot may
 *  use to answer questions. Edit freely: add services, prices, FAQs,
 *  policies, your story. Plain text, any format you like.
 * ═══════════════════════════════════════════════════════════════════
 */
export const COMPANY_KNOWLEDGE = `
ABOUT LATITUDE36
Latitude36 is an AI agency specializing in AI-generated video commercials,
cinematic brand films, websites, and custom AI tools for small and
traditional businesses. We serve as the bridge between traditional business
values and cutting-edge AI technology — whether you run a family restaurant
or a landscaping business, we bring world-class automation to your doorstep.

SERVICES
1. AI Video Commercials — cinematic 15-60 second spots, product films, and
   brand stories built with frontier video models. Delivered in days, not
   months. No crews, no sets, no six-figure production budgets.
2. Websites — designed and built for small businesses: restaurants,
   landscaping, law firms, e-commerce, and more.
3. AI Tools — website chatbots, private local LLMs (your data never leaves
   your building), and AI voicemail assistants that answer and book every
   missed call.

PRICING
- Launch (from $2,500): one 15-30s AI commercial, two creative concepts,
  two revision rounds, social + broadcast aspect ratios, delivery in 7 days.
- Campaign (from $7,500): three commercials (30s hero + two 15s cuts),
  brand style lock, A/B variants, unlimited revisions for 30 days,
  performance review after launch.
- Studio Partner (custom): monthly production retainer, dedicated creative
  director, custom-trained brand models, priority 48-hour turnarounds,
  full usage rights on all channels.

HOW TO GET STARTED
Fill out the Free Assessment form on this page (click the Free Assessment
button in the top-right corner) and you'll get a personal review of where
AI video, a new website, or automation could help your business — no cost,
no obligation. Response within one business day.
`;

/**
 * System prompt sent to the LLM once connected. It restricts answers to
 * the knowledge above — the bot is told to say "I don't know" instead of
 * inventing anything.
 */
export const SYSTEM_PROMPT = `You are Lati, the friendly AI assistant on the Latitude36 website.
Answer visitor questions in a warm, concise way (2-4 sentences max).

STRICT RULES:
- Only use the COMPANY INFORMATION below to answer. Never invent services,
  prices, guarantees, or details that are not written there.
- If the answer is not in the company information, say you don't have that
  detail and suggest submitting the Free Assessment form to ask directly.
- Never discuss topics unrelated to Latitude36 and its services.

COMPANY INFORMATION:
${COMPANY_KNOWLEDGE}`;

/**
 * Offline fallback answers used until the LLM API is connected — simple
 * keyword matching so the widget is functional today.
 */
export const FALLBACK_FAQS: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'expensive', 'tier', 'pay'],
    answer:
      'Our tiers: Launch from $2,500 (one commercial), Campaign from $7,500 (three commercials), and Studio Partner (custom retainer). Scroll to the Pricing section for full details!',
  },
  {
    keywords: ['commercial', 'video', 'ad', 'film', 'spot'],
    answer:
      'We create cinematic AI-generated commercials — 15 to 60 second spots, product films, and brand stories. Delivered in days, not months, with no crews or six-figure budgets.',
  },
  {
    keywords: ['website', 'site', 'web'],
    answer:
      'We design and build websites for small businesses — restaurants, landscaping, law firms, e-commerce and more. Check out the website case studies on this page!',
  },
  {
    keywords: ['chatbot', 'llm', 'voicemail', 'tool', 'automation', 'ai tool'],
    answer:
      "We build website chatbots (like me!), private local LLMs where your data never leaves your building, and AI voicemail assistants that answer every missed call.",
  },
  {
    keywords: ['start', 'contact', 'assessment', 'touch', 'reach', 'email', 'talk'],
    answer:
      'Click the Free Assessment button in the top-right corner and fill out the form — you\'ll hear back within one business day, no cost, no obligation.',
  },
  {
    keywords: ['who', 'about', 'latitude', 'what do you do', 'company'],
    answer:
      'Latitude36 is an AI agency bridging traditional business values and cutting-edge AI — we make AI video commercials, websites, and custom AI tools for businesses like yours.',
  },
  {
    keywords: ['fast', 'long', 'turnaround', 'delivery', 'days', 'when'],
    answer:
      'Launch-tier commercials are delivered in 7 days, and Studio Partners get priority 48-hour turnarounds. Days, not months.',
  },
];

export const GREETING =
  "Hey! I'm Lati, the Latitude36 assistant. Ask me about our AI commercials, websites, tools, or pricing!";

export const FALLBACK_ANSWER =
  "I don't have that detail yet — the best way to get an answer is the Free Assessment form (top-right button). I can tell you about our services, pricing, and how to get started!";
