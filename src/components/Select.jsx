/* eslint-disable react/prop-types */
import { ConfigProvider, Select } from "antd";
import { memo } from "react";
import { DownTriangleIcon } from "@utils/svgFile";
import { theme } from "@utils/theme";

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
    textColor: "white",
    optionsBg: theme.screenBackground,
    border: theme.midGrey
  },
  filterOption,
  disabled = false,
  allowClear = true
}) => {
  const handleSearchData = (e) => {
    if (handleSearch) handleSearch(e);
  };

  // Determine dropdown styling based on background
  const isTransparent = bg === "transparent";
  // Check if background is dark (dark colors like #2a2a2a, theme.formField, etc.)
  const isDarkBg = isTransparent || 
    bg === theme.formField || 
    bg === "#2a2a2a" || 
    bg === theme.backgroundGray || 
    bg === theme.greyButton ||
    bg?.includes?.("2a2a2a") ||
    bg?.includes?.("rgba(196,196,196,0.1)") ||
    bg?.includes?.("rgba(19, 19, 19");
  
  const dropdownBg = isDarkBg ? theme.screenBackground : (customeStyle?.optionsBg || "#ffffff");
  const dropdownTextColor = isDarkBg ? theme.white : "#000000";
  const dropdownHoverBg = isDarkBg ? theme.buttonColor : "#e6e6e6";
  const dropdownSelectedBg = isDarkBg ? theme.primaryColor : "#f5f5f5";

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder: theme.midGrey,
          colorBgElevated: dropdownBg,
          colorText: dropdownTextColor,
          colorTextTertiary: dropdownTextColor,
          colorTextSecondary: dropdownTextColor
        },
        components: {
          Select: {
            colorTextPlaceholder: theme.greyText,
            colorBorder: border ? border : customeStyle?.border,
            colorText: isDarkBg ? theme.white : (color || theme.white),
            colorPrimary: colorPrimary === "transparent" ? theme.white : (colorPrimary || "white"),
            colorPrimaryHover: border ? theme.greyText : "transparent",
            colorBgContainer: bg || theme.buttonColor,
            // Dropdown options styling
            optionSelectedBg: dropdownSelectedBg,
            optionActiveBg: dropdownHoverBg,
            optionPadding: "8px 12px",
            optionSelectedColor: dropdownTextColor,
            colorTextQuaternary: dropdownTextColor,
            // Force white text for all dropdown content when dark background
            ...(isDarkBg && {
              optionColor: theme.white,
              optionSelectedColor: theme.white
            })
          }
        }
      }}
    >
      <Select
        key={key}
        size={size || "large"}
        maxTagCount="responsive"
        className={`select-component [&_.ant-select-selection-placeholder]:text-grey-text [&_.ant-select-suffix_svg]:fill-white [&_.ant-select-selection-item-remove]:!text-white [&_.ant-select-clear]:!text-white [&_.ant-select-selection-item]:!text-white ${isDarkBg ? "[&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-item]:!text-base [&_.ant-select-selection-placeholder]:!text-grey-text [&_.ant-select-selector]:!text-white [&_.ant-select-selector_span]:!text-white [&_.ant-select-selector_*]:!text-white" : ""}`}
        classNames={{ popup: { root: isDarkBg ? "dark-dropdown" : "" } }}
        value={value}
        showSearch={showSearch}
        onSearch={showSearch && handleSearch ? handleSearchData : undefined}
        loading={loading}
        style={{
          ...style,
          minWidth: 120,
          ...(isDarkBg && { color: theme.white })
        }}
        filterOption={filterOption}
        mode={multiple ? "multiple" : ""}
        placeholder={placeholder || "Select"}
        onChange={onChange}
        options={options}
        allowClear={allowClear}
        disabled={disabled}
        suffixIcon={addSuffix ? <DownTriangleIcon /> : undefined}
      />
    </ConfigProvider>
  );
};
export default memo(SelectComponent);

