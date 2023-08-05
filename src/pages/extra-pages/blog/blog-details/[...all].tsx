import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const BlogDetails = asyncComponent(
  () => import("../../../../modules/extraPages/Blog/BlogDetail")
);
export default AppPage(() => <BlogDetails />);
