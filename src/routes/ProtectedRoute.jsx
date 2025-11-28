/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((e) => e?.signIn?.data) || {};
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;

