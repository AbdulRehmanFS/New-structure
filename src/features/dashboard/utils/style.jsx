import { theme } from "@utils/theme";

export const DottedLine = ({ width }) => (
  <div
    className="relative flex justify-center items-center my-auto"
    style={{
      width: width ?? "92px",
      height: "1px",
      background: `repeating-linear-gradient(
        to right,
        #ffffff,
        #ffffff 4px,
        transparent 4px,
        transparent calc(4px + 4px)
      )`,
      transform: "rotate(90deg)"
    }}
  />
);

export const HorizontalLine = ({ width, border, borderColor, margin }) => (
  <div
    style={{
      width: width || "100%",
      borderBottom: border || "1px solid",
      borderColor: borderColor || "white",
      margin: margin || "8px 0"
    }}
  />
);

