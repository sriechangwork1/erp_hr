import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const TextFields = asyncComponent(() =>
  import('../../../../modules/muiComponents/inputs/TextField')
);
export default AppPage(() => <TextFields />);
