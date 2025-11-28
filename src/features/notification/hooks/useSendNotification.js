import { Form, message } from "antd";
import { useState } from "react";
import { sendNotificationApi } from "../services/notification.api";

const useSendNotification = (type) => {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    setLoader(true);
    const { user_role, content, subject = "" } = values;
    const payload = {
      user_role,
      type: type,
      content
    };
    if (type === 2) {
      payload["subject"] = subject;
    }
    try {
      const res = await sendNotificationApi(payload);
      if (res?.status === 200) {
        message.success(res?.message || "Notification sent successfully");
        form.resetFields();
      } else {
        message.error(res?.message || "Failed to send notification");
      }
    } catch (error) {
      message.error(error?.message || "Failed to send notification");
    } finally {
      setLoader(false);
    }
  };
  return [form, onFinish, loader];
};

export default useSendNotification;

