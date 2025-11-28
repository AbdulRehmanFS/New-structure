import { memo, useState } from "react";
import Header from "@layouts/Header";
import NotificationRadio from "../components/NotificationRadio";
import PushNotificationListing from "../components/PushNotificationListing";
import AutomationListing from "../components/AutomationListing";

const Notifications = () => {
  const [notification, setNotification] = useState(1);

  const handleRadioCheck = (e) => setNotification(e);

  return (
    <>
      <Header showSearch={false} heading="Notifications" />
      <div className="scroll-without-header">
        <div className="heading">
          <p className="text-white">
            {notification === 1 ? "Push Notification" : "Automated Notification"}
          </p>
        </div>
        <div className="line" />
        <div className="notification-check">
          <NotificationRadio onChange={handleRadioCheck} value={notification} />
        </div>
        <div className="line" />
        {notification === 1 ? (
          <PushNotificationListing type={notification} />
        ) : (
          <AutomationListing type={notification} />
        )}
      </div>
    </>
  );
};

export default memo(Notifications);
