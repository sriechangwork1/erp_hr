import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Widgets = asyncComponent(
  () => import("../../modules/dashboards/Widgets")
);
export default AppPage(() => <Widgets />);
