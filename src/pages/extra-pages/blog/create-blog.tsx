import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const CreateBlog = asyncComponent(
  () => import("../../../modules/extraPages/Blog/CreateBlog")
);
export default AppPage(() => <CreateBlog />);
