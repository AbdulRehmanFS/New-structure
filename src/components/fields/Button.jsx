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
  const buttonBg = bg ?? "rgba(0, 0, 0, 0.63)";
  const buttonColor = bg === theme.white ? "grey" : theme.white;
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
        minWidth: width ? width : "100%",
        fontFamily: "Lato",
        color: buttonColor,
        border: `1.2px solid ${borderColor}`,
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = buttonBg + " !important";
        e.target.style.color = buttonColor + " !important";
        e.target.style.border = `1px solid ${bg === theme.white ? "grey" : theme.white} !important`;
      }}
    >
      {text}
    </Button>
  );
};
export default memo(ButtonComponent);

