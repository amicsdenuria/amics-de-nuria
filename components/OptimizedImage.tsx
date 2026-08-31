import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { Image as SanityImage } from 'next-sanity/image';

type OptimizedImageProps = Omit<NextImageProps, 'loader'>;

const isSanityImageSource = (
  src: OptimizedImageProps['src'],
): src is string => {
  if (typeof src !== 'string') return false;

  try {
    const url = new URL(src);

    return (
      url.protocol === 'https:' &&
      url.hostname === 'cdn.sanity.io' &&
      url.pathname.startsWith('/images/')
    );
  } catch {
    return false;
  }
};

/**
 * Uses Sanity's CDN loader for Sanity images and Next's default optimizer for
 * local/static images. Sanity sources therefore bypass Vercel Image
 * Optimization while retaining the responsive behavior of next/image.
 */
const OptimizedImage = ({ src, ...props }: OptimizedImageProps) => {
  if (isSanityImageSource(src)) {
    return (
      <SanityImage
        {...props}
        src={src}
      />
    );
  }

  return (
    <NextImage
      {...props}
      src={src}
    />
  );
};

export default OptimizedImage;
