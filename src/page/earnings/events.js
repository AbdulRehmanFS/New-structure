/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CustomePagination, TableComponent } from "component";
import { eventColumns, cardList } from "./data";
import { HeaderSection } from "../style";
import InfoCard from "component/cards/infoCard";
import { pageLimit } from "util/constant";

export default function EventsEarnings() {
  const [eventEarningList, setEventEarning] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  

  const getEventsList = async () => {
    setLoading(true);
    setTotalPage(0);
    setEventEarning([]);
    setLoading(false);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getEventsList();
  }, []);

  return (
    <EarningEventWrapper>
      <HeaderSection className="event-header">Events Earnings</HeaderSection>
      <div className="cards-list">
        {cardList.map((list) => (
          <InfoCard
            key={list?.heading}
            count={list?.count}
            heading={list?.heading}
            icon={list?.icon}
            showBox={false}
          />
        ))}
      </div>
      <TableComponent
        columns={eventColumns}
        data={eventEarningList}
        loading={loading}
      />
      <CustomePagination
        total={totalPage}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
    </EarningEventWrapper>
  );
}
const EarningEventWrapper = styled.div`
  .event-header {
    margin-bottom: 20px;
  }
`;
