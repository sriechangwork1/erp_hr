import React from 'react';
import asyncComponent from '@crema/components/AppAsyncComponent';
import AppPage from '../../../../core/AppLayout/AppPage';

const Masonry = asyncComponent(() =>
  import('../../../../modules/muiComponents/lab/Masonry')
);
export default AppPage(() => <Masonry />);
