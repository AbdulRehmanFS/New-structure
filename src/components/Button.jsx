/* eslint-disable react/prop-types */
import { memo } from "react";
import { Button } from "antd";
import { theme } from "@utils/theme";

const ButtonComponent = ({
  text = "button",
  loading = false,
  onClick,
  htmlType,
  height,
  width,
  bg,
  size,
  showBorder = false,
}) => {
  // Map string color names to theme values
  const getBgColor = (bgValue) => {
    if (!bgValue) return "rgba(0, 0, 0, 0.63)";
    if (bgValue === "primary") return theme.primaryColor;
    if (bgValue === "primary-light") return theme.lightPrimaryColor;
    if (bgValue === "white") return theme.white;
    if (bgValue === "screen-bg") return theme.screenBackground;
    if (bgValue === "sidebar") return theme.sidebar;
    if (bgValue === "button-color") return theme.buttonColor;
    if (bgValue === "button-dark") return theme.buttonDarkColor;
    return bgValue;
  };

  const buttonBg = getBgColor(bg);
  const buttonColor = buttonBg === theme.white ? "grey" : theme.white;
  const borderColor = showBorder ? "rgba(255, 255, 255, 1)" : buttonBg;

  return (
    <Button
      className="custom-button"
      type="primary"
      loading={loading}
      onClick={onClick}
      size={size || "large"}
      htmlType={htmlType || ""}
      style={{
        boxShadow: "none",
        backgroundColor: buttonBg,
        fontWeight: 500,
        height: height ? height : "100%",
        width: width ? width : "auto",
        minWidth: width ? width : "100%",
        fontFamily: "Lato",
        color: buttonColor,
        border: `1.2px solid ${borderColor}`,
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = buttonBg + " !important";
        e.target.style.color = buttonColor + " !important";
        e.target.style.border = `1px solid ${buttonBg === theme.white ? "grey" : theme.white} !important`;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = buttonBg + " !important";
        e.target.style.color = buttonColor + " !important";
        e.target.style.border = `1.2px solid ${borderColor} !important`;
      }}
    >
      {text}
    </Button>
  );
};
export default memo(ButtonComponent);

