import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import ScrambleText from '../components/ScrambleText';

// Paste your Make.com webhook URL here once the scenario is set up.
// While empty, submissions are accepted locally and logged to the console.
const MAKE_WEBHOOK_URL = '';

const inputClasses =
  'w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-sm text-white ' +
  'placeholder:text-white/35 focus:outline-none focus:border-[#e0aaff] transition-colors';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [submitHovered, setSubmitHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    try {
      if (MAKE_WEBHOOK_URL) {
        const res = await fetch(MAKE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      } else {
        console.log('[Latitude36] Assessment request (webhook not configured yet):', data);
      }
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative bg-black overflow-hidden">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 px-4 sm:px-6 md:px-8 py-24 sm:py-32 max-w-4xl mx-auto">
        <motion.div
          className="mb-12 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase mb-4 text-neon">
            Free Assessment
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Tell me about your business.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Fill this out and I'll personally review where AI video, a new
            website, or automation tools could move the needle for you — no
            cost, no obligation.
          </p>
        </motion.div>

        {status === 'sent' ? (
          <motion.div
            className="flex flex-col items-center gap-4 border border-white/20 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2 size={40} className="text-neon" />
            <h3 className="text-xl font-bold">Request received.</h3>
            <p className="text-sm text-white/70 max-w-md">
              Thanks for reaching out — I'll get back to you within one
              business day with your free assessment.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.1 }}
          >
            <input
              className={inputClasses}
              type="text"
              name="name"
              placeholder="Your name *"
              required
            />
            <input
              className={inputClasses}
              type="email"
              name="email"
              placeholder="Email address *"
              required
            />
            <input
              className={inputClasses}
              type="text"
              name="business"
              placeholder="Business name"
            />
            <select className={inputClasses} name="interest" defaultValue="">
              <option value="" disabled className="bg-black">
                What are you interested in?
              </option>
              <option value="commercial" className="bg-black">
                AI Video Commercial
              </option>
              <option value="website" className="bg-black">
                Website
              </option>
              <option value="tools" className="bg-black">
                AI Tools (chatbot, local LLM, voicemail)
              </option>
              <option value="unsure" className="bg-black">
                Not sure yet — assess everything
              </option>
            </select>
            <textarea
              className={`${inputClasses} sm:col-span-2 min-h-[140px] resize-y`}
              name="message"
              placeholder="Tell me a bit about your business and what you'd like to improve *"
              required
            />

            {status === 'error' && (
              <p className="sm:col-span-2 text-sm text-red-400">
                Something went wrong sending your request. Please try again.
              </p>
            )}

            <div className="sm:col-span-2 flex justify-center mt-2">
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center gap-2 h-12 px-8 bg-white text-black rounded-full text-sm font-medium disabled:opacity-60"
                whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
              >
                <Send size={15} />
                <ScrambleText
                  text={status === 'sending' ? 'Sending...' : 'Send Request'}
                  isHovered={submitHovered}
                />
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
