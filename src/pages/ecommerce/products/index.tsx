import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Products = asyncComponent(
  () => import("../../../modules/ecommerce/Products")
);
export default AppPage(() => <Products />);
