import React from "react";

import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";
import AppPage from "@crema/core/AppLayout/AppPage";

const InvoicePdf = asyncComponent(
  () => import("../../../modules/invoice/InvoicePdf")
);
export default AppPage(() => <InvoicePdf />);
