/* eslint-disable react/prop-types */
import { ConfigProvider, Select } from "antd";
import { memo } from "react";
import styled from "styled-components";
import { DownTriangleIcon } from "util/svgFile";
import { theme } from "util/theme";

const SelectComponent = ({
  options = [],
  value,
  key,
  onChange,
  handleSearch = null,
  placeholder,
  multiple = false,
  size,
  showSearch = false,
  style = {},
  loading = false,
  border,
  color,
  bg,
  colorPrimary,
  addSuffix = true,
  customeStyle = {
    // bg: theme.buttonColor,
    textColor: "white",
    optionsBg: theme.screenBackground,
    border: theme.midGrey
  },
  filterOption,
  disabled = false
}) => {
  const handleSearchData = (e) => {
    if (handleSearch) handleSearch(e);
  };
  

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder: theme.midGrey,
          // colorBorder: customeStyle?.border,
          colorBgElevated: customeStyle?.optionsBg
        },
        components: {
          Select: {
            // colorText: customeStyle?.textColor,
            // colorPrimary: "white",
            // colorTextDisabled: customeStyle?.textColor,
            // optionSelectedBg: theme.grey2
            colorTextPlaceholder: theme.greyText,
            colorBorder: border ? border : customeStyle?.border,
            colorText: color ? color : theme.white,
            colorPrimary: colorPrimary || "white",
            colorPrimaryHover: border ? theme.greyText : "transparent",
            colorBgContainer: bg || theme.buttonColor
          }
        }
      }}>
      <SelectWrapper
        key={key}
        size={size || "large"}
        maxTagCount="responsive"
        className="select-component"
        defaultValue={value}
        showSearch={showSearch}
        onSearch={handleSearchData}
        loading={loading}
        style={{
          ...style,
          minWidth: 120
        }}
        filterOption={filterOption}
        mode={multiple ? "multiple" : ""}
        placeholder={placeholder || "Select"}
        onChange={onChange}
        options={options}
        allowClear
        bg={customeStyle?.bg}
        disabled={disabled}
        suffixIcon={addSuffix ? <DownTriangleIcon /> : undefined}
      />
    </ConfigProvider>
  );
};
export default memo(SelectComponent);

const SelectWrapper = styled(Select)`
  .ant-select-selection-placeholder {
    color: ${theme.greyText};
  }
  .ant-select-suffix svg {
    fill: ${theme.white};
  }
  .ant-select-suffix svg {
    fill: ${theme.greyText};
  }
  .ant-select-selector {
    background: ${(props) => props?.bg} !important;
  }
  .ant-select-selection-item-remove {
    color: ${theme.white} !important;
  }
  .ant-select-clear {
    color: ${theme.white} !important;
  }
`;
