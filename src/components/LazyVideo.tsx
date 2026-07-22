import { useEffect, useRef, useState } from 'react';
import { optimizedVideoUrl } from '../utils/videoUrl';

interface LazyVideoProps {
  src: string;
  className?: string;
}

/**
 * Background video that only downloads once it approaches the viewport and
 * pauses whenever it scrolls out of view — keeps mobile from loading five
 * full videos at page load.
 */
export default function LazyVideo({ src, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: '250px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={shouldLoad ? optimizedVideoUrl(src) : undefined}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onContextMenu={(e) => e.preventDefault()}
      controlsList="nodownload"
      disablePictureInPicture
    />
  );
}
