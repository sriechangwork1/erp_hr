import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const Todo = asyncComponent(() => import("../../../modules/apps/ToDo"));
export default AppPage(() => <Todo />);
