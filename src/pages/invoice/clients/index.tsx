import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Clients = asyncComponent(
  () => import("../../../modules/invoice/Clients")
);
export default AppPage(() => <Clients />);
