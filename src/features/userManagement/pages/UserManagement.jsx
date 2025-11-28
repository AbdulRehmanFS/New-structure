import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserViewer from "./Viewer";
import { setUserSelection } from "@features/userManagement/store/useManagementSlice";
import ContentCreator from "./ContentCreator";
import { theme } from "@utils/theme";
import Header from "@layouts/Header";
import ButtonComponent from "@components/Button";

export default function UserManagement() {
  const { userSelectedList } = useSelector((e) => e.userManagement);
  const [searchContent, setSearchContent] = useState("");
  const dispatch = useDispatch();
  const handleSectionSelection = (name) => dispatch(setUserSelection(name));
  const handleSearchData = (e) => setSearchContent(e);

  return (
    <>
      <Header
        handleSearchData={handleSearchData}
        heading="User Management"
        placeholder="Search Viewer and Creator"
      />
      <div className="scroll-without-header">
        <div className="flex gap-2.5 mt-5">
          <ButtonComponent
            size="middle"
            text="Viewer"
            width="80px"
            bg={userSelectedList === "viewer" ? theme.white : theme.buttonColor}
            showBorder={userSelectedList === "viewer"}
            onClick={() => handleSectionSelection("viewer")}
          />
          <ButtonComponent
            text="Content Creator"
            width="140px"
            bg={userSelectedList === "creator" ? theme.white : theme.buttonColor}
            size="middle"
            showBorder={userSelectedList === "creator"}
            onClick={() => handleSectionSelection("creator")}
          />
        </div>
        {userSelectedList === "viewer" ? (
          <UserViewer searchContent={searchContent} />
        ) : (
          <ContentCreator searchContent={searchContent} />
        )}
      </div>
    </>
  );
}

