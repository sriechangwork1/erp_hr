import React, { CSSProperties } from 'react';
import Image from 'next/image';

type AppImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

const AppImage = ({ src, alt, ...props }: AppImageProps) => {
  return (
    <picture>
      <Image src={src} alt={alt} {...props} />
    </picture>
  );
};

export default AppImage;
