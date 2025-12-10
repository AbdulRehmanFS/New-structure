import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import styled from "styled-components";
import Notification from "./notificationListItem";
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
  const navigate = useNavigate()
  return (
    <StyledDrawer open={open} onClose={onClose} placement="top" height="100vh">
      <div className="drawer-content">
        <div className="header">
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
          className={`${activeTab === "unread" ? "custom-button custom-button-primary" : ""}`}
          type={`${activeTab === "unread" ? "primary" : "text"}  `}>
          Unread
        </Button>
        <Button
          onClick={() => setActiveTab("all")}
          className={`${activeTab === "all" ? "custom-button custom-button-primary" : ""}`}
          type={`${activeTab === "all" ? "primary" : "text"}  `}>
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
        <p style={{ textAlign: "center", cursor: "pointer", marginTop: "55px",fontSize:"20px"}} onClick={()=>navigate("/notification-activity")}>View All</p>
      </div>
    </StyledDrawer>
  );
};
const StyledDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    height: 100vh !important;
    background: #000 !important;
  }

  .ant-drawer-header {
    display: none;
  }

  .ant-drawer-body {
    background-color: #2e2e2e;
  }

  .drawer-content {
    max-width: 1000px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    margin: auto;
    font-family: Lato;
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 20px;
  }

  .custom-button-primary {
    background: #454444 !important;
    border: none;
  }

  .custom-button {
    margin-right: 10px;
    font-size: 16px;
  }
`;

export default FullScreenDrawer;
