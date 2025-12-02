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
        <div>
          <p className="text-white">
            {notification === 1 ? "Push Notification" : "Automated Notification"}
          </p>
        </div>
        <div className="h-px border-t border-white/10 my-[14px]" />
        <div className="flex justify-between items-center py-[5px]">
          <NotificationRadio onChange={handleRadioCheck} value={notification} />
        </div>
        <div className="h-px border-t border-white/10 my-[14px]" />
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
