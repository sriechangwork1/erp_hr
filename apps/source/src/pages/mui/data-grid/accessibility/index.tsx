import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Accessibility = asyncComponent(() =>
  import('../../../../modules/muiComponents/datagrid/Accessibility')
);
export default AppPage(() => <Accessibility />);
