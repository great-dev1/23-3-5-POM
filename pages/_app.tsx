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
// import dataProvider from "@pankod/refine-simple-rest";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
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
        resources={[
          {
              name: "products",
              list: AntdInferencer,
              show: AntdInferencer,
              create: AntdInferencer,
              edit: AntdInferencer,
          },
          {
            name: "orders",
            list: AntdInferencer,
            show: AntdInferencer,
            create: AntdInferencer,
            edit: AntdInferencer,
          },
          {
            name: "customers",
            list: AntdInferencer,
            show: AntdInferencer,
            create: AntdInferencer,
            edit: AntdInferencer,
          },
        ]}
      >
        <Component {...pageProps} />
      </Refine>
    </ColorModeContextProvider>
  );
}

export default MyApp;
