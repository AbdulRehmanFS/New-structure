import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";

const NotificationItem = styled.div`
  padding: 20px;
  width: 100%;
  background: ${(props) => (props.isRead ? "#202020" : "#A20A0AB2")};
  border-radius: 11px;
  margin-top: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const IconWrapper = styled.div`
  padding: 14px;
  background: ${(props) => (props.isRead ? "#C4C4C45E" : "#985656")};
  border-radius: 10px;
`;

const NotificationText = styled.div`
  flex: 1;

  p {
    font-size: 18px;
    font-weight: 400;
    margin: 0;
  }

  .time-action {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;
    font-weight: 300;
    font-size: 16px;
  }
`;

const StyledBadge = styled(Badge)`
  .ant-badge-status-dot {
    width: 14px !important;
    height: 14px !important;
    opacity:${(props) => (props.isRead ? 0 : 1)};
  }
`;

const Notification = ({ isRead, message, time }) => {
  return (
    <NotificationItem isRead={isRead}>
      <IconWrapper isRead={isRead}>
        <UserOutlined style={{ fontSize: "24px" }} />
      </IconWrapper>
      <NotificationText>
        <p>{message}</p>
        <div className="time-action">
          {time}{" "}
          <Button type="primary" style={{ padding: "2px 29px", height: "29px" }}>
            View
          </Button>
        </div>
      </NotificationText>
    <StyledBadge color="#d80c0c" dot  isRead={isRead}/>
    </NotificationItem>
  );
};

export default Notification;
