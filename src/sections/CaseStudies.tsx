import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import ScrambleText from '../components/ScrambleText';
import LazyVideo from '../components/LazyVideo';

interface CaseStudy {
  index: string;
  title: string;
  client: string;
  category: string;
  result: string;
  // Video source added later — placeholder until real links are provided.
  videoSrc?: string;
}

const COMMERCIAL_STUDIES: CaseStudy[] = [
  {
    index: '01',
    title: 'Desert Bloom',
    client: 'Boutique Hotel Group',
    category: 'Brand Film — 45s',
    result: '+212% direct bookings during campaign',
  },
  {
    index: '02',
    title: 'Midnight Menu',
    client: 'Regional Restaurant Chain',
    category: 'TV Commercial — 30s',
    result: '3.1M impressions in first two weeks',
  },
  {
    index: '03',
    title: 'Second Skin',
    client: 'DTC Apparel Startup',
    category: 'Product Launch — 60s',
    result: '4.7x return on ad spend',
  },
  {
    index: '04',
    title: 'Open Water',
    client: 'Marine Tourism Operator',
    category: 'Social Cut — 15s',
    result: '+68% engagement vs. live-action spot',
  },
];

const WEBSITE_STUDIES: CaseStudy[] = [
  {
    index: '01',
    title: 'Table Eleven',
    client: 'Family-Owned Restaurant',
    category: 'Website — Design & Build',
    result: 'Online reservations up 3x in first month',
  },
  {
    index: '02',
    title: 'Evergreen Yards',
    client: 'Landscaping Business',
    category: 'Website — Lead Generation',
    result: '40+ qualified quote requests per month',
  },
  {
    index: '03',
    title: 'North Peak Legal',
    client: 'Boutique Law Firm',
    category: 'Website — Rebrand & Rebuild',
    result: 'Bounce rate cut from 71% to 38%',
  },
  {
    index: '04',
    title: 'Coast & Co.',
    client: 'DTC Retail Brand',
    category: 'Website — E-Commerce',
    result: '+92% conversion rate after relaunch',
  },
];

const TOOL_STUDIES: CaseStudy[] = [
  {
    index: '01',
    title: 'Concierge Bot',
    client: 'Website Chatbots',
    category: 'AI Tool — Customer Support',
    result: '80% of inquiries answered without staff',
  },
  {
    index: '02',
    title: 'House Model',
    client: 'Local LLMs',
    category: 'AI Tool — Private On-Prem AI',
    result: 'Company data never leaves the building',
  },
  {
    index: '03',
    title: 'After Hours',
    client: 'Voicemail Assistant',
    category: 'AI Tool — Call Handling',
    result: 'Every missed call answered and booked',
  },
];

function CaseStudyCard({ study, delay }: { study: CaseStudy; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="group relative border border-white/15 rounded-2xl overflow-hidden bg-white/[0.03]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video slot — real links to be added later */}
      <div className="relative aspect-video bg-white/5 flex items-center justify-center overflow-hidden">
        {study.videoSrc ? (
          <LazyVideo
            src={study.videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <motion.div
              className="flex items-center justify-center w-14 h-14 rounded-full border border-white/30"
              animate={hovered ? { scale: 1.15, borderColor: 'rgba(255,255,255,0.8)' } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Play size={18} className="text-white ml-0.5" />
            </motion.div>
            <span className="absolute bottom-3 right-4 text-[10px] tracking-[0.2em] uppercase text-white/40">
              Coming soon
            </span>
          </>
        )}
        <span className="absolute top-3 left-4 text-xs text-white/50">{study.index}</span>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            <ScrambleText text={study.title} isHovered={hovered} />
          </h3>
          <ArrowUpRight
            size={18}
            className="shrink-0 mt-1 text-white/40 group-hover:text-white transition-colors"
          />
        </div>
        <p className="text-xs uppercase tracking-widest text-neon">{study.category}</p>
        <p className="text-sm text-white/80">{study.client}</p>
        <p className="text-sm text-white mt-2 border-t border-white/10 pt-3">{study.result}</p>
      </div>
    </motion.article>
  );
}

interface CaseStudySectionProps {
  id: string;
  eyebrow: string;
  heading: string;
  studies: CaseStudy[];
  columns?: 2 | 3;
  showViewMore?: boolean;
}

function CaseStudySection({
  id,
  eyebrow,
  heading,
  studies,
  columns = 2,
  showViewMore = false,
}: CaseStudySectionProps) {
  const [viewMoreHovered, setViewMoreHovered] = useState(false);

  return (
    <section id={id} className="relative bg-black overflow-hidden">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 px-4 sm:px-6 md:px-8 py-24 sm:py-32 max-w-7xl mx-auto">
        <motion.div
          className="mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase mb-4 text-neon">
            {eyebrow}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">{heading}</h2>
        </motion.div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 ${
            columns === 3 ? 'lg:grid-cols-3' : ''
          }`}
        >
          {studies.map((study, i) => (
            <CaseStudyCard key={study.index + study.title} study={study} delay={i * 0.12} />
          ))}
        </div>

        {showViewMore && (
          <div className="flex justify-center mt-14 sm:mt-20">
            <motion.button
              className="flex items-center gap-2 h-12 px-8 border border-white/40 rounded-full text-sm"
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => setViewMoreHovered(true)}
              onMouseLeave={() => setViewMoreHovered(false)}
            >
              <ScrambleText text="View More" isHovered={viewMoreHovered} />
              <ArrowUpRight size={16} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

export function CommercialCaseStudies() {
  return (
    <CaseStudySection
      id="case-studies"
      eyebrow="Case Studies — Commercials"
      heading="Commercials that already ran. Results that already landed."
      studies={COMMERCIAL_STUDIES}
      showViewMore
    />
  );
}

export function WebsiteCaseStudies() {
  return (
    <CaseStudySection
      id="case-studies-websites"
      eyebrow="Case Studies — Websites"
      heading="Websites built to work as hard as you do."
      studies={WEBSITE_STUDIES}
    />
  );
}

export function ToolCaseStudies() {
  return (
    <CaseStudySection
      id="case-studies-tools"
      eyebrow="Case Studies — AI Tools"
      heading="Chatbots, local LLMs, and voice assistants in the wild."
      studies={TOOL_STUDIES}
      columns={3}
    />
  );
}
