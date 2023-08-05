import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const ResetPassword = asyncComponent(
  () => import("../../../modules/userPages/UserPages/ResetPassword")
);
export default AppPage(() => <ResetPassword />);
