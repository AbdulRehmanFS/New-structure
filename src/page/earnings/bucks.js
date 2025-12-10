/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { HeaderSection } from "../style";
import { CustomePagination, SelectComponent, TableComponent } from "component";
import { buckColumns, bucksSelect, cardList } from "./data";
import InfoCard from "component/cards/infoCard";
import { pageLimit } from "util/constant";
import { theme } from "util/theme";

export default function BucksEarnings() {
  const [bucksEarning, setBucksEarning] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getBucksList = async () => {
    setLoading(true);
    setBucksEarning([]);
    setTotalPage(0);
    setLoading(false);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getBucksList();
  }, []);

  const handleFilterChange = () => {};

  return (
    <EarningBuckWrapper>
      <HeaderSection className="bucks-header">Live Bucks Earnings</HeaderSection>
      <div className="mid-section">
        <div className="cards-list">
          {cardList.map((list) => (
            <InfoCard
              count={list?.count}
              heading={list?.heading}
              icon={list?.icon}
              showBox={false}
              key={list?.heading}
            />
          ))}
        </div>
        <SelectComponent
          size="middle"
          //   value={selectedStatus}
          onChange={handleFilterChange}
          options={bucksSelect}
        />
      </div>
      <TableComponent columns={buckColumns} data={bucksEarning} loading={loading} />
      <CustomePagination
        total={totalPage}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
    </EarningBuckWrapper>
  );
}
// display: "flex", justifyContent: "space-between", alignItems: "center"
const EarningBuckWrapper = styled.div`
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .bucks-header {
    margin-bottom: 20px;
  }
  .mid-section {
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
`;
