import { useState } from "react";
import Header from "@layouts/Header";
import ButtonComponent from "@components/Button";
import NotificationType from "../components/NotificationType";
import PushNotificationForm from "../components/PushNotificationForm";
import EmailNotificationForm from "../components/EmailNotificationForm";

const CreatePushNotification = () => {
  const [notification, setNotification] = useState(1);

  const handleRadioCheck = (e) => setNotification(e.target.value);

  return (
    <>
      <Header showSearch={false} heading="Notifications" />
      <div className="w-full">
        <div className="flex justify-between items-center w-full my-10">
          <div className="text-lg text-white">Push Notification</div>
          <div className="flex gap-2.5">
            <ButtonComponent
              text="Save Draft"
              width="100px"
              height="30px"
              bg="screen-bg"
              showBorder
            />
            <ButtonComponent
              text="Send"
              width="100px"
              height="30px"
              bg="primary"
            />
          </div>
        </div>
        <NotificationType onChange={handleRadioCheck} value={notification} />
        <div className="line" />
        {notification === 1 ? (
          <PushNotificationForm type={1} />
        ) : (
          <EmailNotificationForm type={2} />
        )}
      </div>
    </>
  );
};

export default CreatePushNotification;
