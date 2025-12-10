import { memo} from "react";
import styled from "styled-components";
import { Form, Input } from "antd";
import ButtonComponent from "component/fields/button";
import { font, theme } from "util/theme";
import useSignIn from "hooks/auth/useSignIn";

const SignInForm = () => {
  const { onFinish, loading, handleNavigation } = useSignIn();

  return (
    <SignInFormWrapper
      name="basic"
      style={{
        width: "100%"
      }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off">
      <div className="heading">Sign in</div>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!"
          }
        ]}
        style={{ marginBottom: "18px" }}>
        <Input
          type="email"
          placeholder="Email or Username"
          size="large"
          style={{
            // backgroundColor: theme.fieldBg,
            height: "45px"
          }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
        style={{ marginBottom: "0px" }}>
        <Input.Password
          placeholder="Password"
          size="large"
          style={{
            backgroundColor: theme.fieldBg,
            height: "45px"
          }}
        />
      </Form.Item>
      <div className="mid-password-section">
        <div className="forgot-password" onClick={handleNavigation} aria-hidden>
          Forgot Password?
        </div>
      </div>
      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="Sign in"
        bg={theme.lightPrimaryColor}
        loading={loading}
      />
    </SignInFormWrapper>
  );
};
export default memo(SignInForm);

const SignInFormWrapper = styled(Form)`
  border: 1px solid ${theme.greyBorder};
  background: ${theme.white};
  padding: 30px;
  border-radius: 12px;
  .heading {
    color: ${theme.lightPrimaryColor};
    font-size: 26px;
    text-underline-offset: 6px;
    display: flex;
    justify-content: center;
    text-decoration: underline;
    margin-bottom: 16px;
    font-weight: 600;
  }

  .forgot-password {
    color: ${theme.darkGreyText};
    line-height: 20.4px;
    text-decoration: underline;
    text-align: center;
    cursor: pointer;
  }
  .custom-button {
    margin-top: 16px;
    height: 45px;
  }
  .mid-password-section {
    display: flex;
    justify-content: end;
    margin: 8px 0;
    font-size: ${font.smallFont};
  }
  .ant-input {
    color: black !important;
  }
`;
