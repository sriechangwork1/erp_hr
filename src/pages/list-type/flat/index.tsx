import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Flat = asyncComponent(() => import("../../../modules/userList/Flat"));
export default AppPage(() => <Flat />);
