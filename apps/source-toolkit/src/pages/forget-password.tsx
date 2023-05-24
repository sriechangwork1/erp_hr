import React from 'react';
import AppPage from '../core/AppLayout/DefaultPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ForgetPassword = asyncComponent(() =>
  import('../modules/auth/ForgetPassword')
);
export default AppPage(() => <ForgetPassword />);
