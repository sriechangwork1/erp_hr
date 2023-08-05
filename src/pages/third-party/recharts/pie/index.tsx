import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import AppLoader from "@crema/components/AppLoader";
import dynamic from "next/dynamic";

const Pie = dynamic(
  () => import("../../../../modules/thirdParty/recharts/Pie"),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <Pie />);
