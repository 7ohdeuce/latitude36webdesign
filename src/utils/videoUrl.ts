const CLOUDINARY_VIDEO = 'https://res.cloudinary.com/wnb3twu1/video';
const PROXYABLE_HOSTS = ['d8j0ntlcm91z4.cloudfront.net'];

function transformFor(scrubbable: boolean): string {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const width = isMobile ? 1080 : 1920;

  // Scrubbed video needs a dense keyframe interval: seeking can only land on
  // a keyframe, so sparse ones (the default ~2-5s) force the decoder to
  // replay a long span of frames per seek — that is what makes scrubbing
  // stutter. ki_0.25 puts a seek target every quarter second.
  return scrubbable
    ? `c_limit,w_${Math.min(width, 1280)},q_auto,ki_0.25`
    : `c_limit,w_${width},q_auto`;
}

/**
 * Serve every video through Cloudinary's transcoding so devices only download
 * what they can display: q_auto keeps perceptual quality while cutting file
 * size ~10-20x, and c_limit caps resolution without upscaling.
 */
export function optimizedVideoUrl(url: string, scrubbable = false): string {
  const transform = transformFor(scrubbable);

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
