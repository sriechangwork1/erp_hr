import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Funnel = asyncComponent(() =>
  import('../../../../modules/thirdParty/recharts/Funnel'),
  { ssr: false }
);
export default AppPage(() => <Funnel />);
