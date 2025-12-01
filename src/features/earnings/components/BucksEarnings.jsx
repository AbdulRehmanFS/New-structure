import { useEffect, useState } from "react";
import { CustomePagination, SelectComponent, TableComponent } from "@components/index";
import { buckColumns, bucksSelect, cardList } from "../utils/data";
import InfoCard from "@features/common/components/InfoCard";
import { pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";

const BucksEarnings = ({ searchText }) => {
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
    <div>
      <div className="text-lg mb-5">Live Bucks Earnings</div>
      <div className="flex items-end justify-between">
        <div className="flex gap-3 flex-wrap">
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
          onChange={handleFilterChange}
          options={bucksSelect}
          bg={theme.formField || "#2a2a2a"}
          textColor="white"
          optionsBg={theme.screenBackground}
          border="transparent"
        />
      </div>
      <div className="mt-[25px]">
        <TableComponent columns={buckColumns} data={bucksEarning} loading={loading} />
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

export default BucksEarnings;

