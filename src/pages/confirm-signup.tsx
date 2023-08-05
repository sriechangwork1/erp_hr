import React from "react";
import AppPage from "@crema/core/AppLayout/DefaultPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const ConfirmSignup = asyncComponent(
  () => import("../modules/auth/Signup/ConfirmSignupAwsCognito")
);
export default AppPage(() => <ConfirmSignup />);
