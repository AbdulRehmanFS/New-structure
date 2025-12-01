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
        className="notification-type-radio-group w-full"
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}
      >
        <Radio
          value={1}
          className="text-light-white bg-grey-2 rounded w-full"
          style={{ padding: "5px 20px 5px 7px" }}
        >
          Send Push Notification
        </Radio>
        <Radio
          value={2}
          className="text-light-white bg-grey-2 rounded w-full"
          style={{ padding: "5px 20px 5px 7px" }}
        >
          Send Email Notification
        </Radio>
      </Radio.Group>
    </ConfigProvider>
  );
};

export default NotificationType;

