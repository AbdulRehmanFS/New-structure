/* eslint-disable react/prop-types */
import { Skeleton } from "antd";
import styled from "styled-components";

function CreatorLoader({ count = [1, 2] }) {
  return (
    <LoaderWrapper>
      {count.map((list) => (
        <div key={list} className="multiple-row">
          <Skeleton.Avatar active size="small" shape="rectangle" />
          <Skeleton.Input size="small" active className="ant-skeleton-input" />
        </div>
      ))}
    </LoaderWrapper>
  );
}

export const ParagraphLoader = ({ rows = 2, avatar = false }) => (
  <LoaderWrapper>
    <Skeleton
      active
      avatar={avatar}
      paragraph={{
        rows,
      }}
    />
  </LoaderWrapper>
);

export default CreatorLoader;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .multiple-row {
    display: flex;
    gap: 5px;
  }
  .ant-skeleton-input {
    width: 90% !important;
  }
  .ant-skeleton {
    span,
    li,
    h3 {
      background-image: linear-gradient(
        90deg,
        rgba(178, 178, 178, 0.2) 25%,
        rgba(164, 164, 164, 0.04) 37%,
        rgba(154, 154, 154, 0.2) 63%
          /* rgba(0, 0, 0, 0.2) 25%,
      rgba(0, 0, 0, 0.3) 37%,
      rgba(0, 0, 0, 0.09) 63% */
      ) !important;
    }
  }
`;
