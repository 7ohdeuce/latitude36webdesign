import Latitude36Logo from '../components/Latitude36Logo';
import LazyVideo from '../components/LazyVideo';

const VIDEO_URL =
  'https://res.cloudinary.com/wnb3twu1/video/upload/v1784198126/headshot_lixtrh.mp4';

// Social profile URLs — to be filled in later.
const SOCIALS = [
  { icon: 'bi-twitter-x', label: 'X profile', href: '#' },
  { icon: 'bi-linkedin', label: 'LinkedIn', href: '#' },
  { icon: 'bi-tiktok', label: 'TikTok', href: '#' },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-black overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* Left: Video #5 — object-contain so the full frame stays in view */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-black">
          <LazyVideo
            src={VIDEO_URL}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Right: content */}
        <div className="flex flex-col justify-between w-full md:w-1/2 p-10 sm:p-16 gap-10">
          <div>
            <button
              className="flex items-center gap-3 mb-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Latitude36Logo size={28} className="text-white" />
              <span className="text-xl font-bold tracking-tight">Latitude36</span>
            </button>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-md">
              We serve as the bridge between traditional business values and
              cutting-edge AI technology. Whether you run a family restaurant
              or a landscaping business, we bring world-class automation to
              your doorstep.
            </p>
          </div>

          <div className="flex items-center justify-between gap-6 flex-wrap">
            <p className="text-xs text-white/40">© 2026 Latitude36. All rights reserved.</p>
            <div className="flex items-center gap-5">
              {SOCIALS.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/50 hover:text-neon transition-colors text-lg"
                >
                  <i className={`bi ${social.icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
