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
      <div className="flex flex-col md:flex-row md:items-center min-h-[400px]">
        {/* Left: Video #5 — full frame in view, hugging the text column */}
        <div className="flex items-center justify-center md:justify-end w-full md:w-1/2 bg-black pt-10 md:py-10">
          <LazyVideo
            src={VIDEO_URL}
            className="h-[300px] md:h-[380px] w-auto max-w-full object-contain rounded-3xl"
          />
        </div>

        {/* Right: content */}
        <div className="flex flex-col justify-between w-full md:w-1/2 p-10 sm:p-12 md:pl-12 md:pr-16 gap-10">
          <div>
            <button
              className="flex items-center mb-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
            >
              <img
                src="/L36LOGO2.png"
                alt="Latitude36"
                className="h-8 w-auto"
                style={{ filter: 'drop-shadow(0 0 10px rgba(199,125,255,0.5))' }}
              />
            </button>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-md">
              We serve as the bridge between traditional business values and
              cutting-edge AI technology. Whether you run a family restaurant
              or a landscaping business, we bring world-class automation to
              your doorstep.
            </p>
          </div>

          <div className="flex flex-col gap-4">
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
            <p className="text-xs text-white/40">© 2026 Latitude36. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
