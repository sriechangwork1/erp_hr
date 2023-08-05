import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Error500 = asyncComponent(
  () => import("../../modules/errorPages/Error500")
);
export default AppPage(() => <Error500 />);
