import { Col, Row } from "antd";
import MultipleButton from "component/fields/multiple-button";
import Header from "component/header";
import { useState } from "react";
import styled from "styled-components";
import { font, theme } from "util/theme";
import FinanceSection from "./financeSection";
import GraphsSection from "./graphsSection";
import { filterButtons } from "./list";
import RightSection from "./rightSection";
import TotalStatsSection from "./totalStatsSection";

export default function Dashboard() {
  const [filterBtn, setFilterBtn] = useState({ name: "Year", value: 365 });
  const handleSearchData = () => {};
  const handleFilterButton = (list) => setFilterBtn(list);

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Dashboard" showSearch={false} />
      <DashboardWrapper>
        <Row>
          <Col xs={17} className="left-section">
            <div className="header-btn-dashboard">
              <div>
                <div className="main-heading">Welcome!</div>
              </div>
              <MultipleButton
                btnList={filterButtons}
                bg={theme.buttonColor}
                border={theme.buttonColor}
                handleClick={handleFilterButton}
                value={filterBtn?.name}
              />
            </div>
            <TotalStatsSection filterBtn={filterBtn} />
            <FinanceSection filterBtn={filterBtn} />
            <GraphsSection filterBtn={filterBtn} />
          </Col>
          <RightSection filterBtn={filterBtn} />
        </Row>
      </DashboardWrapper>
    </>
  );
}

const DashboardWrapper = styled(Row)`
  // height: calc(100vh - 133px);
  display: flex;
  flex-direction: column;
  .left-section {
    height: calc(100vh - 133px);
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  .header-btn-dashboard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
  }
  .main-heading {
    color: white;
    font-size: 18px;
  }
  .light-txt {
    color: white;
  }
  .finance-section {
    padding: 20px 0;
    margin-right: 10px;
  }
  .heading {
    font-size: 18px;
  }
  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .graph-wrapper {
    height: 300px;
    width: 100%;
  }
  .podcast-graph-wrapper {
    height: 330px;
    padding: 0 20px 0 0;
    margin-left: -20px;
  }
  .podcast-graph-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-weight: 600;
    font-size: ${font.mid16};
    line-height: 19.2px;
    flex-wrap: wrap;
    .heading {
      color: white;
    }
    .right-section {
      display: flex;
      gap: 30px;
      align-items: center;
    }
  }
`;
