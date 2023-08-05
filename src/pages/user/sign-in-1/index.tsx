import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Signin = asyncComponent(
  () => import("../../../modules/userPages/UserPages/Signin")
);
export default AppPage(() => <Signin />);
