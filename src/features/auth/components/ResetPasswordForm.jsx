import { memo } from "react";
import { Form, Input } from "antd";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";
import useResetPassword from "../hooks/useResetPassword";

const ResetPasswordForm = () => {
  const { onFinish, loading, formRef } = useResetPassword();

  return (
    <Form
      name="basic"
      style={{ width: "100%" }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      ref={formRef}
      className="border border-grey-border bg-white p-8 rounded-xl [&_.custom-button]:my-4 [&_.custom-button]:h-[45px] [&_.ant-input]:text-black"
    >
      <div className="text-primary-light font-bold underline underline-offset-2 justify-center text-[24px] flex gap-8">Reset Password</div>
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
        style={{ marginBottom: "20px" }}
      >
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
        style={{ marginBottom: "10px" }}
      >
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
    </Form>
  );
};
export default memo(ResetPasswordForm);

