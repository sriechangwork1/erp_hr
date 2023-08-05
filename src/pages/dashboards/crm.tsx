import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const CRM = asyncComponent(() => import("../../modules/dashboards/CRM"));
export default AppPage(() => <CRM />);
