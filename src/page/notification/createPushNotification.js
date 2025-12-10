// import { ButtonComponent } from "component/index";
import { ButtonComponent } from "component/index";
import Header from "component/header";
import styled from "styled-components";
import { theme } from "util/theme";
import NotificationType from "./notificationType";
import { useState } from "react";
import PushNotificationForm from "./pushNotificationForm";
import EmailNotificationForm from "./emailNotificationForm";

const CreatePushNotification = () => {
  const [notification, setNotification] = useState(1);

  const handleRadioCheck = (e) => setNotification(e.target.value);
  return (
    <>
      <Header showSearch={false} heading="Notifications" />
      <Wrapper>
        <div className="btns">
          <div className="heading">Push Notification</div>
          <div className="navigate">
            <ButtonComponent
              text="Save Draft"
              width="100px"
              height="30px"
              bg={theme.screenBackground}
              showBorder
            />
            <ButtonComponent text="Send" width="100px" height="30px" bg={theme.primaryColor} />
          </div>
        </div>
        <NotificationType onChange={handleRadioCheck} value={notification} />
        <div className="line" />
        {notification === 1 ? <PushNotificationForm /> : <EmailNotificationForm />}
      </Wrapper>
    </>
  );
};

export default CreatePushNotification;

const Wrapper = styled.div`
  width: 100%;
  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 40px 0px;
  }
  .heading {
    font-size: 18px;
  }
  .navigate {
    display: flex;
    gap: 10px;
  }
  .line {
    height: 1px;
    border-top: 1px solid ${theme.grey2};
    margin: 14px 0;
  }
`;
