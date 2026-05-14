import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface YoutubeVideoUrlOptions {
  autoplay?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  sameChannelRelatedVideos?: boolean;
}

export function getEmbedYoutubeVideoUrl(
  url: string,
  options?: YoutubeVideoUrlOptions,
): string {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, '');

    let embedUrl: URL | null = null;

    // Already embed
    if (parsedUrl.pathname.includes('/embed/')) {
      embedUrl = parsedUrl;
    } else {
      let videoId = '';

      const isYoutube =
        hostname === 'youtube.com' ||
        hostname === 'm.youtube.com' ||
        hostname === 'youtube-nocookie.com';

      const isYoutuBe = hostname === 'youtu.be';

      // youtube.com/watch?v=...
      if (isYoutube && parsedUrl.pathname === '/watch') {
        videoId = parsedUrl.searchParams.get('v') || '';
      }

      // youtube.com/shorts/VIDEO_ID
      if (isYoutube && parsedUrl.pathname.startsWith('/shorts/')) {
        videoId = parsedUrl.pathname.split('/')[2] || '';
      }

      // youtu.be/VIDEO_ID
      if (isYoutuBe) {
        videoId = parsedUrl.pathname.split('/')[1] || '';
      }

      if (!videoId) return '';

      embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
    }

    if (options?.autoplay) {
      embedUrl.searchParams.set('autoplay', '1');
    }

    if (options?.muted) {
      embedUrl.searchParams.set('mute', '1');
    }

    if (options?.playsInline) {
      embedUrl.searchParams.set('playsinline', '1');
    }

    if (options?.sameChannelRelatedVideos) {
      embedUrl.searchParams.set('rel', '0');
    }

    return embedUrl.toString();
  } catch {
    return '';
  }
}
