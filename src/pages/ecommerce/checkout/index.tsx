import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Checkout = asyncComponent(
  () => import("../../../modules/ecommerce/Checkout")
);
export default AppPage(() => <Checkout />);
