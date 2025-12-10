import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { defaultMessage } from "util/constant";
import { resetPasswordApi } from "service/api/auth";
import { message } from "antd";
import React, { useEffect, useState } from "react";

const useResetPassword = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search) || {};
  const token = searchParams.get("t") || null;
  const formRef = React.useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams?.size === 0) {
      navigate("/");
    }
  }, [navigate,searchParams?.size]);

  const onFinish = async (values) => {
    setLoading(true);
    let decoded = null;
    try {
      decoded = token ? jwtDecode(token) : {};
      const { email } = decoded;
      const res = await resetPasswordApi({ ...values, email, token });
      if (res?.status === 200) {
        message.success(res?.message);
        formRef.current?.resetFields();
        navigate("/");
      } else message.error(res?.message);
    } catch {
      message.error(defaultMessage.invalidToken);
    }
    setLoading(false);
  };
  return {
    onFinish,
    formRef,
    loading
  };
};
export default useResetPassword;
