/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Pagination } from "antd";
import styled from "styled-components";
import { theme } from "util/theme";
import { LeftDArrowIcon, RightDArrowIcon } from "util/svgFile";

const itemRender = (current, type, originalElement) => {
  if (type === "prev") {
    return <LeftDArrowIcon height="18px" width="18px" />;
  }
  if (type === "next") {
    return <RightDArrowIcon height="18px" width="18px" />;
  }
  return <div className="numbers">{originalElement}</div>;
};

const CustomePagination = ({
  current = 1,
  onPageChange,
  total,
  defaultPageSize,
}) => (
  <PaginationWrapper className="pagination">
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorPrimary: theme.greyText,
            colorPrimaryHover: theme.greyText,
          },
        },
      }}
    >
      <Pagination
        current={current}
        onChange={onPageChange}
        total={total}
        defaultPageSize={defaultPageSize || 15}
        itemRender={itemRender}
        showSizeChanger={false}
      />
    </ConfigProvider>
  </PaginationWrapper>
);
export default memo(CustomePagination);

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
  height: 37px;
  .ant-pagination-next {
    margin-inline-start: 8px;
    justify-content: end;
  }
  .ant-pagination {
    display: flex;
    align-items: center;
    background: ${theme.pagination};
    width: fit-content;
    border-radius: 5px;
    padding: 4px 12px;
  }
  .ant-pagination-item {
    height: 30px;
    min-width: 30px;
  }
  svg {
    fill: white;
  }
  .ant-pagination-next,
  .ant-pagination-prev {
    display: flex;
    align-items: center;
    height: 30px;
  }
`;
