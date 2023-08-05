import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const FAQ = asyncComponent(() => import("../../../modules/extraPages/FAQ"));
export default AppPage(() => <FAQ />);
