import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { optimizedVideoUrl } from '../utils/videoUrl';

const HERO_VIDEO =
  'https://res.cloudinary.com/wnb3twu1/video/upload/v1784196255/axolotl_wyn5xn.mp4';

// How much of the clip one full sweep across the viewport covers.
const SCRUB_SENSITIVITY = 0.8;
// Fraction of the remaining distance closed per frame — lower is smoother.
const SMOOTHING = 0.1;
// Don't ask for a new seek until the playhead is at least this far off.
const SEEK_EPSILON = 0.02;

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
      if (!duration || !isFinite(duration)) return;
      const delta = (dx / window.innerWidth) * duration * SCRUB_SENSITIVITY;
      target = Math.min(Math.max(target + delta, 0), duration - 0.05);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (lastMouseX !== null) applyDelta(e.clientX - lastMouseX);
      lastMouseX = e.clientX;
    };
    const onMouseLeave = () => {
      lastMouseX = null;
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

    // Ease the playhead toward the drag target once per frame, and never
    // stack seek requests — a new one is only issued after the previous
    // seek reports back, which is what keeps the decoder from thrashing.
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (video.readyState < 2) return;

      smoothed += (target - smoothed) * SMOOTHING;
      if (!seeking && Math.abs(video.currentTime - smoothed) > SEEK_EPSILON) {
        seeking = true;
        video.currentTime = smoothed;
      }
    };
    raf = requestAnimationFrame(tick);

    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onSeeked);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchmove', onTouchMove, { passive: true });
    section.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
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
        src={optimizedVideoUrl(HERO_VIDEO, true)}
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
            <h1>
              <img
                src="/L36LOGO2.png"
                alt="Latitude36"
                className="h-10 sm:h-12 md:h-16 w-auto"
                style={{ filter: 'drop-shadow(0 0 14px rgba(199,125,255,0.55))' }}
              />
            </h1>
            <motion.p
              className="text-sm sm:text-base leading-relaxed text-neon"
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.2 }}
            >
              We serve as the bridge between AI automation and traditional
              workflows.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
