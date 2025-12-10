
const { RangePicker } = DatePicker;
import { theme } from "util/theme";
import { ConfigProvider, DatePicker } from "antd";
import styled from "styled-components";
import { pickerDateFormat } from "util/constant";

const RangeSelector = ({ disabled = false, defaultValue = [] }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: theme.backgroundGray, // container background
          colorSplit: theme.white,
          colorTextQuaternary: theme.greyText, // previous/next month date color
        },
        components: {
          DatePicker: {
            colorBgContainer: theme.wrapperGray, // used to change the bg color of datepicker-field
            colorText: theme.white,
            colorTextPlaceholder: theme.greyText,
            colorBorder: theme.wrapperGray,
            cellActiveWithRangeBg: theme.fieldGray, // used to show the selected range background
            colorTextHeading: theme.greyText, // used to change the heading color in calender
            colorPrimary: theme.primaryColor,
            colorPrimaryHover: theme.primaryColor,
          },
        },
      }}
    >
      <DatePickerWrapper
        format={pickerDateFormat}
        value={defaultValue}
        disabled={disabled}
        suffixIcon={null}
      />
    </ConfigProvider>
  );
};

export default RangeSelector;

const DatePickerWrapper = styled(RangePicker)`
  width: 235px;
  svg {
    fill: ${theme.lightWhite};
  }
`;
