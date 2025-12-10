import { postApi } from "../methods";

const route = {
  login: "admin/auth/login",
  forgot_password: "admin/auth/forget-password",
  reset_password: "admin/auth/reset-password",
};

export const loginApi = (payload) => postApi(route.login, payload);

export const forgotPasswordApi = (payload) =>
  postApi(route.forgot_password, payload);

export const resetPasswordApi = (payload) =>
  postApi(route.reset_password, payload);
