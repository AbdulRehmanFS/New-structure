/* eslint-disable react/prop-types */

import styled from "styled-components";
import { AutomatedNotification, PushNotifiation } from "util/svgFile";
import { theme } from "util/theme";

const RadioComponent = ({ onChange, value }) => (
  <RadioGroupWrapper value={value}>
    <div className="push btns" onClick={() => onChange(1)}>
      <PushNotifiation color={value == 1 && theme.white} />
      Push Notification
    </div>
    <div className="auto btns" onClick={() => onChange(2)}>
      <AutomatedNotification color={value == 2 && theme.white} />
      Automated Notification
    </div>
  </RadioGroupWrapper>
);
export default RadioComponent;

const RadioGroupWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  .btns {
    display: flex;
    align-items: center;
    font-size: 16px;
    gap: 10px;
    cursor:pointer;
  }
  .push {
    color: ${(props) => (props.value == 1 ? theme.white : theme.greyText)};
  }
  .auto {
    color: ${(props) => (props.value == 2 ? theme.white : theme.greyText)};
  }
`;
