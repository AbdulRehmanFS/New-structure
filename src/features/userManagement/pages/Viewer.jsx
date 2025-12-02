import { memo } from "react";
import { pageLimit } from "@utils/constant";
import ButtonComponent from "@components/Button";
import CustomePagination from "@components/Pagination";
import SelectComponent from "@components/Select";
import TableComponent from "@components/Table";
import { useTableColumn, useUserListing } from "../hooks";
import { filterOption } from "../utils/data";
import { theme } from "@utils/theme";

function UserViewer({ searchContent }) {
  const userRole = 1;
  const [
    userListing,
    loading,
    totalPage,
    currentPage,
    selectedStatus,
    handleStatusSelection,
    handlePageChange,
    handleStatusChange,
    ageNavigate
  ] = useUserListing(searchContent, pageLimit, userRole);

  const [columns] = useTableColumn(currentPage, handleStatusChange);

  return (
    <div className="flex flex-col mt-5 [&_.table-wrapper]:mt-8 [&_.action]:border-b [&_.action]:border-[rgba(163,163,163,0.45)]">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-3 sm:gap-0 rounded-xl">
        <div className="text-base sm:text-lg text-white">Viewer Listing</div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          <div className="w-full sm:w-auto sm:min-w-[150px]">
            <ButtonComponent
              text="Age Verification"
              width="100%"
              bg={theme.white}
              height="32px"
              onClick={() => ageNavigate()}
            />
          </div>
          <div className="w-full sm:w-auto">
            <SelectComponent
              size="middle"
              value={selectedStatus}
              onChange={handleStatusSelection}
              options={filterOption}
              bg="transparent"
              height="32px"
            />
          </div>
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
}
export default memo(UserViewer);

