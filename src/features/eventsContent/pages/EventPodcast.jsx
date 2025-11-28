import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";
import { DownTriangleIcon } from "@utils/svgFile";
import DropDownComponent from "@components/Dropdown";
import Header from "@layouts/Header";
import { EventListing, EventRequest, PodcastListing, PodcastRequest } from "../components";

const uploadContentOptions = [
  {
    key: "1",
    label: "Live Event",
  },
  {
    key: "2",
    label: "Live Content",
  },
];

export default function EventPodcast() {
  const [searchContent, setSearchContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBtn, setSelectedBtn] = useState("event");

  const handleNavigate = () => {
    setSelectedBtn("content");
    navigate("/events-contents/contents");
  };

  const handleEventNavigate = () => {
    setSelectedBtn("event");
    navigate("/events-contents/events");
  };

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path === "events" || path === "events-request") {
      setSelectedBtn("event");
    } else {
      setSelectedBtn("content");
    }
  }, [location.pathname]);

  const handleSearchData = (e) => setSearchContent(e);

  const handleContentDropdown = ({ key }) => {
    if (key === "1") navigate("/upload-event");
    else if (key === "2") navigate("/schedule-content");
  };

  return (
    <>
      <Header
        handleSearchData={handleSearchData}
        heading="Live Events and Contents"
        placeholder="Search Live Events and Contents"
      />
      <div className="scroll-without-header">
        <div className="flex justify-between items-center mt-5">
          <div className="flex gap-2.5">
            <ButtonComponent
              text="Events"
              width="80px"
              size="middle"
              showBorder={selectedBtn === "event"}
              bg={selectedBtn === "event" ? theme.white : theme.buttonColor}
              onClick={handleEventNavigate}
            />
            <ButtonComponent
              text="Contents"
              width="80px"
              size="middle"
              showBorder={selectedBtn === "content"}
              bg={selectedBtn === "content" ? theme.white : theme.buttonColor}
              onClick={handleNavigate}
            />
          </div>
          <DropDownComponent
            items={uploadContentOptions}
            textColor="black"
            background="white"
            onClick={handleContentDropdown}
          >
            <div
              className="flex justify-between items-center rounded-md cursor-pointer h-8"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <div className="px-3 py-2 border-r border-black text-white">Schedule Live</div>
              <span className="px-2.5 flex items-center">
                <DownTriangleIcon />
              </span>
            </div>
          </DropDownComponent>
        </div>
        <Outlet context={{ eventsearch: searchContent }} />
      </div>
    </>
  );
}

export { EventListing, EventRequest, PodcastListing, PodcastRequest };
