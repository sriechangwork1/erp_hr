import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const ForgetPassword = asyncComponent(() =>
  import('../../../modules/userPages/StyledUserPages/ForgetPassword')
);
export default AppPage(() => <ForgetPassword />);
