import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps } from 'next/image';

// src와 NEXT_PUBLIC_DOMAIN이 같은지 비교
const isLocalImage = (src: string | StaticImport) => src === process.env.NEXT_PUBLIC_DOMAIN;

interface IMarkdownImageProps extends ImageProps {
  width?: number;
  height?: number;
}

export const MarkdownImage = ({ src, alt, width, height, ...props }: IMarkdownImageProps) => {
  if (!src) return null;

  const imgSrc = isLocalImage(src) ? `/images/${src}` : src;

  return (
    <div>
      <Image
        {...props}
        src={imgSrc}
        alt={alt || ''}
        width={Number(width) || 800}
        height={Number(height) || 450}
        className="transition-transform duration-500 ease-in-out hover:scale-105"
        style={{
          objectFit: 'contain',
          maxHeight: '500px',
          width: '100%',
          height: 'auto',
        }}
        unoptimized
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/default.webp';
          target.onerror = null;
        }}
      />
      {alt && <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{alt}</p>}
    </div>
  );
};
