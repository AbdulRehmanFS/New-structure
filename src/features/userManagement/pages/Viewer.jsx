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
      <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4 mb-5">
        <div className="text-2xl font-semibold text-white">Viewer Listing</div>
        <div className="flex items-center gap-2.5">
          <ButtonComponent
            text="Age Verification"
            width={"150px"}
            bg={theme.white}
            height={"32px"}
            onClick={() => ageNavigate()}
          />
          <SelectComponent
            size="middle"
            value={selectedStatus}
            onChange={handleStatusSelection}
            options={filterOption}
            bg="transparent"
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
}
export default memo(UserViewer);

