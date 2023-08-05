import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const PortfolioDetail = asyncComponent(
  () => import("../../../modules/extraPages/Portfolio/PortfolioDetail")
);
export default AppPage(() => <PortfolioDetail />);
