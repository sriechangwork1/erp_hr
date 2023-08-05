import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import AppLoader from "@crema/components/AppLoader";
import dynamic from "next/dynamic";

const Scatter = dynamic(
  () => import("../../../../modules/thirdParty/recharts/Scatter"),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <Scatter />);
