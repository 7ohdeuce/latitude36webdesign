import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ScrambleText from '../components/ScrambleText';
import { scrollToId } from '../utils/scrollTo';

interface Tier {
  index: string;
  name: string;
  tagline: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

const TIERS: Tier[] = [
  {
    index: 'Tier 01',
    name: 'Launch',
    tagline: 'One spot, fully generated',
    price: 'From $2,500',
    features: [
      'One 15–30s AI commercial',
      'Two creative concepts to choose from',
      'Two revision rounds',
      'Social + broadcast aspect ratios',
      'Delivery in 7 days',
    ],
  },
  {
    index: 'Tier 02',
    name: 'Campaign',
    tagline: 'A full multi-channel push',
    price: 'From $7,500',
    highlighted: true,
    features: [
      'Three commercials (30s hero + two 15s cuts)',
      'Brand style lock across all spots',
      'A/B variant testing versions',
      'Unlimited revisions for 30 days',
      'Performance review after launch',
    ],
  },
  {
    index: 'Tier 03',
    name: 'Studio Partner',
    tagline: 'Your embedded AI film crew',
    price: 'Custom',
    features: [
      'Monthly commercial production retainer',
      'Dedicated creative director',
      'Custom-trained brand models',
      'Priority 48-hour turnarounds',
      'Full usage rights, all channels',
    ],
  },
];

function TierCard({ tier, delay }: { tier: Tier; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`flex flex-col border rounded-2xl p-7 sm:p-8 ${
        tier.highlighted ? 'border-white bg-white/[0.06]' : 'border-white/20'
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0], delay }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">{tier.index}</p>
      <h3 className="text-2xl font-bold tracking-tight mb-1">
        <ScrambleText text={tier.name} isHovered={hovered} />
      </h3>
      <p className="text-sm text-white/60 mb-6">{tier.tagline}</p>
      <p className="text-xl font-bold mb-8">{tier.price}</p>

      <ul className="flex flex-col gap-3 mb-8">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-white/75">
            <Check size={15} className="shrink-0 mt-0.5 text-white" />
            {feature}
          </li>
        ))}
      </ul>

      <motion.button
        className={`mt-auto h-12 rounded-full text-sm font-medium ${
          tier.highlighted
            ? 'bg-white text-black'
            : 'border border-white/40 text-white'
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => scrollToId('contact')}
      >
        Start a Project
      </motion.button>
    </motion.div>
  );
}

export default function Architecture() {
  return (
    <section id="architecture" className="relative min-h-screen bg-black">
      <div className="px-4 sm:px-6 md:px-8 py-24 sm:py-32 max-w-7xl mx-auto">
        <motion.div
          className="mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase mb-4 text-neon">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
            Three tiers. Zero production overhead.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.index} tier={tier} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
