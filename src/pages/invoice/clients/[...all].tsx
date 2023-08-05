import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const EditClients = asyncComponent(
  () => import("../../../modules/invoice/Clients/EditClients")
);
export default AppPage(() => <EditClients />);
