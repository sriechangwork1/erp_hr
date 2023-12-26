'use client';
import React from 'react';
import asyncComponent from '@crema/components/AppAsyncComponent';
const Calendar = asyncComponent(
  () => import('../../../../modules/apps/Calendar'),
  { ssr: false },
);
export default <Calendar />;
