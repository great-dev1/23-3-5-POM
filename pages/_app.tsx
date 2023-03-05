import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@pankod/refine-core";
import {
  AuthPage,
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-nextjs-router";
import { dataProvider } from "@pankod/refine-supabase";
import "@pankod/refine-antd/dist/reset.css";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";
import { ColorModeContextProvider } from "@contexts";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ColorModeContextProvider>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(supabaseClient)}
        authProvider={authProvider}
        LoginPage={AuthPage}
        notificationProvider={notificationProvider}
        Layout={Layout}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
      >
        <Component {...pageProps} />
      </Refine>
    </ColorModeContextProvider>
  );
}

export default MyApp;
