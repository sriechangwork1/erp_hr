import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const KnowledgeBase = asyncComponent(
  () => import("../../../modules/extraPages/KnowledgeBase")
);
export default AppPage(() => <KnowledgeBase />);
