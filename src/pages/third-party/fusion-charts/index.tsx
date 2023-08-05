import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import AppLoader from "@crema/components/AppLoader";
import dynamic from "next/dynamic";

const FusionCharts = dynamic(
  () => import("../../../modules/thirdParty/fusionCharts"),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <FusionCharts />);
