/* eslint-disable react/prop-types */
import { memo } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { theme } from "util/theme";

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
}) => (
  <CustomeButton
    className="custom-button"
    type="primary"
    loading={loading}
    onClick={onClick}
    size={size || "large"}
    htmlType={htmlType || ""}
    bg={bg}
    height={height}
    width={width}
    showBorder={showBorder}
  >
    {text}
  </CustomeButton>
);
export default memo(ButtonComponent);

const CustomeButton = styled(Button)`
  box-shadow: none;
  background-color: ${(props) => props.bg ?? "rgba(0, 0, 0, 0.63)"};
  font-weight: 500;
  height: ${(props) => (props.height ? props.height : "100%")};
  min-width: ${(props) => (props.width ? props.width : "100%")};
  font-family: "Lato";
  color: ${(props) => (props.bg === theme.white ? "grey" : theme.white)};
  border: 1.2px solid
    ${(props) => (props.showBorder ? "rgba(255, 255, 255, 1)" : props.bg)};
  &:hover {
    background-color: ${(props) => props.bg ?? "rgba(0, 0, 0, 0.63)"}!important;
    color: ${(props) =>
      props.bg === theme.white ? "grey" : theme.white}!important;
    border: 1px solid
      ${(props) => (props.bg === theme.white ? "grey" : theme.white)}!important;
  }
`;
