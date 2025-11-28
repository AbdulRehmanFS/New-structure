import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";

export default function SuccessScreen() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/");
  return (
    <div className="flex flex-col gap-4 text-black py-5 px-10 h-screen items-center">
      <div className="mt-10">
        <CheckCircleOutlined style={{ fontSize: "40px", color: "green" }} />
      </div>
      <div className="text-[22px]">Password Reset Link send successfully.</div>
      <div className="text-grey-text">
        Thanks! If their is an account associate with this email, we will send the password reset
        email immediately .
      </div>
      <ButtonComponent
        text="Go to sign in"
        onClick={handleNavigate}
        bg={theme.lightPrimaryColor}
        width="60px"
        height="40px"
        className="mt-8"
      />
    </div>
  );
}

