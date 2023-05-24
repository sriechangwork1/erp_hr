import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Selects = asyncComponent(() =>
  import('../../../../modules/muiComponents/inputs/Selects')
);
export default AppPage(() => <Selects />);
