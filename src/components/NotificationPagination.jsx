/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Pagination } from "antd";
import { theme } from "@utils/theme";

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
  <div className="flex justify-end mt-[10px] pagination [&_.ant-pagination-prev]:min-w-[14px] [&_.ant-pagination-options]:before:content-['Rows_Per_Page_'] [&_.ant-pagination-options]:before:text-white [&_.ant-pagination]:flex [&_.ant-pagination]:text-white [&_.ant-pagination_li:last-child]:order-[-1] [&_.ant-pagination_li:last-child]:mr-2 [&_.ant-pagination-total]:!text-white [&_.ant-pagination-total]:!text-base [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!text-white [&_.ant-select-selector]:!border-transparent [&_.ant-select-selection-search]:!text-white [&_.ant-select-selection-search-input]:!text-white [&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-item]:!text-base [&_.ant-select_.ant-select-arrow]:right-auto [&_.ant-select_.ant-select-arrow]:left-[11px] [&_.ant-select-show-arrow_.ant-select-selection-item]:pl-[18px] [&_.ant-select-show-arrow_.ant-select-selection-item]:pr-0 [&_.ant-select-suffix_svg]:fill-white [&_.ant-pagination-item]:text-white [&_.ant-pagination-item]:border-white [&_.ant-pagination-item-active]:border-white [&_.ant-pagination-item-active]:bg-transparent [&_.ant-pagination-item-active_a]:text-white [&_.ant-pagination-prev]:text-white [&_.ant-pagination-next]:text-white [&_.ant-pagination-prev_a]:text-white [&_.ant-pagination-next_a]:text-white [&_.ant-pagination-jump-prev]:text-white [&_.ant-pagination-jump-next]:text-white [&_.ant-pagination-jump-prev_span]:text-white [&_.ant-pagination-jump-next_span]:text-white [&_.ant-select-dropdown]:!bg-[#131313] [&_.ant-select-dropdown]:!shadow-lg [&_.ant-select-dropdown_*]:!text-white [&_.ant-select-dropdown_.ant-select-item]:!text-white [&_.ant-select-dropdown_.ant-select-item]:!font-medium [&_.ant-select-dropdown_.ant-select-item]:!text-base [&_.ant-select-dropdown_.ant-select-item-option]:!text-white [&_.ant-select-dropdown_.ant-select-item-option]:!cursor-pointer [&_.ant-select-dropdown_.ant-select-item-option]:!transition-colors [&_.ant-select-dropdown_.ant-select-item-option]:!duration-200 [&_.ant-select-dropdown_.ant-select-item-option-selected]:!text-white [&_.ant-select-dropdown_.ant-select-item-option-selected]:!bg-[rgba(164,22,20,1)] [&_.ant-select-dropdown_.ant-select-item-option-active]:!text-white [&_.ant-select-dropdown_.ant-select-item-option-active]:!bg-[rgba(179,179,179,0.2)] [&_.ant-select-dropdown_.ant-select-item-option-hover]:!text-white [&_.ant-select-dropdown_.ant-select-item-option-hover]:!bg-[rgba(179,179,179,0.2)]">
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: theme.screenBackground,
          colorText: theme.white,
          colorTextTertiary: theme.white,
          colorTextSecondary: theme.white
        },
        components: {
          Pagination: {
            colorPrimary: theme.white,
            colorPrimaryHover: theme.white,
            colorText: theme.white,
            colorTextDisabled: theme.greyText
          },
          Select: {
            colorBgElevated: theme.screenBackground,
            colorText: theme.white,
            colorTextPlaceholder: theme.greyText,
            colorBgContainer: "transparent",
            colorBorder: "transparent",
            optionSelectedBg: theme.primaryColor,
            optionActiveBg: theme.buttonColor,
            optionPadding: "8px 12px",
            optionSelectedColor: theme.white,
            colorTextQuaternary: theme.white
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
  </div>
);
export default memo(NotificationPagination);
