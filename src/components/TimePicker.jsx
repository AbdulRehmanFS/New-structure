import dayjs from "dayjs";
import { ConfigProvider, TimePicker } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { theme } from "@utils/theme";

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
          colorBgElevated: "rgb(38 38 38)",
          colorTextQuaternary: theme.white
        },
        components: {
          DatePicker: {
            colorBgContainer: bg || "rgba(196, 196, 196, 0.24)",
            colorBgContainerDisabled: bg || "rgba(196, 196, 196, 0.24)",
            colorText: theme.white,
            colorTextDisabled: theme.white,
            colorTextPlaceholder: theme.greyText,
            colorBorder: border || theme.wrapperGray,
            controlItemBgActive: theme.primaryColor,
            colorPrimary: theme.white,
            colorPrimaryHover: theme.white
          }
        }
      }}
    >
      <TimePicker
        use12Hours
        format="h:mm a"
        onChange={handleTime}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={value ? dayjs(value, "HH:mm") : null}
        style={{ width: "100%", height: "47px" }}
        className="[&_svg]:fill-white"
      />
    </ConfigProvider>
  );
};

export default TimePickerComponent;

