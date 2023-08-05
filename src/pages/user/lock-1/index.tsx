import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const UnlockScreen = asyncComponent(
  () => import("../../../modules/userPages/UserPages/UnlockScreen")
);
export default AppPage(() => <UnlockScreen />);
