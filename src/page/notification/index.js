import { memo, useState } from "react";
import styled from "styled-components";
import Header from "component/header";
import RadioComponent from "component/fields/radio";

import { theme } from "util/theme";
import PustNotificationListing from "./pushNotificationlisting";
import Automationlisting from "./Automationlisting";

const Notifications = () => {
  const [notification, setNotification] = useState(1);

  const handleRadioCheck = (e) => setNotification(e);
  setNotification;

  return (
    <>
      <Header showSearch={false} heading="Notifications" />
      <NotificationsWrapper className="scroll-without-header">
        <div className="heading">
          {notification == 1 ? <p>Push Notification</p> : <p>Automated Notification</p>}
        </div>
        <div className="line" />
        <div className="notification-check ">
          <RadioComponent name="" onChange={handleRadioCheck} value={notification} />
        </div>
        <div className="line" />
        {notification === 1 ? (
          <PustNotificationListing type={notification} />
        ) : (
          <Automationlisting type={notification} />
        )}
      </NotificationsWrapper>
    </>
  );
};
export default memo(Notifications);

const NotificationsWrapper = styled.div`
  .notification-check {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
  }
  .line {
    height: 1px;
    border-top: 1px solid ${theme.grey2};
    margin: 14px 0;
  }
`;
