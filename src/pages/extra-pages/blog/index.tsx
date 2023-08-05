import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Blog = asyncComponent(() => import("../../../modules/extraPages/Blog"));
export default AppPage(() => <Blog />);
