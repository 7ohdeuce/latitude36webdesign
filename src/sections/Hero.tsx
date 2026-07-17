import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from '../components/ScrambleIn';
import { optimizedVideoUrl } from '../utils/videoUrl';

const HERO_VIDEO =
  'https://res.cloudinary.com/wnb3twu1/video/upload/v1784196255/axolotl_wyn5xn.mp4';

const SCRUB_SENSITIVITY = 0.8;
const SMOOTHING = 0.12;

interface HeroProps {
  entranceComplete: boolean;
}

export default function Hero({ entranceComplete }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.pause();

    let target = 0;
    let smoothed = 0;
    let seeking = false;
    let lastMouseX: number | null = null;
    let lastTouchX: number | null = null;
    let raf = 0;

    const applyDelta = (dx: number) => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;
      const delta = (dx / window.innerWidth) * duration * SCRUB_SENSITIVITY;
      target = Math.min(Math.max(target + delta, 0), duration - 0.05);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (lastMouseX !== null) applyDelta(e.clientX - lastMouseX);
      lastMouseX = e.clientX;
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      if (lastTouchX !== null) applyDelta(x - lastTouchX);
      lastTouchX = x;
    };
    const onTouchEnd = () => {
      lastTouchX = null;
    };

    const onSeeked = () => {
      seeking = false;
    };

    // Smoothing loop: ease the playhead toward the drag target every frame,
    // and only issue a new seek once the previous one has landed (seeked
    // event) so frames are never dropped.
    const tick = () => {
      smoothed += (target - smoothed) * SMOOTHING;
      if (
        !seeking &&
        video.readyState >= 2 &&
        Math.abs(video.currentTime - smoothed) > 0.005
      ) {
        seeking = true;
        video.currentTime = smoothed;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMouseMove);
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchmove', onTouchMove, { passive: true });
    section.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchmove', onTouchMove);
      section.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-screen h-[100dvh] overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Video #1 — scrubbed by mouse movement / touch drag, not autoplay */}
      <video
        ref={videoRef}
        src={optimizedVideoUrl(HERO_VIDEO)}
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
        className="relative z-10 flex flex-col h-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 pointer-events-none"
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
              className="text-sm sm:text-base leading-relaxed text-neon"
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
