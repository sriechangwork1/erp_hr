import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Checkboxes = asyncComponent(() =>
  import('../../../../modules/muiComponents/inputs/Checkboxes')
);
export default AppPage(() => <Checkboxes />);
