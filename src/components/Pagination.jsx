/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Pagination } from "antd";
import { theme } from "@utils/theme";
import { LeftDArrowIcon, RightDArrowIcon } from "@utils/svgFile";

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
  <div className="custom-pagination-wrapper">
    <style>{`
      .custom-pagination-wrapper {
        display: flex;
        justify-content: end;
        margin-top: 30px;
        height: 37px;
      }
      .custom-pagination-wrapper .ant-pagination-next {
        margin-inline-start: 8px;
        justify-content: end;
      }
      .custom-pagination-wrapper .ant-pagination {
        display: flex;
        align-items: center;
        background: ${theme.pagination};
        width: fit-content;
        border-radius: 5px;
        padding: 4px 12px;
      }
      .custom-pagination-wrapper .ant-pagination-item {
        height: 30px;
        min-width: 30px;
        background: transparent !important;
        border-color: transparent !important;
      }
      .custom-pagination-wrapper .ant-pagination-item a {
        background: transparent !important;
        color: white;
      }
      .custom-pagination-wrapper .ant-pagination-item-active {
        background: white !important;
        border-color: white !important;
        border-radius: 2px;
      }
      .custom-pagination-wrapper .ant-pagination-item-active::before {
        display: none;
      }
      .custom-pagination-wrapper .ant-pagination-item-active a {
        background: white !important;
        color: ${theme.greyText} !important;
        border-radius: 2px;
      }
      .custom-pagination-wrapper .ant-pagination-item-active:hover {
        background: white !important;
        border-color: white !important;
      }
      .custom-pagination-wrapper .ant-pagination-item-active:hover a {
        background: white !important;
        color: ${theme.greyText} !important;
      }
      .custom-pagination-wrapper .ant-pagination-item:hover:not(.ant-pagination-item-active) {
        background: transparent !important;
        border-color: transparent !important;
      }
      .custom-pagination-wrapper .ant-pagination-item:hover:not(.ant-pagination-item-active) a {
        background: transparent !important;
        color: white;
      }
      .custom-pagination-wrapper .ant-pagination-prev,
      .custom-pagination-wrapper .ant-pagination-next {
        background: transparent !important;
        border-color: transparent !important;
      }
      .custom-pagination-wrapper .ant-pagination-prev button,
      .custom-pagination-wrapper .ant-pagination-next button {
        background: transparent !important;
        border-color: transparent !important;
        color: white;
      }
      .custom-pagination-wrapper svg {
        fill: white;
      }
      .custom-pagination-wrapper .ant-pagination-next,
      .custom-pagination-wrapper .ant-pagination-prev {
        display: flex;
        align-items: center;
        height: 30px;
      }
    `}</style>
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
  </div>
);
export default memo(CustomePagination);

