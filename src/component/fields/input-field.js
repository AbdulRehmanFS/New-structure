/* eslint-disable react/prop-types */
import { ConfigProvider, Input } from "antd";
import { theme } from "util/theme";

const InputComponent = ({
  placeholder = "Enter value",
  type = "text",
  value,
  onChange,
  style,
  rowColumn = 7,
  maxLength = 200,
  bg,
  color = theme.white,
  className,
  border = theme.greyBorder,
  disabled = false,
  onClick,
  numericOnly=false,
  showCount=true
}) => { 
  
  const handleChange = (e) => {
    let inputValue = e.target.value;

    // Apply numeric-only filtering if numericOnly prop is true
    if (numericOnly) {
      // Allow digits and a single decimal point
      inputValue = inputValue.replace(/[^0-9.]/g, ""); // Remove all except digits and "."
      // Prevent multiple decimal points
      if ((inputValue.match(/\./g) || []).length > 1) {
        inputValue = inputValue.slice(0, inputValue.lastIndexOf("."));
      }
    }

    // Call the original onChange with the filtered value
    onChange(inputValue);
  };
  
  
  return(
  <ConfigProvider
    theme={{
      components: {
        Input: {
          colorBgContainer: bg || theme.transparent,
          colorBgContainerDisabled: bg || theme.transparent,
          colorTextPlaceholder: theme.greyText,
          colorPrimary: theme.greyText,
          colorPrimaryActive: theme.greyText,
          colorPrimaryHover:
            border !== "transparent" ? theme.greyText : "transparent",
          colorText: color,
          activeShadow: null,
          colorBorder: border,
          colorTextDescription: theme.greyText,
          colorTextDisabled: color,
        },
      },
    }}
  >
    {type === "textarea" ? (
      <Input.TextArea
        value={value}
        
        placeholder={placeholder}
        rows={rowColumn}
        showCount={showCount}
        maxLength={maxLength}
        onChange={onChange}
        className={className}
        disabled={disabled}
      />
    ) : (
      <Input
        value={value}
        onChange={numericOnly?handleChange:onChange}
        placeholder={placeholder}
        style={{ ...style }}
        type={type}
        className="input-field"
        disabled={disabled}
        onClick={onClick}
      />
    )}
  </ConfigProvider>
)};

export default InputComponent;
