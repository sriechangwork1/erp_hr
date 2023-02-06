import React from 'react';
import AppPage from '../core/AppLayout/DefaultPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const SignUP = asyncComponent(() => import('../modules/auth/Signup'));
export default AppPage(() => <SignUP />);
