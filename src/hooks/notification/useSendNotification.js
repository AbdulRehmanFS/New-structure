import { Form } from "antd";
import Message from "component/messages";
import { useState } from "react";
import { sendNotificationApi } from "service/api/notifications";

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
    if (type === 1) {
      payload["subject"] = subject;
    }
    const res = await sendNotificationApi(payload);
    if (res?.status === 200) {
      Message.success(res);
      form.resetFields();
    } else Message.error(res);
    setLoader(false);
  };
  return [form, onFinish, loader];
};

export default useSendNotification;

