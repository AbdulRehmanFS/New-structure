import { Col, Row } from "antd";
import MultipleButton from "@components/MultipleButton";
import Header from "@layouts/Header";
import { useState } from "react";
import { theme, font } from "@utils/theme";
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
      <div className="flex flex-col [&_.left-section]:h-auto [&_.left-section]:sm:h-[calc(100vh-133px)] [&_.left-section]:overflow-auto [&_.header-btn-dashboard]:flex [&_.header-btn-dashboard]:flex-col [&_.header-btn-dashboard]:sm:flex-row [&_.header-btn-dashboard]:justify-between [&_.header-btn-dashboard]:items-start [&_.header-btn-dashboard]:sm:items-center [&_.header-btn-dashboard]:gap-3 [&_.header-btn-dashboard]:sm:gap-0 [&_.header-btn-dashboard]:pr-0 [&_.header-btn-dashboard]:sm:pr-2.5 [&_.main-heading]:text-white [&_.main-heading]:text-base [&_.main-heading]:sm:text-lg [&_.light-txt]:text-white [&_.finance-section]:py-3 [&_.finance-section]:sm:py-5 [&_.finance-section]:mr-0 [&_.finance-section]:sm:mr-2.5 [&_.heading]:text-lg [&_.card-wrapper]:flex [&_.card-wrapper]:flex-col [&_.card-wrapper]:gap-1 [&_.graph-wrapper]:h-[300px] [&_.graph-wrapper]:w-full [&_.podcast-graph-wrapper]:h-[330px] [&_.podcast-graph-wrapper]:pr-5 [&_.podcast-graph-wrapper]:pl-0 [&_.podcast-graph-wrapper]:-ml-5 [&_.podcast-graph-header]:flex [&_.podcast-graph-header]:items-center [&_.podcast-graph-header]:justify-between [&_.podcast-graph-header]:px-5 [&_.podcast-graph-header]:font-semibold [&_.podcast-graph-header]:flex-wrap [&_.podcast-graph-header_.heading]:text-white [&_.podcast-graph-header_.right-section]:flex [&_.podcast-graph-header_.right-section]:gap-8 [&_.podcast-graph-header_.right-section]:items-center" style={{ fontSize: font.mid16, lineHeight: '19.2px' }}>
        <style>{`
          .left-section::-webkit-scrollbar,
          .right-section-list::-webkit-scrollbar {
            width: 0px;
          }
        `}</style>
        <Row>
          <Col xs={24} sm={17} className="left-section" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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

