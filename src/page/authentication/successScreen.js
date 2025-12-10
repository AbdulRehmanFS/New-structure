import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { ButtonComponent } from "component/index";
import { theme } from "util/theme";

export default function SuccessScreen() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/");
  return (
    <SuccessMsgWrapper>
      <div className="checkIcon">
        <CheckCircleOutlined style={{ fontSize: "40px", color: "green" }} />
      </div>
      <div className="heading">Password Reset Link send successfully.</div>
      <div className="subheading">
        Thanks! If their is an account associate with this email, we will send the password reset
        email immediately .
      </div>
      <ButtonComponent
        text="Go to sign in"
        onClick={handleNavigate}
        bg={theme.lightPrimaryColor}
        width="60px"
        height="40px"
      />
    </SuccessMsgWrapper>
  );
}

const SuccessMsgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: ${theme.black};
  padding: 20px 40px;
  height: 100vh;
  align-items: center;
  .checkIcon {
    margin-top: 40px;
  }
  .heading {
    font-size: 22px;
  }
  .subheading {
    color: ${theme.greyText};
  }
  .custom-button {
    margin-top: 30px;
  }
`;
