import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from '../components/ScrambleIn';

const HERO_VIDEO =
  'https://res.cloudinary.com/wnb3twu1/video/upload/v1784196255/axolotl_wyn5xn.mp4';

const SCRUB_SENSITIVITY = 0.8;

interface HeroProps {
  entranceComplete: boolean;
}

export default function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const isSeeking = useRef(false);
  const lastX = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const requestSeek = () => {
      isSeeking.current = true;
      video.currentTime = targetTime.current;
    };

    // Chain seeks through the seeked event so frames are never dropped:
    // while a seek is in flight we only update targetTime, then issue the
    // next seek as soon as the current one lands.
    const onSeeked = () => {
      if (Math.abs(video.currentTime - targetTime.current) > 0.001) {
        requestSeek();
      } else {
        isSeeking.current = false;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!video.duration || isNaN(video.duration)) return;
      if (lastX.current === null) {
        lastX.current = e.clientX;
        return;
      }
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;

      const delta = (dx / window.innerWidth) * video.duration * SCRUB_SENSITIVITY;
      targetTime.current = Math.min(
        Math.max(targetTime.current + delta, 0),
        video.duration - 0.05
      );

      if (!isSeeking.current) requestSeek();
    };

    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section id="top" className="relative h-screen h-[100dvh] overflow-hidden">
      {/* Video #1 — mouse-scrubbed, not autoplay */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ transform: 'translateY(50px)' }}
      >
        <span
          className="uppercase leading-none"
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            letterSpacing: '-4px',
            opacity: 0.1,
            background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          LATITUDE36
        </span>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col h-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Latitude36
            </h1>
            <motion.p
              className="text-sm sm:text-base text-white/80 leading-relaxed"
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.2 }}
            >
              An AI agency crafting cinematic commercials with generative video.
              We turn your brand story into film-grade advertising — no crews,
              no sets, no six-figure production budgets.
            </motion.p>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-right md:text-right">
            <span className="block">
              <ScrambleIn text="Every Frame." delay={700} triggered={entranceComplete} />
            </span>
            <span className="block">
              <ScrambleIn text="Generated." delay={1000} triggered={entranceComplete} />
            </span>
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
