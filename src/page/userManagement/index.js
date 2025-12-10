import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import UserViewer from "./viewer";
import { setUserSelection } from "store/useManagementSlice";
import ContentCreator from "./contentCreator";
import { theme } from "util/theme";
import Header from "component/header";
import { ButtonComponent } from "component/index";

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
      <UserManagementWrapper className="scroll-without-header">
        <div className="button-wrapper">
          <ButtonComponent
            size="middle"
            text="Viewer"
            width="80px"
            bg={theme.buttonColor}
            showBorder={userSelectedList === "viewer"}
            onClick={() => handleSectionSelection("viewer")}
          />
          {"    "}
          <ButtonComponent
            text="Content Creator"
            width="140px"
            bg={theme.buttonColor}
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
      </UserManagementWrapper>
    </>
  );
}

const UserManagementWrapper = styled.div`
  .button-wrapper {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
`;
