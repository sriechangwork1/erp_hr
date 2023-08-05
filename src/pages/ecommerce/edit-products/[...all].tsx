import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const EditProduct = asyncComponent(
  () => import("../../../modules/ecommerce/Admin/EditProduct")
);
export default AppPage(() => <EditProduct />);
