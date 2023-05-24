import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Clients = asyncComponent(() =>
  import('../../../modules/invoice/Clients')
);
export default AppPage(() => <Clients />);
