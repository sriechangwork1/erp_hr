import React from "react";
import AppPage from "@crema/core/AppLayout/DefaultPage";
import asyncComponent from "@crema/components/AppAsyncComponent/AsyncLoaderComponent";

const SignUP = asyncComponent(() => import("../modules/auth/Signup"));
export default AppPage(() => <SignUP />);
