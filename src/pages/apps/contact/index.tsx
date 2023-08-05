import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import AppLoader from "@crema/components/AppLoader";
import dynamic from "next/dynamic";

const Contact = dynamic(() => import("../../../modules/apps/Contact"), {
  loading: () => <AppLoader />,
  ssr: false,
});
export default AppPage(() => <Contact />);
