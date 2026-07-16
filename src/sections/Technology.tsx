import { motion } from 'framer-motion';
import { Brain, Clapperboard, Wand2, Gauge } from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

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

export default function Technology() {
  return (
    <section className="relative h-screen h-[100dvh] overflow-hidden">
      {/* Video #4 */}
      <video
        src={VIDEO_URL}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-white/60 mb-4">
            Adaptive Intelligence
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl mb-12 sm:mb-16">
            A production studio that thinks.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
              <h3 className="text-base font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
