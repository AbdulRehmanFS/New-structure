/* eslint-disable no-nested-ternary */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";
import { setAudioVideoTabSelection } from "@features/userManagement/store/useManagementSlice";
import Header from "@layouts/Header";
import DropDownComponent from "@components/Dropdown";
import { DownTriangleIcon } from "@utils/svgFile";
import { AudioSection, VideoSection, SeriesSection, KlipzListing } from "../components";

const uploadContentOptions = [
  {
    key: "1",
    label: "Video/Audio",
  },
  {
    key: "3",
    label: "Series",
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

  const handleContentDropdown = ({ key }) => {
    if (key === "1") navigate("/creator/upload-content");
    else if (key === "3") navigate("/creator/series-create");
  };

  return (
    <>
      <Header
        handleSearchData={handleSearchData}
        heading="Content Approval"
        placeholder="Search Audio, Video and Series"
      />
      <div className="scroll-without-header">
        <div className="flex justify-between items-center mt-5">
          <div className="flex gap-2.5">
            <ButtonComponent
              size="middle"
              text="Audio"
              width="80px"
              bg={audioVideoTab === "audio" ? theme.white : theme.buttonColor}
              showBorder={audioVideoTab === "audio"}
              onClick={() => handleSectionSelection("audio")}
              height="32px"
            />
            <ButtonComponent
              text="Video"
              width="80px"
              bg={audioVideoTab === "video" ? theme.white : theme.buttonColor}
              size="middle"
              showBorder={audioVideoTab === "video"}
              onClick={() => handleSectionSelection("video")}
              height="32px"
            />
            <ButtonComponent
              text="Series"
              width="80px"
              bg={audioVideoTab === "series" ? theme.white : theme.buttonColor}
              size="middle"
              showBorder={audioVideoTab === "series"}
              onClick={() => handleSectionSelection("series")}
              height="32px"
            />
            <ButtonComponent
              text="Klipz"
              width="80px"
              bg={audioVideoTab === "klipz" ? theme.white : theme.buttonColor}
              size="middle"
              showBorder={audioVideoTab === "klipz"}
              onClick={() => handleSectionSelection("klipz")}
              height="32px"
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
              <div className="px-3 py-2 border-r border-black text-white">
                Upload content
              </div>
              <span className="px-2.5 flex items-center">
                <DownTriangleIcon />
              </span>
            </div>
          </DropDownComponent>
        </div>
        {audioVideoTab === "audio" ? (
          <AudioSection searchText={searchContent} />
        ) : audioVideoTab === "video" ? (
          <VideoSection searchText={searchContent} />
        ) : audioVideoTab === "series" ? (
          <SeriesSection searchText={searchContent} />
        ) : (
          <KlipzListing searchText={searchContent} />
        )}
      </div>
    </>
  );
}
