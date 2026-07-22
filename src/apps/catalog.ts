/**
 * ═══════════════════════════════════════════════════════════════════
 *  APP CATALOG — everything shown on the Apps page comes from here.
 *
 *  To add an app:
 *    1. Drop its icon in   public/apps/<icon>.png
 *    2. Drop its installer in  public/downloads/<file>.exe
 *    3. Add an entry below.
 *
 *  Leave `downloadUrl` empty ('') to show a "Coming soon" state instead
 *  of a download button.
 * ═══════════════════════════════════════════════════════════════════
 */
export interface AppEntry {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  downloadUrl: string;
  version?: string;
  platform?: string;
  features?: string[];
}

export const APPS: AppEntry[] = [
  {
    name: 'SkraperAi',
    tagline: 'YouTube transcripts + AI chat',
    description:
      'Pull a clean transcript from any YouTube video in any language, then question it with the AI provider of your choice. Built for researchers, marketers, and anyone who would rather read than watch.',
    icon: '/apps/SkraperAi.png',
    downloadUrl: '',
    version: 'v1.1.0',
    platform: 'Windows',
    features: [
      'Transcripts in any language',
      'Multi-provider AI chatbot',
      'Export to text and markdown',
    ],
  },
  {
    name: 'PriceSkraperAi',
    tagline: 'Multi-supplier price comparison',
    description:
      'Compare catalog pricing across trade distributors and local supply yards in one place. Import your own price lists, star the items you buy often, and see who is cheapest today.',
    icon: '/apps/PriceSkraperAi.png',
    downloadUrl: '',
    version: 'v1.6.2',
    platform: 'Windows',
    features: [
      'Eight supplier integrations',
      'Import your own catalogues',
      'Starred items and watchlists',
    ],
  },
  {
    name: 'SigFlow',
    tagline: 'Email signature generator',
    description:
      'Generate polished, on-brand email signatures for a whole team in minutes. Upload your logo, pick a layout, and export signatures ready to paste into any mail client.',
    icon: '/apps/sigflowfull.png',
    downloadUrl: '',
    platform: 'Windows',
    features: [
      'Upload your own logo',
      'White-label ready',
      'One-click copy to any client',
    ],
  },
];
