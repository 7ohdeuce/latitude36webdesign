/**
 * The "latitude36" logo, rendered as live text rather than an image.
 *
 * Size it by setting font-size on the element (e.g. text-2xl, or an
 * arbitrary [56px]); the outline and glow are defined in em so they scale
 * with it. Font is controlled by --wordmark-font in index.css.
 */
export default function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`l36-wordmark ${className}`}>latitude36</span>;
}
