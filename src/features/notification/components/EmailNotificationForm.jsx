import { memo } from "react";
import { Form } from "antd";
import ButtonComponent from "@components/Button";
import SelectComponent from "@components/Select";
import { notificationRole } from "@utils/constant";
import InputComponent from "@components/Input";
import { theme } from "@utils/theme";
import useSendNotification from "../hooks/useSendNotification";

const EmailNotificationForm = ({ type }) => {
  const [form, onFinish, loader] = useSendNotification(type);

  return (
    <Form
      name="basic"
      className="w-full [&_.label]:text-light-white [&_.label]:text-sm [&_.label]:font-medium [&_.input-field]:bg-white [&_.input-field]:text-grey-text [&_.input-field::placeholder]:text-[rgba(196,196,196,0.45)] [&_.email-notification-textarea::placeholder]:text-[rgba(196,196,196,0.45)] [&_.custom-button]:mt-[2%]"
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
        name="subject"
        label={<label className="label">Email Subject</label>}
        rules={[
          {
            required: true,
            message: "Please input your content"
          }
        ]}
        style={{ marginBottom: "10px" }}
      >
        <InputComponent
          className="input-field bg-white text-grey-text [&::placeholder]:text-[rgba(196,196,196,0.45)]"
          placeholder="Email Title"
          bg="rgba(196, 196, 196, 0)"
          border="rgba(196, 196, 196, 0.45)"
        />
      </Form.Item>
      <Form.Item
        name="content"
        label={<label className="label">Email Body</label>}
        rules={[
          {
            required: true,
            message: "Please input your content"
          }
        ]}
      >
        <InputComponent
          className="email-notification-textarea [&::placeholder]:text-[rgba(196,196,196,0.45)]"
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
        h
      />
    </Form>
  );
};

export default memo(EmailNotificationForm);

