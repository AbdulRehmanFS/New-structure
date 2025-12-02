import { memo } from "react";
import { Form, Input } from "antd";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";
import useForgetPassword from "../hooks/useForgetPassword";

const ForgotForm = () => {
  const { onFinish, loading } = useForgetPassword();

  return (
    <Form
      name="basic"
      style={{ width: "100%" }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      className="border border-grey-border bg-white p-8 rounded-xl [&_.custom-button]:my-4 [&_.custom-button]:h-[45px] [&_.ant-input]:text-black"
    >
      <div className="text-[24px] flex gap-8 text-primary-light font-bold underline underline-offset-2 justify-center">Forgot Password?</div>
      <div className="text-xs my-4 text-grey-text leading-4 tracking-wide">
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
        style={{ marginBottom: "10px" }}
      >
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
    </Form>
  );
};
export default memo(ForgotForm);

