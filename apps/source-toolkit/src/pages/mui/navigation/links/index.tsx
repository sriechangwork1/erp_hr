import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Links = asyncComponent(() =>
  import('../../../../modules/muiComponents/navigation/Links')
);
export default AppPage(() => <Links />);
