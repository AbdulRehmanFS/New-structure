import styled from "styled-components";
import { theme } from "@utils/theme";

export const OuterWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  @media (max-width: 640px) {
    padding: 15px 0;
  }
`;

export const HeaderSection = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
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

export const Line = styled.div`
  height: ${(props) => props.height || "38px"};
  border-right: ${(props) => props.border || "2px solid"};
  border-color: ${(props) => props.borderColor || "rgba(0, 0, 0, 0.26)"};
  margin: ${(props) => props.margin || "0 8px"};
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

export const Text = styled.div`
  color: ${(props) => props?.color ?? theme.fieldBg};
  font-size: ${(props) => props?.fontSize ?? "13px"};
`;

