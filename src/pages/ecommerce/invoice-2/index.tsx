import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Invoice2 = asyncComponent(
  () => import("../../../modules/ecommerce/Invoice2")
);
export default AppPage(() => <Invoice2 />);
