/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Input } from "antd";
import { SearchIcon } from "@utils/svgFile";
import { theme } from "@utils/theme";

const SearchField = ({
  handleSearch,
  size,
  placeholder,
  bg = "rgba(196, 196, 196, 0)",
  border = "rgba(196, 196, 196, 0.45)",
}) => {
  let searchRef;

  const onSearch = (e) => {
    clearTimeout(searchRef);
    searchRef = setTimeout(() => {
      handleSearch(e?.target?.value);
    }, 500);
  };

  return (
      <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBgContainer: bg,
            colorBorder: border,
            colorPrimaryHover: theme.white,
            colorTextPlaceholder: theme.greyText,
            colorText: theme.white,
          },
        },
      }}
    >
      <Input
        className="[&_svg]:fill-white [&_input]:!text-white [&_input::placeholder]:!text-grey-text"
        style={{ width: "330px" }}
        placeholder={placeholder || "Search podcast, live shows, and creators"}
        size={size || "large"}
        allowClear
        prefix={<SearchIcon height="18px" width="18px" color="white" />}
        onChange={onSearch}
      />
    </ConfigProvider>
  );
};
export default memo(SearchField);

