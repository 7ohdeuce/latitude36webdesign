import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Clapperboard, Wand2, Gauge } from 'lucide-react';
import ScrambleIn from '../components/ScrambleIn';
import { useInViewport } from '../utils/useInViewport';

const FEATURES = [
  {
    icon: Brain,
    title: 'Model Orchestration',
    body: 'We route every shot to the video model best suited for it — motion, faces, product detail — and stitch the results seamlessly.',
  },
  {
    icon: Clapperboard,
    title: 'Cinematic Direction',
    body: 'Shot lists, lighting language, and lens logic from real filmmaking, applied to generative pipelines.',
  },
  {
    icon: Wand2,
    title: 'Brand Consistency',
    body: 'Custom style locks keep your colors, characters, and products identical across every frame and every cut.',
  },
  {
    icon: Gauge,
    title: 'Rapid Iteration',
    body: 'New concepts in hours, revised cuts in minutes. Test five creative directions for the cost of one storyboard.',
  },
];

export default function Cinematic() {
  // The scramble reveal only runs once the headline block is on screen.
  const scrambleRef = useRef<HTMLDivElement>(null);
  const scrambleInView = useInViewport(scrambleRef);

  return (
    <section id="cinematic" className="relative bg-black overflow-hidden">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 px-4 sm:px-6 md:px-8 py-24 sm:py-32 max-w-7xl mx-auto">
        {/* Headline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase mb-6 text-neon">
            AI-Generated Cinema
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-5xl mx-auto">
            We don't shoot commercials.
            <br />
            We generate them.
          </h2>
          <p className="mt-8 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-neon">
            Cinematic 30-second spots, product films, and brand stories — built
            with frontier video models and directed with a filmmaker's eye.
            Delivered in days, not months.
          </p>

          <div
            ref={scrambleRef}
            className="mt-12 sm:mt-16 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            <span className="block">
              <ScrambleIn text="Every Frame." delay={200} triggered={scrambleInView} />
            </span>
            <span className="block">
              <ScrambleIn text="Generated." delay={500} triggered={scrambleInView} />
            </span>
          </div>
        </motion.div>

        {/* Adaptive Intelligence — merged in below the headline */}
        <motion.div
          className="mt-20 sm:mt-28 mb-12 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase mb-4 text-neon">
            Adaptive Intelligence
          </p>
          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">
            A production studio that thinks.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="border-t border-white/25 pt-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0], delay: i * 0.1 }}
            >
              <feature.icon size={22} className="text-white/80 mb-4" />
              <h4 className="text-base font-bold mb-2">{feature.title}</h4>
              <p className="text-sm text-white/85 leading-relaxed">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
