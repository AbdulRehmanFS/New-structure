/* eslint-disable react/prop-types */
import { memo, useState } from "react";
import { Badge } from "antd";
import SearchField from "@components/SearchField";
import { BellIcon, HeaderPersonIcon } from "@utils/svgFile";
import FullScreenDrawer from "@components/NotificationDrawer";

const Header = ({ handleSearchData, showSearch = true, heading, placeholder }) => {
  const [visible, setVisible] = useState(false);
  // Count unread notifications - this should come from your notification state/API
  // For now, using the count from NotificationDrawer (5 unread notifications)
  const unreadCount = 5;
  
  const handleSearch = (e) => {
    if (handleSearchData) handleSearchData(e);
  };
  const openDrawer = () => {
    setVisible(true);
  };

  return (
    <>
      <FullScreenDrawer open={visible} onClose={() => setVisible(false)} />
      <div className="h-[65px] bg-[rgba(0,0,0,0.08)] flex items-center justify-between py-2.5 px-0 rounded-md mb-2 mr-2.5">
        <div className="text-[22px] text-white">{heading}</div>
        <div className="flex gap-2">
          {showSearch && (
            <SearchField handleSearch={handleSearch} size="middle" placeholder={placeholder} />
          )}
          <div
            className="flex items-center justify-center py-1.5 px-2 rounded-lg bg-button-color cursor-pointer relative"
            onClick={() => openDrawer()}
          >
            <Badge count={unreadCount} size="small" offset={[-2, 2]}>
              <BellIcon height="18px" width="18px" />
            </Badge>
          </div>
          <div className="flex items-center justify-center py-1.5 px-2 rounded-lg bg-button-color cursor-pointer">
            <HeaderPersonIcon height="18px" width="18px" />
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Header);

