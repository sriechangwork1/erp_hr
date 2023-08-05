import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Portfolio = asyncComponent(
  () => import("../../../modules/extraPages/Portfolio")
);
export default AppPage(() => <Portfolio />);
