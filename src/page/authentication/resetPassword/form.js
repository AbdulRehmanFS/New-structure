import { memo } from "react";
import styled from "styled-components";

import { Form, Input,  } from "antd";
import ButtonComponent from "component/fields/button";
import { theme } from "util/theme";
import useResetPassword from "hooks/auth/useResetPassword";


const ResetPasswordForm = () => {
  const { onFinish, loading, formRef } = useResetPassword();

  return (
    <ResetFormWrapper
      name="basic"
      style={{
        width: "100%"
      }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      ref={formRef}>
      <div className="heading">Reset Password</div>
      <Form.Item
        name="password"
        rules={[
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            required: true,
            message:
              "Please enter minimum 8 character, atleast 1 number,1 character and 1 special character"
          }
        ]}
        style={{ marginBottom: "20px" }}>
        <Input.Password
          placeholder="Enter new password"
          size="large"
          style={{
            backgroundColor: theme.fieldBg,
            height: "45px"
          }}
        />
      </Form.Item>
      <Form.Item
        name="confirm-password"
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The new password that you entered do not match!"));
            }
          })
        ]}
        style={{ marginBottom: "10px" }}>
        <Input.Password
          placeholder="Confirm Password"
          size="large"
          style={{
            backgroundColor: theme.fieldBg,
            height: "45px"
          }}
        />
      </Form.Item>
      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="SAVE PASSWORD"
        bg={theme.lightPrimaryColor}
        loading={loading}
      />
    </ResetFormWrapper>
  );
};
export default memo(ResetPasswordForm);

const ResetFormWrapper = styled(Form)`
  border: 1px solid ${theme.greyBorder};
  background: ${theme.white};
  padding: 30px;
  border-radius: 12px;
  .heading {
    color: ${theme.lightPrimaryColor};
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 6px;
    justify-content: center;
    font-size: 24px;
    // margin-top: 20px;
    display: flex;
    gap: 32px;
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
