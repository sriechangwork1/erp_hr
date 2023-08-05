import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import AppLoader from "@crema/components/AppLoader";
import dynamic from "next/dynamic";

const Treemap = dynamic(
  () => import("../../../../modules/thirdParty/recharts/Treemap"),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <Treemap />);
