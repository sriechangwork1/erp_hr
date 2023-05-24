import React from 'react';
import asyncComponent from '@crema/components/AppAsyncComponent';
import AppPage from '../../../../core/AppLayout/AppPage';

const TimePicker = asyncComponent(() =>
  import('../../../../modules/muiComponents/lab/TimePicker')
);
export default AppPage(() => <TimePicker />);
