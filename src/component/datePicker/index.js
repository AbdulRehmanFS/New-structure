/* eslint-disable react/prop-types */
import { ConfigProvider, DatePicker } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import { theme } from "util/theme";

const DateSelector = ({
  onChange,
  height,
  width,
  placeholder,
  bg,
  border,
  disabled = false,
  extraOptions = {},
  value,
  mindate

}) => {
  const dateFormat = "YYYY-MM-DD";

  const handleDateChange = (e) => {
    const updateDate = dayjs(e).format(dateFormat);
    if (onChange) onChange(updateDate);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: "rgb(38 38 38)", // container color
          colorIcon: theme.lightWhite,
          colorSplit: theme.lightWhite,
          colorTextQuaternary: theme.greyText, // previous/next month date color
        },
        components: {
          DatePicker: {
            colorBgContainer: bg || theme.greyButton,
            colorBgContainerDisabled: bg || "rgba(196, 196, 196, 0.24)",
            colorText: theme.lightWhite,
            colorTextDisabled: theme.lightWhite,
            colorTextPlaceholder: theme.midGrey,
            colorBorder: border || theme.greyButton,
          },
        },
      }}
    >
      <DatePickerWrapper
        onChange={handleDateChange}
        placeholder={placeholder || "YYYY-MM-DD"}
        allowClear
        {...extraOptions}
        format={dateFormat}
        height={height}
        width={width}
        disabled={disabled}
        defaultValue={value ? dayjs(value, dateFormat) : null}
        minDate={mindate && dayjs(mindate,dateFormat)}
      />
    </ConfigProvider>
  );
};

export default DateSelector;

const DatePickerWrapper = styled(DatePicker)`
  width: ${(props) => props.width || "105px"};
  height: ${(props) => props.height || "32px"};
 
  svg {
    fill: ${theme.lightWhite};
  }
    
`;
