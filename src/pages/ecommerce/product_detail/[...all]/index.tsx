import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const ProductDetail = asyncComponent(
  () => import("../../../../modules/ecommerce/ProductDetail")
);
export default AppPage(() => <ProductDetail />);
