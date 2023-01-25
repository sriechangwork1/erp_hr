import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Steppers = asyncComponent(() =>
  import('../../../../modules/muiComponents/navigation/Stepper')
);
export default AppPage(() => <Steppers />);
