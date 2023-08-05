import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Academy = asyncComponent(
  () => import("../../modules/dashboards/Academy")
);
export default AppPage(() => <Academy />);
