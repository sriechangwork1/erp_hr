import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Sliders = asyncComponent(() =>
  import('../../../../modules/muiComponents/inputs/Slider')
);
export default AppPage(() => <Sliders />);
