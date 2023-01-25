import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Signin = asyncComponent(() =>
  import('../../../modules/userPages/StyledUserPages/Signin')
);
export default AppPage(() => <Signin />);
