import { useEffect, useState } from "react";
import { CustomePagination, TableComponent } from "@components/index";
import { eventColumns, cardList } from "../utils/data";
import InfoCard from "@features/common/components/InfoCard";
import { pageLimit } from "@utils/constant";

const EventsEarnings = ({ searchText }) => {
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
    <div>
      <div className="text-lg mb-5">Events Earnings</div>
      <div className="flex gap-3 flex-wrap">
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
      <div className="mt-[25px]">
        <TableComponent
          columns={eventColumns}
          data={eventEarningList}
          loading={loading}
        />
      </div>
      <CustomePagination
        total={totalPage}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EventsEarnings;

