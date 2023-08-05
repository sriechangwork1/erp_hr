import React from "react";
import AppPage from "@crema/core/AppLayout/DefaultPage";
import AsyncLoaderComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Error404 = AsyncLoaderComponent(
  () => import("../modules/errorPages/Error404")
);
export default AppPage(() => <Error404 />);
