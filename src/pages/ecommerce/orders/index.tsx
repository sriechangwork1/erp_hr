import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Orders = asyncComponent(
  () => import("../../../modules/ecommerce/Orders")
);
export default AppPage(() => <Orders />);
