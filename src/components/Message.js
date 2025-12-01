import { message } from "antd";

const durationTime = 3;
const messageKey = "This is a normal message.";
const wrong = "Something went wrong.";

const success = (res) => {
  const mess =
    res?.response?.data?.message || res?.message || res?.error || res || wrong;
  message.success({
    content: mess,
    duration: durationTime,
    key: messageKey,
    onClick: () => message.destroy(messageKey),
  });
};

const error = (res) => {
  const mess =
    res?.response?.data?.message || res?.message || res?.error || res || wrong;
  message.error({
    content: mess,
    duration: durationTime,
    key: messageKey,
    onClick: () => message.destroy(messageKey),
  });
};

const Message = {
  success,
  error,
};

export default Message;

