import React from "react";
import AppPage from "@crema/core/AppLayout/DefaultPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const ResetPassword = asyncComponent(
  () => import("../modules/auth/ForgetPassword/ResetPasswordAwsCognito")
);
export default AppPage(() => <ResetPassword />);
