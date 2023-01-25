import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Tabs = asyncComponent(() =>
  import('../../../../modules/muiComponents/navigation/Tabs')
);
export default AppPage(() => <Tabs />);
