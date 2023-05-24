import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Popover = asyncComponent(() =>
  import('../../../../modules/muiComponents/utils/Popover')
);
export default AppPage(() => <Popover />);
