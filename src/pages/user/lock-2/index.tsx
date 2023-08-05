import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const UnlockScreen = asyncComponent(
  () => import("../../../modules/userPages/StyledUserPages/UnlockScreen")
);
export default AppPage(() => <UnlockScreen />);
