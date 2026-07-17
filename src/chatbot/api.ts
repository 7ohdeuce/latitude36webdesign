import { SYSTEM_PROMPT, FALLBACK_FAQS, FALLBACK_ANSWER } from './knowledge';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * ═══════════════════════════════════════════════════════════════════
 *  LLM CONNECTION POINT — paste your API endpoint here later.
 *
 *  Recommended: a small backend route (or Make.com webhook) that
 *  receives { system, messages }, calls your LLM provider with the
 *  system prompt, and responds with JSON: { "reply": "..." }.
 *  Keeping the provider key on the server means it is never exposed
 *  in the browser.
 * ═══════════════════════════════════════════════════════════════════
 */
const LLM_API_URL = '';

export async function askBot(messages: ChatMessage[]): Promise<string> {
  if (LLM_API_URL) {
    const res = await fetch(LLM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: SYSTEM_PROMPT, messages }),
    });
    if (!res.ok) throw new Error(`Chat API responded ${res.status}`);
    const data = await res.json();
    return data.reply ?? data.content ?? FALLBACK_ANSWER;
  }

  // No API yet — answer locally with keyword matching over the knowledge
  // base so the widget works today.
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 500));
  const question = messages[messages.length - 1]?.content.toLowerCase() ?? '';
  for (const faq of FALLBACK_FAQS) {
    if (faq.keywords.some((k) => question.includes(k))) return faq.answer;
  }
  return FALLBACK_ANSWER;
}
