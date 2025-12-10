/* eslint-disable react/prop-types */
import { memo } from "react";
import { Table, ConfigProvider } from "antd";
import styled from "styled-components";
import "antd/dist/reset.css";
import { theme } from "util/theme";

const TableComponent = ({
  columns,
  data,
  loading = false,
  defaultTheme = true,
}) => {
  
  // console.log("📊 Columns of table:", columns);
  // console.log("🤡 data in table:", data);

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
        },
      }}
    >
      <TableWrap
        columns={columns}
        className="table-wrapper"
        dataSource={data}
        scroll={{ x: 400 }}
        loading={loading}
        size="small"
        pagination={false}
      />
    </ConfigProvider>
  );
};

export default memo(TableComponent);

const TableWrap = styled(Table)`
  th::before {
    background-color: transparent !important;
  }

  table {
    table-layout: fixed !important;
  }

  .ant-empty-description {
    color: ${theme.greyText};
  }

  [data-col="reported_person"]:hover {
    border: 1px solid #fff;
    padding: 3px 5px;
    border-radius: 4px;
    transition: border 0.2s ease;
  }

  .btn-wrapper .download-btn {
    border: 1px solid rgba(255, 255, 255, 0);
    transition: all 0.2s ease;
  }

  .btn-wrapper .download-btn:hover {
    border-color: #fff;
  }
`;



