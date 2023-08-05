import React from "react";

import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";
import AppPage from "@crema/core/AppLayout/AppPage";

const Invoice = asyncComponent(() => import("../../modules/invoice/Listing"));
export default AppPage(() => <Invoice />);
