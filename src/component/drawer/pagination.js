/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Pagination } from "antd";
import styled from "styled-components";
import { theme } from "util/theme";

const itemRender = (current, type, originalElement) => {
  if (type === "prev" || type === "next") return <div className="numbers">{originalElement}</div>;
  return null;
};

const NotificationPagination = ({
  current = 1,
  onPageChange,
  total = 1,
  pageSizeChange = () => {}
}) => (
  <PaginationWrapper className="pagination">
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorPrimary: theme.white,
            colorPrimaryHover: theme.white,
            colorText: theme.white,
            colorTextDisabled: theme.greyText
          }
        }
      }}>
      <Pagination
        showSizeChanger
        current={current}
        defaultPageSize={5}
        onChange={onPageChange}
        total={total}
        showTotal={(total, range) => `${range[0]}-${range[1]} of about ${total} pages`}
        pageSizeOptions={[5, 10, 20, 30, 40]}
        itemRender={itemRender}
        locale={{ items_per_page: "" }}
        onShowSizeChange={pageSizeChange}
      />
    </ConfigProvider>
  </PaginationWrapper>
);
export default memo(NotificationPagination);

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;

  .ant-pagination-prev {
    min-width: 14px;
  }
  .ant-pagination-options::before {
    content: "Rows Per Page ";
  }
  // used to move rowPerPage section in first position
  .ant-pagination {
    display: flex;
  }
  .ant-pagination li:last-child {
    order: -1;
    margin-right: 8px;
  }
  //used to change the theme of pagination selector input field
  .ant-select-selector {
    background: transparent !important;
    color: ${theme.white};
    border-color: transparent !important;
  }
  .ant-select-selection-search {
    color: ${theme.white}; //text color of input
  }
  //used to change the position of down arrow of select and input padding
  .ant-select .ant-select-arrow {
    inset-inline-end: auto;
    inset-inline-start: 11px;
  }
  .ant-select-show-arrow .ant-select-selection-item {
    padding-inline-start: 18px;
    padding-inline-end: 0px;
  }
  .ant-select-suffix svg {
    fill: ${theme.white};
  }
  // pagination per-page dropdown css
  .ant-select-dropdown {
    background: rgba(48, 48, 48, 1);
  }
  .ant-select-item-option {
    color: ${theme.white};
  }
`;
