import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import LazyVideo from '../components/LazyVideo';

const VIDEO_URL =
  'https://res.cloudinary.com/wnb3twu1/video/upload/v1784196258/vegas-outline_cownvg.mp4';

export default function Cinematic() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [55, 0, -55]);
  const opacity = useTransform(smoothProgress, [0, 0.35, 0.5, 0.65, 1], [0, 0.7, 1, 0.7, 0]);
  const transform = useMotionTemplate`perspective(1200px) rotateX(${rotateX}deg)`;

  return (
    <section ref={sectionRef} className="relative h-screen h-[100dvh] overflow-hidden">
      {/* Video #2 */}
      <LazyVideo
        src={VIDEO_URL}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div style={{ transform, opacity }}>
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase mb-6 text-neon">
            AI-Generated Cinema
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-5xl">
            We don't shoot commercials.
            <br />
            We generate them.
          </h2>
          <p className="mt-8 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-neon">
            Cinematic 30-second spots, product films, and brand stories — built
            with frontier video models and directed with a filmmaker's eye.
            Delivered in days, not months.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
