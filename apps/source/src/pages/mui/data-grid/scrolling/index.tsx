import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Scrolling = asyncComponent(() =>
  import('../../../../modules/muiComponents/datagrid/Scrolling')
);
export default AppPage(() => <Scrolling />);
