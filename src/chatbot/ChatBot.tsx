import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { askBot, type ChatMessage } from './api';
import { GREETING } from './knowledge';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || thinking) return;
    setInput('');
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setThinking(true);
    try {
      const reply = await askBot(next);
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            'Something went wrong on my end — please try again, or use the Free Assessment form up top.',
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col w-[calc(100vw-2.5rem)] max-w-[360px] h-[480px] max-h-[calc(100dvh-8rem)] bg-black/90 backdrop-blur-xl border border-[#c77dff]/40 rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 0 30px rgba(199,125,255,0.25), 0 0 80px rgba(199,125,255,0.12)' }}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
              <img
                src="/axolotl.png"
                alt="Lati"
                className="w-11 h-auto shrink-0"
                style={{
                  filter:
                    'drop-shadow(0 0 5px rgba(199,125,255,0.75)) drop-shadow(0 0 12px rgba(199,125,255,0.45))',
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-neon-bright leading-tight">Lati</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neon">
                  Latitude36 Assistant
                </p>
              </div>
              <button
                className="text-white/50 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) =>
                m.role === 'assistant' ? (
                  <div
                    key={i}
                    className="self-start max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-2.5 bg-[#c77dff]/10 border border-[#c77dff]/30 text-[13px] leading-relaxed text-neon-bright"
                  >
                    {m.content}
                  </div>
                ) : (
                  <div
                    key={i}
                    className="self-end max-w-[85%] rounded-2xl rounded-br-sm px-4 py-2.5 bg-white/10 border border-white/15 text-[13px] leading-relaxed text-white"
                  >
                    {m.content}
                  </div>
                )
              )}
              {thinking && (
                <div className="self-start rounded-2xl rounded-bl-sm px-4 py-2.5 bg-[#c77dff]/10 border border-[#c77dff]/30">
                  <motion.span
                    className="text-neon text-[13px] tracking-[0.3em]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    •••
                  </motion.span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 p-3 border-t border-white/10">
              <input
                ref={inputRef}
                className="flex-1 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-[13px] text-white placeholder:text-white/35 focus:outline-none focus:border-[#e0aaff] transition-colors"
                placeholder="Ask about Latitude36..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
              />
              <motion.button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#c77dff] text-black shrink-0 disabled:opacity-50"
                style={{ boxShadow: '0 0 14px rgba(199,125,255,0.5)' }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={send}
                disabled={thinking || !input.trim()}
                aria-label="Send message"
              >
                <Send size={15} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button — the axolotl itself, glow traced along its shape */}
      <motion.button
        className="relative w-24 sm:w-28"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Chat with Lati'}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
      >
        <img
          src="/axolotl.png"
          alt="Chat with Lati"
          className="w-full h-auto"
          style={{
            filter:
              'drop-shadow(0 0 8px rgba(199,125,255,0.75)) drop-shadow(0 0 24px rgba(199,125,255,0.45))',
          }}
        />
      </motion.button>
    </div>
  );
}
