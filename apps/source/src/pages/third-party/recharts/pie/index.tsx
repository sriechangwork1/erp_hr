import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Pie = asyncComponent(() =>
  import('../../../../modules/thirdParty/recharts/Pie'),
  { ssr: false }
);
export default AppPage(() => <Pie />);
