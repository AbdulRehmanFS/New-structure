import { memo } from "react";
import { Form } from "antd";
import ButtonComponent from "@components/Button";
import SelectComponent from "@components/Select";
import { notificationRole } from "@utils/constant";
import InputComponent from "@components/Input";
import useSendNotification from "../hooks/useSendNotification";

const EmailNotificationForm = ({ type }) => {
  const [form, onFinish, loader] = useSendNotification(type);

  return (
    <Form
      name="basic"
      style={{ width: "100%" }}
      initialValues={{}}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label={<label className="text-light-white text-sm font-medium">Select User Type</label>}
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
        label={<label className="text-light-white text-sm font-medium">Email Subject</label>}
        rules={[
          {
            required: true,
            message: "Please input your content"
          }
        ]}
        style={{ marginBottom: "10px" }}
      >
        <InputComponent
          className="placeholder:text-mid-grey bg-white text-grey-text"
          placeholder="Email Title"
          bg="rgba(196, 196, 196, 0)"
          border="rgba(196, 196, 196, 0.45)"
        />
      </Form.Item>
      <Form.Item
        name="content"
        label={<label className="text-light-white text-sm font-medium">Email Body</label>}
        rules={[
          {
            required: true,
            message: "Please input your content"
          }
        ]}
      >
        <InputComponent
          className="placeholder:text-mid-grey"
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
        bg="primary-light"
        loading={loader}
      />
    </Form>
  );
};

export default memo(EmailNotificationForm);

