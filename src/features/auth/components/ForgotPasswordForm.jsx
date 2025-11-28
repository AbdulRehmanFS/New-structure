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
      className="border border-grey-border bg-white p-8 rounded-xl [&_.heading]:text-[24px] [&_.heading]:flex [&_.heading]:gap-8 [&_.heading]:text-primary-light [&_.heading]:font-bold [&_.heading]:underline [&_.heading]:underline-offset-2 [&_.heading]:justify-center [&_.content]:text-xs [&_.content]:my-4 [&_.content]:text-grey-text [&_.content]:leading-4 [&_.content]:tracking-wide [&_.custom-button]:my-4 [&_.custom-button]:h-[45px] [&_.ant-input]:text-black"
    >
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

