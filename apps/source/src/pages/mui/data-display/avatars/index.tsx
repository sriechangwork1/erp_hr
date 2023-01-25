import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Avatars = asyncComponent(() =>
  import('../../../../modules/muiComponents/dataDisplay/Avatar')
);
export default AppPage(() => <Avatars />);
