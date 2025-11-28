import { UserOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";

const Notification = ({ isRead, message, time }) => {
  return (
    <div
      className={`p-5 w-full rounded-[11px] mt-6 flex items-center justify-between gap-5 ${
        isRead ? "bg-[#202020]" : "bg-[#A20A0AB2]"
      }`}
    >
      <div
        className={`p-3.5 rounded-[10px] ${
          isRead ? "bg-[#C4C4C45E]" : "bg-[#985656]"
        }`}
      >
        <UserOutlined style={{ fontSize: "24px" }} />
      </div>
      <div className="flex-1">
        <p className="text-lg font-normal m-0 text-white">{message}</p>
        <div className="inline-flex justify-between w-full mt-2 font-light text-base text-white">
          <span>{time}</span>
          <Button type="primary" style={{ padding: "2px 29px", height: "29px" }}>
            View
          </Button>
        </div>
      </div>
      <Badge
        color="#d80c0c"
        dot
        className={`[&_.ant-badge-status-dot]:!w-3.5 [&_.ant-badge-status-dot]:!h-3.5 ${
          isRead ? "[&_.ant-badge-status-dot]:opacity-0" : "[&_.ant-badge-status-dot]:opacity-100"
        }`}
      />
    </div>
  );
};

export default Notification;

