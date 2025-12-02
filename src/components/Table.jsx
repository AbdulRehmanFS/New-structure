/* eslint-disable react/prop-types */
import { memo } from "react";
import { Table, ConfigProvider } from "antd";
import { theme } from "@utils/theme";

const TableComponent = ({
  columns,
  data,
  loading = false,
  defaultTheme = true,
  rowKey = "_id",
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: defaultTheme ? "#949494" : theme.lightWhite,
        },
        components: {
          Table: {
            headerBg: theme.tableHeader,
            colorBgContainer: "transparent",
            rowHoverBg: "rgba(255, 255, 255, 0.12)",
            fontSize: "13px",
            borderColor: theme.grey2,
          },
          Empty: {
            colorText: theme.greyText,
            colorTextDescription: theme.greyText,
          },
        },
      }}
    >
      <div 
        className="table-wrapper overflow-x-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={rowKey}
          scroll={{ x: "max-content" }}
          loading={loading}
          size="small"
          pagination={false}
          className="[&_th::before]:!bg-transparent [&_table]:!table-fixed [&_.ant-empty-description]:!text-grey-text [&_.ant-empty-description]:!text-[rgba(116,116,116,1)]"
        />
      </div>
    </ConfigProvider>
  );
};

export default memo(TableComponent);

