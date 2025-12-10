import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonComponent from "component/fields/button";
import EventListing from "./eventListing";
import EventRequest from "./eventRequest";
import PodcastListing from "./contentListing";
import EventDetail from "./eventDetail";
import PodcastDetail from "./contentDetail";
import PodcastRequest from "./contentRequest";
import Header from "component/header";
import { theme } from "util/theme";
import { DownTriangleIcon } from "util/svgFile";
import DropDown from "component/fields/dropdown";

const uploadContentOptions = [
  {
    key: "1",
    type: "group",
    children: [
      {
        key: "1",
        label: "Live Event",
      },
      {
        key: "2",
        label: "Live Content",
      },
    ],
  },
];

export default function EventPodcast() {
  const [searchContent, setSearchContent] = useState("");
  const navigate = useNavigate();
  const [selectedBtn, setSelectedBtn] = useState("event");

  const handleNavigate = async () => {
    setSelectedBtn("content");
    navigate("/events-contents/contents");
  };

  const handleEventNavigate = () => {
    setSelectedBtn("event");
    navigate("/events-contents/events");
  };

  useEffect(() => {
    const path = window.location.pathname.split("/").pop();
    if (path === "events" || path === "events-request") setSelectedBtn("event");
    else setSelectedBtn("content");
  }, []);

  const handleSearchData = (e) => setSearchContent(e);

  const handleContentDropdown = (selected) => {
    if (selected?.key === "1") navigate("/upload-event");
    else if (selected?.key === "2") navigate("/schedule-content");
  };

  return (
    <>
      <Header
        handleSearchData={handleSearchData}
        heading="Live Events and Contents"
        placeholder="Search Live Events and Contents"
      />
      <EventPodcastWrapper className="scroll-without-header">
        <div className="button-section">
          <div className="button-left-section">
            <ButtonComponent
              text="Events"
              width="80px"
              size="middle"
              showBorder={selectedBtn === "event"}
              bg={theme.buttonColor}
              onClick={handleEventNavigate}
            />
            <ButtonComponent
              text="Contents"
              width="80px"
              size="middle"
              showBorder={selectedBtn === "content"}
              bg={theme.buttonColor}
              onClick={handleNavigate}
            />
          </div>
          <DropDown
            items={uploadContentOptions}
            textColor="black"
            background="white"
            onClick={handleContentDropdown}
          >
            <UploadContentButton>
              <div className="upload-btn-text">Schedule Live</div>
              <span className="down-arrow-wrapper">
                <DownTriangleIcon />
              </span>
            </UploadContentButton>
          </DropDown>
        </div>
        <Outlet context={{ eventsearch: searchContent }} />
      </EventPodcastWrapper>
    </>
  );
}
export {
  EventListing,
  EventRequest,
  PodcastListing,
  EventDetail,
  PodcastDetail,
  PodcastRequest,
};

const EventPodcastWrapper = styled.div`
  .button-left-section {
    display: flex;
    gap: 10px;
  }
  .button-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }
`;

export const UploadContentButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background: ${theme.primaryColor};
  cursor: pointer;
  height: 32px;
  .upload-btn-text {
    padding: 13px 12px;
    border-right: 1px solid ${theme.black};
  }
  .down-arrow-wrapper {
    padding: 10px;
  }
`;
