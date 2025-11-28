import { ConfigProvider, Radio } from "antd";

const NotificationType = ({ onChange, value }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            colorPrimary: "rgba(164, 22, 20, 1)",
            colorBorder: "rgba(255, 255, 255, 0.79)",
            dotSize: 0,
            colorBgContainer: "rgba(255, 255, 255, 0.1)"
          }
        }
      }}
    >
      <Radio.Group
        onChange={onChange}
        value={value}
        className="flex flex-col gap-2.5 w-full [&_.ant-radio-wrapper]:flex [&_.ant-radio-wrapper]:flex-row-reverse [&_.ant-radio-wrapper]:justify-between [&_.ant-radio-wrapper::after]:content-none"
      >
        <Radio
          value={1}
          className="text-light-white bg-grey-2 py-1.5 px-5 pr-1.5 rounded"
        >
          Send Push Notification
        </Radio>
        <Radio
          value={2}
          className="text-light-white bg-grey-2 py-1.5 px-5 pr-1.5 rounded"
        >
          Send Email Notification
        </Radio>
      </Radio.Group>
    </ConfigProvider>
  );
};

export default NotificationType;

