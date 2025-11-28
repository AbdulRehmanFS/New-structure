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
  <div className="flex justify-end mt-8 h-[37px] [&_.ant-pagination-next]:ml-2 [&_.ant-pagination-next]:justify-end [&_.ant-pagination]:flex [&_.ant-pagination]:items-center [&_.ant-pagination]:bg-pagination [&_.ant-pagination]:w-fit [&_.ant-pagination]:rounded [&_.ant-pagination]:py-1 [&_.ant-pagination]:px-3 [&_.ant-pagination-item]:h-[30px] [&_.ant-pagination-item]:min-w-[30px] [&_svg]:fill-white [&_.ant-pagination-next]:flex [&_.ant-pagination-next]:items-center [&_.ant-pagination-next]:h-[30px] [&_.ant-pagination-prev]:flex [&_.ant-pagination-prev]:items-center [&_.ant-pagination-prev]:h-[30px]">
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

