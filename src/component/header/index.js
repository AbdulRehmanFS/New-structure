/* eslint-disable react/prop-types */
import { memo, useState } from "react";
import styled from "styled-components";
import { theme } from "util/theme";
import SearchField from "../fields/searchField";
import { BellIcon, HeaderPersonIcon } from "util/svgFile";
import FullScreenDrawer from "../drawer/notificationDrawer";



const Header = ({ handleSearchData, showSearch = true, heading, placeholder }) => {
  const [visible, setVisible] = useState(false);
  const handleSearch = (e) => {
    if (handleSearchData) handleSearchData(e);
  };
  const openDrawer = () => {
    setVisible(true);
  };

  return (
    <>
      <FullScreenDrawer open={visible} onClose={() => setVisible(false)} />
      <HeaderWrapper>
        <div className="left-section">{heading}</div>
        <div className="right-section">
          {showSearch && (
            <SearchField handleSearch={handleSearch} size="middle" placeholder={placeholder} />
          )}
          <IconWrapper onClick={() => openDrawer()}>
            <BellIcon height="18px" width="18px" />
          </IconWrapper>
          <IconWrapper>
            <HeaderPersonIcon height="18px" width="18px" />
          </IconWrapper>
        </div>
      </HeaderWrapper>
    </>
  );
};
export default memo(Header);

const HeaderWrapper = styled.div`
  height: 65px;
  background: ${theme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  border-radius: 5px;
  margin-bottom: 8px;
  margin-right: 10px;
  .left-section {
    font-size: 22px;
  }
  .right-section {
    display: flex;
    gap: 8px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 8px;
  background: ${theme.buttonColor};
  cursor: pointer;
`;
