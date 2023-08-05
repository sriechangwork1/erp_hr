import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const ForgetPassword = asyncComponent(
  () => import("../../../modules/userPages/StyledUserPages/ForgetPassword")
);
export default AppPage(() => <ForgetPassword />);
