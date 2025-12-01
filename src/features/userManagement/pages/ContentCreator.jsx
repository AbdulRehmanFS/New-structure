import { memo } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "@components/Button";
import SelectComponent from "@components/Select";
import TableComponent from "@components/Table";
import CustomePagination from "@components/Pagination";
import { pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";
import { filterOption } from "../utils/data";
import { useTableCreatorColumns, useUserListing } from "../hooks";

const ContentCreator = ({ searchContent }) => {
  const navigate = useNavigate();
  const userRole = 2;
  const [
    userListing,
    loading,
    totalPage,
    currentPage,
    selectedStatus,
    handleStatusSelection,
    handlePageChange,
    handleStatusChange
  ] = useUserListing(searchContent, pageLimit, userRole);
  
  const [columns] = useTableCreatorColumns(currentPage, handleStatusChange);

  return (
    <div className="flex flex-col mt-5 [&_.table-wrapper]:mt-8 [&_.action]:border-b-2 [&_.action]:border-grey-2">
      <div className="flex flex-wrap justify-between items-center  rounded-xl">
        <div className="text-lg text-white">Content Creator Listing</div>
        <div className="flex items-center gap-2.5">
          <ButtonComponent
            text="Requests"
            width="90px"
            size="middle"
            bg={theme.white}
            onClick={() => navigate("/user-management/creator-request")}
            height="32px"
          />
          <SelectComponent
            size="middle"
            onChange={handleStatusSelection}
            value={selectedStatus}
            options={filterOption}
            bg="transparent"
            height="32px"
          />
        </div>
      </div>
      <TableComponent columns={columns} data={userListing} loading={loading} />
      <CustomePagination
        total={totalPage}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default memo(ContentCreator);

