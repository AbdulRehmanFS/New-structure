import { Col, Row } from "antd";
import MultipleButton from "@components/MultipleButton";
import Header from "@layouts/Header";
import { useState } from "react";
import { theme } from "@utils/theme";
import FinanceSection from "../components/FinanceSection";
import GraphsSection from "../components/GraphsSection";
import { filterButtons } from "../utils/list.jsx";
import RightSection from "../components/RightSection";
import TotalStatsSection from "../components/TotalStatsSection";

export default function Dashboard() {
  const [filterBtn, setFilterBtn] = useState({ name: "Year", value: 365 });
  const handleSearchData = () => {};
  const handleFilterButton = (list) => setFilterBtn(list);

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Dashboard" showSearch={false} />
      <div className="flex flex-col [&_.left-section]:h-[calc(100vh-133px)] [&_.left-section]:overflow-auto [&_.left-section::-webkit-scrollbar]:w-0 [&_.header-btn-dashboard]:flex [&_.header-btn-dashboard]:justify-between [&_.header-btn-dashboard]:items-center [&_.header-btn-dashboard]:pr-2.5 [&_.main-heading]:text-white [&_.main-heading]:text-lg [&_.podcast-graph-wrapper]:h-[330px] [&_.podcast-graph-wrapper]:px-5 [&_.podcast-graph-wrapper]:-ml-5 [&_.podcast-graph-header]:flex [&_.podcast-graph-header]:items-center [&_.podcast-graph-header]:justify-between [&_.podcast-graph-header]:font-semibold [&_.podcast-graph-header]:text-base [&_.podcast-graph-header]:leading-[19.2px] [&_.podcast-graph-header]:flex-wrap [&_.podcast-graph-header_.heading]:text-white [&_.podcast-graph-header_.right-section]:flex [&_.podcast-graph-header_.right-section]:gap-8 [&_.podcast-graph-header_.right-section]:items-center">
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
      </div>
    </>
  );
}

