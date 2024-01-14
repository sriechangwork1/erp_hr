import React from 'react';
import Logo from '../../../assets/icon/something-wrong.png';
import Image from 'next/image';

const ErrorIcon = () => {
  return <Image alt='something-wrong' src={`${Logo}`} />;
};

export default ErrorIcon;
