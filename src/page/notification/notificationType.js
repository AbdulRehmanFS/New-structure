/* eslint-disable react/prop-types */
import { ConfigProvider, Radio } from "antd";
import styled from "styled-components";
import { theme } from "util/theme";


const NotificationType = ({ onChange, value }) => (
  <ConfigProvider
    theme={{
      components: {
        Radio: {
          colorPrimary: theme.primaryColor,
          colorBorder: theme.lightWhite,
          dotSize: 0,
          colorBgContainer: theme.grey2,
        },
      },
    }}
  >
    <RadioGroupWrapper onChange={onChange} value={value}>
      <Radio value={1} className="options">
        Send Push Notification
      </Radio>
      <Radio value={2} className="options">
        Send Email Notification
      </Radio>
    </RadioGroupWrapper>
  </ConfigProvider>
);
export default NotificationType;

const RadioGroupWrapper = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  .ant-radio-wrapper {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  .ant-radio-wrapper::after {
    content: none;
  }
  .options {
    color: ${theme.lightWhite};
    background: ${theme.grey2};
    padding: 5px 20px 5px 7px;
    border-radius: 4px;
  }
`;
