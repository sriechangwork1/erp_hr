import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Invoice1 = asyncComponent(
  () => import("../../../modules/ecommerce/Invoice1")
);
export default AppPage(() => <Invoice1 />);
