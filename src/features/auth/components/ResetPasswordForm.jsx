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
      className="border border-grey-border bg-white p-8 rounded-xl [&_.heading]:text-primary-light [&_.heading]:font-bold [&_.heading]:underline [&_.heading]:underline-offset-2 [&_.heading]:justify-center [&_.heading]:text-[24px] [&_.heading]:flex [&_.heading]:gap-8 [&_.content]:text-xs [&_.content]:my-4 [&_.content]:text-grey-text [&_.content]:leading-4 [&_.content]:tracking-wide [&_.custom-button]:my-4 [&_.custom-button]:h-[45px] [&_.ant-input]:text-black"
    >
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

