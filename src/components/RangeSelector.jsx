import { ConfigProvider, DatePicker } from "antd";
import { pickerDateFormat } from "@utils/constant";
import { theme } from "@utils/theme";

const { RangePicker } = DatePicker;

const RangeSelector = ({ disabled = false, defaultValue = [] }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: theme.screenBackground, // container background
          colorSplit: theme.white,
          colorTextQuaternary: theme.greyText, // previous/next month date color
        },
        components: {
          DatePicker: {
            colorBgContainer: theme.buttonColor, // used to change the bg color of datepicker-field
            colorText: theme.white,
            colorTextPlaceholder: theme.greyText,
            colorBorder: theme.buttonColor,
            cellActiveWithRangeBg: theme.formField, // used to show the selected range background
            colorTextHeading: theme.greyText, // used to change the heading color in calender
            colorPrimary: theme.primaryColor,
            colorPrimaryHover: theme.primaryColor,
          },
        },
      }}
    >
      <RangePicker
        format={pickerDateFormat}
        value={defaultValue}
        disabled={disabled}
        suffixIcon={null}
        className="w-[235px] [&_svg]:fill-white"
      />
    </ConfigProvider>
  );
};

export default RangeSelector;

