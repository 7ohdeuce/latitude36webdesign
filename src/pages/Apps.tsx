import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, ArrowLeft } from 'lucide-react';
import { APPS, type AppEntry } from '../apps/catalog';
import ScrambleText from '../components/ScrambleText';
import { navigate } from '../utils/router';

function AppCard({ app, delay }: { app: AppEntry; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="flex flex-col border border-white/15 rounded-2xl overflow-hidden bg-white/[0.03]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0], delay }}
      whileHover={{ y: -6, borderColor: 'rgba(199,125,255,0.5)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div className="flex items-center justify-center p-8 pb-6">
        <motion.img
          src={app.icon}
          alt={`${app.name} icon`}
          className="w-28 h-28 object-contain rounded-2xl"
          style={{ filter: 'drop-shadow(0 0 18px rgba(199,125,255,0.3))' }}
          animate={hovered ? { scale: 1.06 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </div>

      <div className="flex flex-col flex-1 px-6 sm:px-7 pb-7 gap-3">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <h2 className="text-xl font-bold tracking-tight">
            <ScrambleText text={app.name} isHovered={hovered} />
          </h2>
          {app.version && <span className="text-xs text-white/40">{app.version}</span>}
        </div>

        <p className="text-xs uppercase tracking-widest text-neon">{app.tagline}</p>
        <p className="text-sm text-white/75 leading-relaxed">{app.description}</p>

        {app.features && (
          <ul className="flex flex-col gap-2 mt-2">
            {app.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                <Check size={14} className="shrink-0 mt-1 text-[#c77dff]" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          {app.downloadUrl ? (
            <motion.a
              href={app.downloadUrl}
              download
              className="flex items-center justify-center gap-2 h-12 rounded-full bg-white text-black text-sm font-medium"
              whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={16} />
              Download{app.platform ? ` for ${app.platform}` : ''}
            </motion.a>
          ) : (
            <div className="flex items-center justify-center h-12 rounded-full border border-white/20 text-sm text-white/45">
              Coming soon
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Apps() {
  const [backHovered, setBackHovered] = useState(false);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 px-4 sm:px-6 md:px-8 pt-32 sm:pt-40 pb-24 sm:pb-32 max-w-7xl mx-auto">
        <motion.div
          className="mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase mb-4 text-neon">
            Software
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
            Apps built in-house. Yours to download.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Desktop tools we designed and shipped at Latitude36 — the same
            software we use to run our own work, available for you to install.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {APPS.map((app, i) => (
            <AppCard key={app.name} app={app} delay={i * 0.12} />
          ))}
        </div>

        <div className="flex justify-center mt-16 sm:mt-24">
          <motion.button
            className="flex items-center gap-2 h-12 px-8 border border-white/40 rounded-full text-sm"
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
            onClick={() => navigate('home')}
          >
            <ArrowLeft size={16} />
            <ScrambleText text="Back to Latitude36" isHovered={backHovered} />
          </motion.button>
        </div>
      </div>
    </main>
  );
}
