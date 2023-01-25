import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Events = asyncComponent(() =>
  import('../../../../modules/muiComponents/datagrid/Events')
);
export default AppPage(() => <Events />);
