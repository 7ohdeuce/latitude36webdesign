const CLOUDINARY_VIDEO = 'https://res.cloudinary.com/wnb3twu1/video';
const PROXYABLE_HOSTS = ['d8j0ntlcm91z4.cloudfront.net'];

/**
 * Serve every background video through Cloudinary's transcoding so devices
 * only download what they can display: q_auto keeps perceptual quality while
 * cutting file size ~10-20x, and c_limit caps resolution without upscaling.
 * Non-Cloudinary sources on known hosts are routed through the fetch proxy.
 */
export function optimizedVideoUrl(url: string): string {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const transform = isMobile ? 'c_limit,w_1080,q_auto' : 'c_limit,w_1920,q_auto';

  if (url.startsWith(`${CLOUDINARY_VIDEO}/upload/`)) {
    return url.replace('/upload/', `/upload/${transform}/`);
  }

  try {
    if (PROXYABLE_HOSTS.includes(new URL(url).hostname)) {
      return `${CLOUDINARY_VIDEO}/fetch/${transform}/${url}`;
    }
  } catch {
    // Relative or malformed URL — leave untouched.
  }
  return url;
}
