import React, { CSSProperties } from "react";

type AppImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
};

const AppImage = ({ src, alt, ...props }: AppImageProps) => {
  return (
    <picture>
      <img src={src} alt={alt} {...props} />
    </picture>
  );
};

export default AppImage;
