/* eslint-disable react/prop-types */
import { SignIn, ForgotPassword, ResetPassword, SuccessScreen } from "@features/auth";

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
    element: <SuccessScreen />,
  },
];

export { publicPath };

