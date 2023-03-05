import { AuthProvider } from "@pankod/refine-core";
import {
  notification,
} from "@pankod/refine-antd";
import nookies from "nookies";

import { supabaseClient } from "./utility";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return Promise.reject(error);
    }

    if (data?.session) {
      nookies.set(null, "token", data.session.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      return Promise.resolve();
    }

    // for third-party login
    return Promise.resolve(false);
  },
  forgotPassword: async ({ email }) => {
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: `${window.location.origin}/update-password`,
        },
    );

    if (error) {
        return Promise.reject(error);
    }

    if (data) {
        notification.open({
            type: "success",
            message: "Success",
            description:
                "Please check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.",
        });
        return Promise.resolve();
      }
  },
  updatePassword: async ({ password }) => {
      const { data, error } = await supabaseClient.auth.updateUser({
          password,
      });

      if (error) {
          return Promise.reject(error);
      }

      if (data) {
          return Promise.resolve("/");
      }
  },
  logout: async () => {
    nookies.destroy(null, "token");
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve("/");
  },
  checkError: () => Promise.resolve(),
  checkAuth: async (ctx) => {
    const { token } = nookies.get(ctx);
    const { data } = await supabaseClient.auth.getUser(token);
    // console.log("token", token, data)
    const { user } = data;
    // const { session } = data;

    if (true) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: async () => {
    const user = await supabaseClient.auth.getUser();

    if (user) {
      return Promise.resolve(user.data.user?.role);
    }
  },
  getUserIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return Promise.resolve({
        ...data.user,
        name: data.user.email,
      });
    }
  },
};
