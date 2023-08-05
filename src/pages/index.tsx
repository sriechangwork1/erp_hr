// import React from 'react';
import AppPage from "@crema/core/AppLayout/DefaultPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const SignIn = asyncComponent(() => import("../modules/auth/Signin"));
export default AppPage(() => <SignIn />);
