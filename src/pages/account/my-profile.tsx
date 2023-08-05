import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Account = asyncComponent(() => import("../../modules/account/MyProfile"));
export default AppPage(() => <Account />);
