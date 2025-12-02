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
      className="border border-grey-border bg-white rounded-xl [&_.custom-button]:mt-4 [&_.custom-button]:h-[45px] [&_.ant-input]:!text-black"
    >
      <div className="text-primary-light text-[26px] underline underline-offset-[6px] flex justify-center mb-4 font-semibold">Sign in</div>
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
      <div className="flex justify-end my-2 text-xs">
        <div className="text-dark-grey-text leading-[20.4px] underline text-center cursor-pointer" onClick={handleNavigation} aria-hidden>
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

