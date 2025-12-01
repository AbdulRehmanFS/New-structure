import { memo } from "react";
import { Form, Input } from "antd";
import ButtonComponent from "@components/Button";
import { theme, font } from "@utils/theme";
import useSignIn from "../hooks/useSignIn";

const SignInForm = () => {
  const { onFinish, loading, handleNavigation } = useSignIn();

  return (
    <Form
      name="basic"
      style={{ width: "100%", padding: "30px" }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      className="border border-grey-border bg-white rounded-xl [&_.heading]:text-primary-light [&_.heading]:text-[26px] [&_.heading]:underline [&_.heading]:underline-offset-[6px] [&_.heading]:flex [&_.heading]:justify-center [&_.heading]:mb-4 [&_.heading]:font-semibold [&_.forgot-password]:text-dark-grey-text [&_.forgot-password]:leading-[20.4px] [&_.forgot-password]:underline [&_.forgot-password]:text-center [&_.forgot-password]:cursor-pointer [&_.custom-button]:mt-4 [&_.custom-button]:h-[45px] [&_.mid-password-section]:flex [&_.mid-password-section]:justify-end [&_.mid-password-section]:my-2 [&_.mid-password-section]:text-xs [&_.ant-input]:!text-black"
    >
      <div className="heading">Sign in</div>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!"
          }
        ]}
        style={{ marginBottom: "18px" }}
      >
        <Input
          type="email"
          placeholder="Email or Username"
          size="large"
          style={{
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
        style={{ marginBottom: "0px" }}
      >
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
        height="45px"
      />
    </Form>
  );
};
export default memo(SignInForm);

