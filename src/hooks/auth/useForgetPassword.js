import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "service/api/auth";


const useForgetPassword=()=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    const onFinish = async (values) => {
      setLoading(true);
      const res = await forgotPasswordApi(values);
      if (res?.status === 200) {
        message.success(res?.message || "Email sent successfully");
        navigate("/reset-password-success", { replace: true });
      } else message.error(res?.message || "Something went wrong");
      setLoading(false);
    };
return{
    loading,
    onFinish
}
  

}

export default useForgetPassword