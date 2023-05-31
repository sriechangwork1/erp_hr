import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const Radar = dynamic(
  () => import('../../../../modules/thirdParty/recharts/Radar'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <Radar />);
