/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Pagination } from "antd";
import { theme } from "@utils/theme";
import { LeftDArrowIcon, RightDArrowIcon } from "@utils/svgFile";

const itemRender = (current, type, originalElement) => {
  if (type === "prev") {
    return (
      <div className="flex items-center justify-center h-full">
        <LeftDArrowIcon height="18px" width="18px" />
      </div>
    );
  }
  if (type === "next") {
    return (
      <div className="flex items-center justify-center h-full">
        <RightDArrowIcon height="18px" width="18px" />
      </div>
    );
  }
  return <div className="numbers">{originalElement}</div>;
};

const CustomePagination = ({
  current = 1,
  onPageChange,
  total,
  defaultPageSize,
}) => (
  <div className="flex justify-end mt-[30px] h-[37px] [&_.ant-pagination-next]:ml-2 [&_.ant-pagination-next]:justify-end [&_.ant-pagination]:flex [&_.ant-pagination]:items-center [&_.ant-pagination]:bg-pagination [&_.ant-pagination]:w-fit [&_.ant-pagination]:rounded-[5px] [&_.ant-pagination]:py-1 [&_.ant-pagination]:px-3 [&_.ant-pagination-item]:h-[30px] [&_.ant-pagination-item]:min-w-[30px] [&_.ant-pagination-item]:!bg-transparent [&_.ant-pagination-item]:!border-transparent [&_.ant-pagination-item_a]:!bg-transparent [&_.ant-pagination-item_a]:text-white [&_.ant-pagination-item-active]:!bg-white [&_.ant-pagination-item-active]:!border-white [&_.ant-pagination-item-active]:rounded-sm [&_.ant-pagination-item-active::before]:hidden [&_.ant-pagination-item-active_a]:!bg-white [&_.ant-pagination-item-active_a]:!text-grey-text [&_.ant-pagination-item-active_a]:rounded-sm [&_.ant-pagination-item-active:hover]:!bg-white [&_.ant-pagination-item-active:hover]:!border-white [&_.ant-pagination-item-active:hover_a]:!bg-white [&_.ant-pagination-item-active:hover_a]:!text-grey-text [&_.ant-pagination-item:hover:not(.ant-pagination-item-active)]:!bg-transparent [&_.ant-pagination-item:hover:not(.ant-pagination-item-active)]:!border-transparent [&_.ant-pagination-item:hover:not(.ant-pagination-item-active)_a]:!bg-transparent [&_.ant-pagination-item:hover:not(.ant-pagination-item-active)_a]:text-white [&_.ant-pagination-prev]:!bg-transparent [&_.ant-pagination-prev]:!border-transparent [&_.ant-pagination-next]:!bg-transparent [&_.ant-pagination-next]:!border-transparent [&_.ant-pagination-prev_button]:!bg-transparent [&_.ant-pagination-prev_button]:!border-transparent [&_.ant-pagination-prev_button]:text-white [&_.ant-pagination-prev_button]:flex [&_.ant-pagination-prev_button]:items-center [&_.ant-pagination-prev_button]:justify-center [&_.ant-pagination-prev_button]:h-[30px] [&_.ant-pagination-prev_button]:p-0 [&_.ant-pagination-next_button]:!bg-transparent [&_.ant-pagination-next_button]:!border-transparent [&_.ant-pagination-next_button]:text-white [&_.ant-pagination-next_button]:flex [&_.ant-pagination-next_button]:items-center [&_.ant-pagination-next_button]:justify-center [&_.ant-pagination-next_button]:h-[30px] [&_.ant-pagination-next_button]:p-0 [&_svg]:fill-white [&_svg]:block [&_.ant-pagination-next]:flex [&_.ant-pagination-next]:items-center [&_.ant-pagination-next]:h-[30px] [&_.ant-pagination-prev]:flex [&_.ant-pagination-prev]:items-center [&_.ant-pagination-prev]:h-[30px]">
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

