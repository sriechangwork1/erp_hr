import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import AppLoader from "@crema/components/AppLoader";
import dynamic from "next/dynamic";

const Crypto = dynamic(() => import("../../modules/dashboards/Crypto"), {
  loading: () => <AppLoader />,
  ssr: false,
});
export default AppPage(() => <Crypto />);
