/* eslint-disable no-nested-ternary */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "component/fields/button";
import { theme } from "util/theme";
import AudioSection from "./audioListing";
import VideoSection from "./videoListing";
import { setAudioVideoTabSelection } from "store/useManagementSlice";
import Header from "component/header";
import SeriesSection from "./seriesListing";
import DropDown from "component/fields/dropdown";
import { DownTriangleIcon } from "util/svgFile";
import KlipzListing from "./KlipzListing";


const uploadContentOptions = [
  {
    key: "1",
    type: "group",
    children: [
      {
        key: "1",
        label: "Video/Audio",
      },
      {
        key: "3",
        label: "Series",
      },
    ],
  },
];

export default function CreatorAudioVideo() {
  const { audioVideoTab } = useSelector((e) => e.userManagement);
  const [searchContent, setSearchContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSectionSelection = (name) =>
    dispatch(setAudioVideoTabSelection(name));

  const handleSearchData = (e) => setSearchContent(e);

  const handleContentDropdown = (selected) => {
    if (selected?.key === "1") navigate("/creator/upload-content");
    else if (selected?.key === "3") navigate("/creator/series-create");
  };

  return (
    <>
      <Header
        handleSearchData={handleSearchData}
        heading="Content Approval"
        placeholder="Search Audio, Video and Series"
      />
      <CreatorAudioVideoWrapper className="scroll-without-header">
        <div className="button-wrapper">
          <div className="listing-btn">
            <ButtonComponent
              size="middle"
              text="Audio"
              width="80px"
              bg={theme.buttonColor}
              showBorder={audioVideoTab === "audio"}
              onClick={() => handleSectionSelection("audio")}
            />
            <ButtonComponent
              text="Video"
              width="80px"
              bg={theme.buttonColor}
              size="middle"
              showBorder={audioVideoTab === "video"}
              onClick={() => handleSectionSelection("video")}
            />
            <ButtonComponent
              text="Series"
              width="80px"
              bg={theme.buttonColor}
              size="middle"
              showBorder={audioVideoTab === "series"}
              onClick={() => handleSectionSelection("series")}
            />
             <ButtonComponent
              text="Klipz"
              width="80px"
              bg={theme.buttonColor}
              size="middle"
              showBorder={audioVideoTab === "klipz"}
              onClick={() => handleSectionSelection("klipz")}
            />
          </div>
          <DropDown
            items={uploadContentOptions}
            textColor="black"
            background="white"
            onClick={handleContentDropdown}
          >
            <UploadContentButton>
              <div className="upload-btn-text">Upload content</div>
              <span className="down-arrow-wrapper">
                <DownTriangleIcon />
              </span>
            </UploadContentButton>
          </DropDown>
        </div>
        {audioVideoTab === "audio" ? (
          <AudioSection searchText={searchContent} />
        ) : audioVideoTab === "video" ? (
          <VideoSection searchText={searchContent} />
        ) : audioVideoTab ==="series"?(
          <SeriesSection searchText={searchContent} />
        ):<KlipzListing searchText={searchContent}/>}
      </CreatorAudioVideoWrapper>
    </>
  );
}

const CreatorAudioVideoWrapper = styled.div`
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .listing-btn {
    display: flex;
    gap: 10px;
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
