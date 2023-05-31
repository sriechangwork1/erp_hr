import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('../../../modules/thirdParty/calendar'), {
  loading: () => <AppLoader />,
  ssr: false,
});
export default AppPage(() => <Calendar />);
