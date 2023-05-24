import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Rating = asyncComponent(() =>
  import('../../../../modules/muiComponents/inputs/Rating')
);
export default AppPage(() => <Rating />);
