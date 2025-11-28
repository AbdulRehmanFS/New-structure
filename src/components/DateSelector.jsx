import { ConfigProvider, DatePicker } from "antd";
import dayjs from "dayjs";
import { theme } from "@utils/theme";

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
          colorBgElevated: "rgb(38 38 38)",
          colorIcon: theme.lightWhite,
          colorSplit: theme.lightWhite,
          colorTextQuaternary: theme.greyText,
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
      <DatePicker
        onChange={handleDateChange}
        placeholder={placeholder || "YYYY-MM-DD"}
        allowClear
        {...extraOptions}
        format={dateFormat}
        style={{ width: width || "105px", height: height || "32px" }}
        disabled={disabled}
        defaultValue={value ? dayjs(value, dateFormat) : null}
        minDate={mindate ? dayjs(mindate, dateFormat) : null}
        className="[&_svg]:fill-white"
      />
    </ConfigProvider>
  );
};

export default DateSelector;
