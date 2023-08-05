import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const ProductListing = asyncComponent(
  () => import("../../../modules/ecommerce/Admin/Listing")
);
export default AppPage(() => <ProductListing />);
