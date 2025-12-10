import { memo } from "react";
import styled from "styled-components";
import { Form, Input } from "antd";
import ButtonComponent from "component/fields/button";
import { theme } from "util/theme";
import useForgetPassword from "hooks/auth/useForgetPassword";

const ForgotForm = () => {
  const { onFinish, loading } = useForgetPassword();

  return (
    <ForgotFormWrapper
      name="basic"
      style={{
        width: "100%"
      }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off">
      <div className="heading">Forgot Password?</div>
      <div className="content">
        Please enter your registered email id. We will send the verification code to reset your
        password.
      </div>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!"
          }
        ]}
        style={{ marginBottom: "10px" }}>
        <Input
          type="email"
          placeholder="Email"
          size="large"
          style={{
            backgroundColor: theme.midGrey,
            height: "45px"
          }}
        />
      </Form.Item>
      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="SEND LINK"
        bg={theme.lightPrimaryColor}
        loading={loading}
      />
    </ForgotFormWrapper>
  );
};
export default memo(ForgotForm);

const ForgotFormWrapper = styled(Form)`
  border: 1px solid ${theme.greyBorder};
  background: ${theme.white};
  padding: 30px;
  border-radius: 12px;
  .heading {
    font-size: 24px;
    display: flex;
    gap: 32px;
    color: ${theme.lightPrimaryColor};
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 6px;
    justify-content: center;
  }
  .back-icon {
    display: flex;
    svg {
      height: 20px;
      width: 20px;
    }
    cursor: pointer;
  }
  .content {
    font-size: 12px;
    margin: 16px 0;
    color: ${theme.greyText};
    line-height: 16px;
    word-spacing: 3px;
  }
  .custom-button {
    margin: 16px 0 10px 0;
    height: 45px;
  }
  .ant-input {
    color: black;
  }
`;
