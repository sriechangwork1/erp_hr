import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ReactNotification = asyncComponent(() =>
  import('../../../modules/thirdParty/reactNotification'),
  { ssr: false }
);
export default AppPage(() => <ReactNotification />);
