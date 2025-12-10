import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authlogin } from "store/signInSlice";
import Message from "component/messages";
import { loginApi } from "service/api/auth";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigate("/forgot-password");
  };

  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginApi(values);
    if (res?.status === 200) {
      const { data, token } = res || {};
      dispatch(authlogin({ ...data, token }));
      navigate("/dashboard");
    } else Message.error(res || "Something went wrong");
    setLoading(false);
  };
  
  return {
    onFinish,
    loading,
    handleNavigation
  };
};

export default useSignIn;
