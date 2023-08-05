import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("../../../modules/apps/Chat"));
export default AppPage(() => <Chat />);
