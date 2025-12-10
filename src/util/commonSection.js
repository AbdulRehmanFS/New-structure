/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { memo } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { message } from "antd";

function BackButton({ icon }) {
  const navigate = useNavigate();

  const handleBackNavigate = () => navigate(-1);

  return (
    <BackButtonWrapper className="back-button" onClick={handleBackNavigate}>
      {icon || <LeftOutlined />}
    </BackButtonWrapper>
  );
}
export default memo(BackButton);

export function DetailDescription({ content, heading = "Description" }) {

  return (
    <OuterWrapper gap="0">
      <div className="heading">{heading}</div>
      <DetailWrapper>{content}</DetailWrapper>
    </OuterWrapper>
  );
}

export function NoData() {
  return (
    <div className="scroll-without-header flex-wrap no-data">No Data Found</div>
  );
}

export const errorMessage = (msg) =>
  message.error( msg?.message ||msg || "Something went wrong");

export const ListNoData = () => (
  <NoContent className="no-data">No Data Found</NoContent>
);

const NoContent = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
`;

const DetailWrapper = styled.div`
  padding: 10px;
  max-height: 200px;
  overflow: auto;
`;

const BackButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  svg {
    height: 14px;
    width: 14px;
    path {
      fill: white;
    }
  }
`;

const VerticalDirection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || "10px"};
`;

const OuterWrapper = styled(VerticalDirection)`
  .heading {
    font-size: 18px;
    font-weight: bold;
  }
`;
