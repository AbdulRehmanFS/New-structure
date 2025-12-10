import { memo } from "react";
import { Form } from "antd";
import styled from "styled-components";
import ButtonComponent from "component/fields/button";
import { theme } from "util/theme";
import Select from "component/fields/select";
import { notificationRole } from "util/constant";
import InputComponent from "component/fields/input-field";
import useSendNotification from "hooks/notification/useSendNotification";

const EmailNotificationForm = ({ type }) => {
  const [form, onFinish, loader] = useSendNotification(type);

  return (
    <EmailNotificationWrapper
      name="basic"
      style={{
        width: "100%"
      }}
      initialValues={{}}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      form={form}>
      <Form.Item
        label={<label className="label">Select User Type</label>}
        name="user_role"
        rules={[
          {
            required: true,
            message: "Please select your role"
          }
        ]}
        style={{ marginBottom: "10px" }}>
        <Select options={notificationRole} size="middle" />
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
        style={{ marginBottom: "10px" }}>
        <InputComponent
          className="input-field"
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
        ]}>
        <InputComponent
          className="email-notification-textarea"
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
      />
    </EmailNotificationWrapper>
  );
};
export default memo(EmailNotificationForm);

const EmailNotificationWrapper = styled(Form)`
  .email-notification-textarea::placeholder,
  .input-field::placeholder {
    color: ${theme.midGrey};
  }
  .input-field {
    background: ${theme.white};
    color: ${theme.greyText};
  }
  .label {
    color: ${theme.lightWhite};
    font-size: 14px;
    font-weight: 500;
  }
  .custom-button {
    margin-top: 2%;
  }
`;
