import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Latitude36Logo from './Latitude36Logo';
import SquashHamburger from './SquashHamburger';
import ScrambleText from './ScrambleText';
import { scrollToId } from '../utils/scrollTo';

interface NavbarProps {
  entranceComplete: boolean;
}

const NAV_LINKS: { label: string; target: string }[] = [
  { label: 'Services', target: 'case-studies' },
  { label: 'Pricing', target: 'architecture' },
  { label: 'About Me', target: 'footer' },
];

function NavLink({ label, target, onNavigate }: { label: string; target: string; onNavigate?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="whitespace-nowrap text-[13px] text-white/90 hover:text-white transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        scrollToId(target);
        onNavigate?.();
      }}
    >
      <ScrambleText text={label} isHovered={hovered} />
    </button>
  );
}

function DownloadButton({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      className={`flex items-center gap-2 bg-white text-black rounded-full font-medium ${
        mobile ? 'h-11 px-5 text-[13px]' : 'h-12 px-6 text-sm'
      }`}
      whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => scrollToId('contact')}
    >
      <i className="bi bi-apple text-base" />
      <ScrambleText text="Free Assessment" isHovered={hovered} />
    </motion.button>
  );
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full h-20 z-50 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between h-full px-4 md:px-8">
        <div className="flex items-center gap-2">
          {/* Logo pill */}
          <motion.button
            className="flex items-center gap-2.5 h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px]"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToId('top')}
          >
            <Latitude36Logo size={22} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">Latitude36</span>
          </motion.button>

          {/* Expanding menu pill */}
          <motion.div
            className="flex items-center h-12 bg-white/15 backdrop-blur-md rounded-[14px] overflow-hidden"
            animate={{ width: menuOpen ? 290 : 48 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            <button
              className="flex items-center justify-center w-12 h-12 shrink-0"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <SquashHamburger isOpen={menuOpen} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="flex items-center gap-5 pr-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {NAV_LINKS.map((link) => (
                    <NavLink key={link.label} {...link} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton />
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden items-center justify-between h-full px-4">
        <motion.button
          className="flex items-center gap-2 h-11 px-4 bg-white/15 backdrop-blur-md rounded-[14px]"
          whileTap={{ scale: 0.98 }}
          onClick={() => scrollToId('top')}
        >
          <Latitude36Logo size={20} className="text-white" />
          <span className="text-[15px] font-medium tracking-tight text-white">Latitude36</span>
        </motion.button>

        <button
          className="flex items-center justify-center w-11 h-11 bg-white/15 backdrop-blur-md rounded-[14px]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <SquashHamburger isOpen={mobileOpen} mobile />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="sm:hidden absolute top-20 left-4 right-4 bg-black/85 backdrop-blur-xl rounded-[14px] border border-white/10 p-6 flex flex-col gap-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} {...link} onNavigate={() => setMobileOpen(false)} />
            ))}
            <DownloadButton mobile />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
