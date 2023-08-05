import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const EditBlog = asyncComponent(
  () => import("../../../../modules/extraPages/Blog/EditBlog")
);
export default AppPage(() => <EditBlog />);
