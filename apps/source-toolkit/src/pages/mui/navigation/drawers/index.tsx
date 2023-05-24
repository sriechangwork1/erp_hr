import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Drawers = asyncComponent(() =>
  import('../../../../modules/muiComponents/navigation/Drawer')
);
export default AppPage(() => <Drawers />);
