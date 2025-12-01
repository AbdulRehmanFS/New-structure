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
  color,
}) => {
  const backgroundColor = bg ?? "rgba(0, 0, 0, 0.63)";
  const isWhiteBg = backgroundColor === theme.white;
  const textColor = isWhiteBg ? (color ?? "grey") : theme.white;
  const defaultBorderColor = showBorder ? "rgba(255, 255, 255, 1)" : backgroundColor;
  const hoverBorderColor = isWhiteBg ? (color ?? "grey") : theme.white;

  return (
    <Button
      className="custom-button shadow-none font-medium font-['Lato'] hover:!bg-[var(--btn-bg)] hover:!text-[var(--btn-hover-text)] hover:!border-[1px] hover:!border-[var(--btn-hover-border)]"
      type="primary"
      loading={loading}
      onClick={onClick}
      size={size || "large"}
      htmlType={htmlType || ""}
      style={{
        "--btn-bg": backgroundColor,
        "--btn-text": textColor,
        "--btn-border": defaultBorderColor,
        "--btn-hover-text": hoverBorderColor,
        "--btn-hover-border": hoverBorderColor,
        boxShadow: "none",
        backgroundColor: "var(--btn-bg)",
        fontWeight: 500,
        height: height || "100%",
        minWidth: width || "100%",
        fontFamily: "Lato",
        color: "var(--btn-text)",
        border: "1.2px solid var(--btn-border)",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(height && {
          paddingTop: 0,
          paddingBottom: 0,
          lineHeight: height,
        }),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid var(--btn-hover-border)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1.2px solid var(--btn-border)";
      }}
    >
      {text}
    </Button>
  );
};

export default memo(ButtonComponent);
