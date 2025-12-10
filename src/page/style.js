import styled from "styled-components";
import { theme } from "../util/theme";

export const OuterWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

export const HeaderSection = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ViewerAction = styled.div`
  display: flex;
  justify-content: center;
  .action {
    display: flex;
    min-width: 84px;
    justify-content: space-between;
    align-items: center;
  }
  .view {
    text-decoration: underline;
    text-underline-offset: 3px;
    color: ${theme.greyText};
  }
  .action-icon {
    cursor: pointer;
  }
`;

export const VerticalFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const Line = styled.div`
  height: ${(props) => props.height || "38px"};
  border-right: ${(props) => props.border || "2px solid"};
  border-color: ${(props) => props.borderColor || "rgba(0, 0, 0, 0.26)"};
  margin: ${(props) => props.margin || "0 8px"};
`;

export const DottedLine = ({ width }) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBlock: "auto"
    }}>
    <LineBetter dashLength="4px" gap="4px" color="#ffffff" width={width ?? "92px"} />
  </div>
);

const LineBetter = styled.div`
  width: ${(props) => props.width || "92px"};
  height: 1px; /* Keeps the line thin */
  position: absolute;

  background: repeating-linear-gradient(
    to right,
    ${(props) => props.color || "#ffffff"},
    ${(props) => props.color || "#ffffff"} ${(props) => props.dashLength || "10px"},
    transparent ${(props) => props.dashLength || "10px"},
    transparent calc(${(props) => props.dashLength || "10px"} + ${(props) => props.gap || "5px"})
  );

  transform: rotate(90deg);
`;

export const UnderLine = styled.div`
  color: ${(props) => props.color || theme.red};
  text-decoration: underline;
  text-underline-offset: 4px;
`;

export const Circle = styled.div`
  height: 12px;
  width: 12px;
  border: 3px solid;
  border-radius: 50px;
  margin: auto;
`;

export const EllipseText = styled.div`
  max-width: ${(props) => props.width || "160px"};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: ${(props) => props.cursor || "false"};
  margin: ${(props) => props.margin || "auto"};
  text-align: ${(props) => props.textAlign || "center"};
`;

export const HorizontalLine = styled.div`
  width: ${(props) => props.width || "100%"};
  border-bottom: ${(props) => props.border || "1px solid"};
  border-color: ${(props) => props.borderColor || "white"};
  margin: ${(props) => props.margin || "8px 0"};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 8px;
  background: ${(props) => props?.bg ?? theme.buttonColor};
  cursor: pointer;
`;

export const Text = styled.div`
  color: ${(props) => props?.color ??theme.fieldBg};
  font-size: ${(props) => props?.fontSize ?? "13px"};
`;

export const FlexRow = styled.div`
  display: flex;
  gap: ${(props) => props.gap || "12px"};
  align-items: center;
`;
