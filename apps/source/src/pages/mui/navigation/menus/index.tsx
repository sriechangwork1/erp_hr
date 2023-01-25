import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Menu = asyncComponent(() =>
  import('../../../../modules/muiComponents/navigation/Menu')
);
export default AppPage(() => <Menu />);
