/* eslint-disable react/prop-types */
import SignIn from "page/authentication/signIn";
import ForgotPassword from "page/authentication/forgotPassword";
import ResetPassword from "page/authentication/resetPassword";
import ResetSuccessScreen from "page/authentication/successScreen.js";

const publicPath = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password-success",
    element: <ResetSuccessScreen />,
  },
];

export { publicPath };
