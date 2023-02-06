import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Account = asyncComponent(() => import('../../modules/account/MyProfile'));
export default AppPage(() => <Account />);
