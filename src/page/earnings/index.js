import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ButtonComponent } from "component";
import Header from "component/header";
import { theme } from "util/theme";
import { setEarningTabSelection } from "store/useManagementSlice";
import BucksEarnings from "./bucks";
import EventsEarnings from "./events";

export default function Earnings() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { earning } = useSelector((e) => e.userManagement);

  const handleSearchData = (searchData) => {
    setSearchText(searchData);
  };

  const handleSectionSelection = (name) => {
    dispatch(setEarningTabSelection(name));
  };

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Earnings" />
      <EarningWrapper className="scroll-without-header">
        <div className="button-container-wrapper">
          <div className="button-wrapper">
            <ButtonComponent
              size="middle"
              text="Events"
              width="80px"
              bg={theme.buttonColor}
              showBorder={earning === "events"}
              onClick={() => handleSectionSelection("events")}
            />
            <ButtonComponent
              text="Live Bucks"
              width="80px"
              bg={theme.buttonColor}
              size="middle"
              showBorder={earning === "bucks"}
              onClick={() => handleSectionSelection("bucks")}
            />
          </div>
          <div className="btn-wrapper">
            Financial Reports
            <div className="download-btn">Review & Download</div>
          </div>
        </div>
        {earning === "events" ? (
          <EventsEarnings searchText={searchText} />
        ) : (
          <BucksEarnings searchText={searchText} />
        )}
      </EarningWrapper>
    </>
  );
}

const EarningWrapper = styled.div`
  .button-container-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button-wrapper {
    display: flex;
    gap: 8px;
    margin: 20px 0;
  }
  .btn-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 15px;
    color: rgba(255, 255, 255, 0.79);
  }
  .download-btn {
    background: ${theme.greyButton};
    padding: 9px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  .cards-list {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .table-wrapper {
    margin-top: 25px;
  }
`;
