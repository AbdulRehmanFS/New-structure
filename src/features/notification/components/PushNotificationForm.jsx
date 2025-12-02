import { memo } from "react";
import { Form } from "antd";
import ButtonComponent from "@components/Button";
import SelectComponent from "@components/Select";
import { notificationRole } from "@utils/constant";
import InputComponent from "@components/Input";
import { theme } from "@utils/theme";
import useSendNotification from "../hooks/useSendNotification";

const PushNotificationForm = ({ type }) => {
  const [form, onFinish, loader] = useSendNotification(type);

  return (
    <Form
      name="basic"
      className="w-full [&_.label]:text-light-white [&_.label]:text-sm [&_.label]:font-medium [&_.push-notification-textarea::placeholder]:text-[rgba(196,196,196,0.45)] [&_.custom-button]:mt-[2%]"
      style={{ width: "100%" }}
      initialValues={{}}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label={<label className="label">Select User Type</label>}
        name="user_role"
        rules={[
          {
            required: true,
            message: "Please select your role"
          }
        ]}
        style={{ marginBottom: "10px" }}
      >
        <SelectComponent options={notificationRole} size="middle" />
      </Form.Item>
      <Form.Item
        name="content"
        label={<label className="label">Send Push Notifications</label>}
        rules={[
          {
            required: true,
            message: "Please input your content"
          }
        ]}
      >
        <InputComponent
          className="push-notification-textarea mb-5 [&::placeholder]:text-[rgba(196,196,196,0.45)]"
          rowColumn={5}
          placeholder="Message Body"
          bg="rgba(196, 196, 196, 0)"
          border="rgba(196, 196, 196, 0.45)"
          type="textarea"
        />
      </Form.Item>

      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="Send Push Notification"
        bg={theme.lightPrimaryColor}
        loading={loader}
        height="40px"
        size="large"
      />
    </Form>
  );
};

export default memo(PushNotificationForm);

