import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import AppLoader from "@crema/components/AppLoader";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("../../../modules/apps/Calendar"), {
  loading: () => <AppLoader />,
  ssr: false,
});
export default AppPage(() => <Calendar />);
