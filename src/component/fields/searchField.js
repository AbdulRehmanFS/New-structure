/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Input } from "antd";
import styled from "styled-components";
import { SearchIcon } from "util/svgFile";
import { theme } from "util/theme";

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
          },
        },
      }}
    >
      <SearchComponent
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

const SearchComponent = styled(Input)`
  svg {
    fill: white;
  }
  width: 330px;
`;
