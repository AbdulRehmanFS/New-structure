import styled from "styled-components";
import { theme } from "@utils/theme";

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

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 8px;
  background: ${(props) => props?.bg ?? theme.buttonColor};
  cursor: pointer;
`;

