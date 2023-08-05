import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import AppContextProvider from "@crema/context/AppContextProvider";
import AppThemeProvider from "@crema/context/AppThemeProvider";
import AppStyleProvider from "@crema/context/AppStyleProvider";
import AppLocaleProvider from "@crema/context/AppLocaleProvider";
import AppAuthProvider from "@crema/core/AppAuthProvider";
import AuthRoutes from "@crema/components/AuthRoutes";

import "@crema/mockapi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "simplebar-react/dist/simplebar.min.css";
import "../../public/styles/vendors/index.css";
import AppPageMeta from "@crema/components/AppPageMeta";
import InfoViewContextProvider from "@crema/context/AppContextProvider/InfoViewContextProvider";
import createEmotionCache from "../../createEmotionCache";
import { AppProps } from "next/app";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <AppContextProvider>
        <AppThemeProvider>
          <AppStyleProvider>
            <AppLocaleProvider>
              <InfoViewContextProvider>
                <AppAuthProvider>
                  <AuthRoutes>
                    <CssBaseline />
                    <AppPageMeta />
                    <Component {...pageProps} />
                  </AuthRoutes>
                </AppAuthProvider>
              </InfoViewContextProvider>
            </AppLocaleProvider>
          </AppStyleProvider>
        </AppThemeProvider>
      </AppContextProvider>
    </CacheProvider>
  );
}
