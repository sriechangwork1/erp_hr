import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const AddProduct = asyncComponent(
  () => import("../../../modules/ecommerce/Admin/AddEditProduct")
);
export default AppPage(() => <AddProduct />);
