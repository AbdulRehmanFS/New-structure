/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { ConfigProvider, TimePicker } from "antd";
import styled from "styled-components";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { theme } from "util/theme";

dayjs.extend(customParseFormat);

const TimePickerComponent = (props) => {
  const { onChange, placeholder = "Select Time", bg, border, disabled = false, value } = props;

  const handleTime = (time, timeString) => {
    if (onChange) onChange(timeString);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: "rgb(38 38 38)", // container background
          colorTextQuaternary: theme.white // icon color change//previous/next month date color
        },
        components: {
          DatePicker: {
            colorBgContainer: bg || "rgba(196, 196, 196, 0.24)", // used to change the bg color of datepicker-field
            colorBgContainerDisabled: bg || "rgba(196, 196, 196, 0.24)",
            colorText: theme.white,
            colorTextDisabled: theme.white,
            colorTextPlaceholder: theme.greyText,
            colorBorder: border || theme.wrapperGray,
            controlItemBgActive: theme.primaryColor, // used to show the selected range background
            colorPrimary: theme.white,
            colorPrimaryHover: theme.white
          }
        }
      }}>
      <TimePickerWrapper
        use12Hours
        format="h:mm a"
        prefixCls="time-picker"
        onChange={handleTime}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={value ? dayjs(value, "HH:mm") : null}
      />
    </ConfigProvider>
  );
};

export default TimePickerComponent;

const TimePickerWrapper = styled(TimePicker)`
  width: 100%;
  height: 47px;
  svg {
    fill: ${theme.lightWhite};
  }
`;
