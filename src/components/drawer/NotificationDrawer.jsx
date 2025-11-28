import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import Notification from "./NotificationListItem";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    message: "You have 20 new Content Creator submission requests.",
    time: "Now",
    isRead: false
  },
  {
    id: 2,
    message: "Your profile update was successful.",
    time: "10 mins ago",
    isRead: false
  },
  {
    id: 3,
    message: "New collaboration request from John Doe.",
    time: "1 hour ago",
    isRead: false
  },
  {
    id: 4,
    message: "Payment for Invoice #1234 has been completed.",
    time: "2 hours ago",
    isRead: false
  },
  {
    id: 5,
    message: "Reminder: Meeting scheduled at 3 PM.",
    time: "Today",
    isRead: false
  }
];
const notificationTwo = [
  {
    id: 1,
    message: "You have 20 new Content Creator submission requests.",
    time: "1 day ago",
    isRead: true
  },
  {
    id: 2,
    message: "Your profile update was successful.",
    time: "2 day ago",
    isRead: true
  },
  {
    id: 3,
    message: "New collaboration request from John Doe.",
    time: "3 hours ago",
    isRead: true
  }
];

const FullScreenDrawer = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("unread");
  const navigate = useNavigate();
  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="top"
      height="100vh"
      className="[&_.ant-drawer-content-wrapper]:!h-screen [&_.ant-drawer-content-wrapper]:!bg-black [&_.ant-drawer-header]:hidden [&_.ant-drawer-body]:bg-[#2e2e2e]"
    >
      <div className="max-w-[1000px] w-full p-5 box-border mx-auto font-[Lato]">
        <div className="w-full flex justify-between items-start mb-5">
          <div className="title">
            <h1 style={{ fontSize: "48px", fontWeight: "400" }}>
              Notifications{" "}
              <span
                style={{
                  padding: "12px 21px",
                  background: "#454444",
                  fontSize: "32px",
                  borderRadius: "12px",
                  marginLeft: "5px"
                }}>
                5
              </span>
            </h1>
            <p style={{ fontWeight: "500", fontSize: "24px" }}>
              Stay Updated with Your Latest Notifications
            </p>
          </div>

          <CloseOutlined
            style={{ fontSize: "34px", cursor: "pointer" }}
            onClick={() => onClose()}
          />
        </div>

        <Button
          onClick={() => setActiveTab("unread")}
          className={`mr-2.5 text-base ${
            activeTab === "unread" ? "!bg-[#454444] !border-none" : ""
          }`}
          type={activeTab === "unread" ? "primary" : "text"}
        >
          Unread
        </Button>
        <Button
          onClick={() => setActiveTab("all")}
          className={`mr-2.5 text-base ${
            activeTab === "all" ? "!bg-[#454444] !border-none" : ""
          }`}
          type={activeTab === "all" ? "primary" : "text"}
        >
          All
        </Button>
        <p style={{ fontSize: "32px", fontWeight: "600", marginTop: "36px" }}>Today</p>
        {notifications.map((item) => (
          <Notification
            key={item.id}
            isRead={item.isRead}
            message={item.message}
            time={item.time}
          />
        ))}
        <p style={{ fontSize: "32px", fontWeight: "600", marginTop: "36px" }}>Yesterday</p>
        {notificationTwo.map((item) => (
          <Notification
            key={item.id}
            isRead={item.isRead}
            message={item.message}
            time={item.time}
          />
        ))}
        <p
          style={{
            textAlign: "center",
            cursor: "pointer",
            marginTop: "55px",
            fontSize: "20px"
          }}
          onClick={() => navigate("/notification-activity")}
        >
          View All
        </p>
      </div>
    </Drawer>
  );
};

export default FullScreenDrawer;

