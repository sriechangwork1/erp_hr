import React from "react";
import AppPage from "@crema/core/AppLayout/DefaultPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const ForgetPassword = asyncComponent(
  () => import("../modules/auth/ForgetPassword")
);
export default AppPage(() => <ForgetPassword />);
