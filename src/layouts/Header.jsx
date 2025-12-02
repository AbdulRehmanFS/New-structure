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
      <div className="min-h-[65px] bg-[rgba(0,0,0,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between py-3 md:py-2.5 px-3 md:px-0 rounded-md mb-2 mr-0 md:mr-2.5 gap-3 md:gap-0">
        <div className="text-lg sm:text-xl md:text-[22px] text-white font-medium md:font-normal w-full md:w-auto">{heading}</div>
        <div className="flex gap-2 w-full md:w-auto items-center">
          {showSearch && (
            <div className="flex-1 md:flex-initial min-w-0">
              <SearchField handleSearch={handleSearch} size="middle" placeholder={placeholder} />
            </div>
          )}
          <div className="flex gap-2 shrink-0">
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
      </div>
    </>
  );
};
export default memo(Header);

