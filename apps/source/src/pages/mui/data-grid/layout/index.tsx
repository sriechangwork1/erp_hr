import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Layout = asyncComponent(() =>
  import('../../../../modules/muiComponents/datagrid/Layout')
);
export default AppPage(() => <Layout />);
