import { pageLimit } from "@utils/constant";
import TableComponent from "@components/Table";
import CustomePagination from "@components/Pagination";
import ReportModal from "./ReportModal";

const ReportsTableSection = ({
  columns,
  data,
  loading,
  totalPage,
  currentPage,
  handlePageChange,
  openModal,
  handleOnChange,
  userInfoId,
  changeStatus
}) => {
  return (
    <div>
      <div className="my-[30px] text-base" style={{ fontSize: "16px", margin: "30px 0" }}>
        Previous Reports
      </div>
      <TableComponent columns={columns} data={data} loading={loading} />
      <ReportModal
        openModal={openModal}
        handleOnChange={handleOnChange}
        userInfoId={userInfoId}
        changeStatus={changeStatus}
      />
      <CustomePagination
        total={totalPage}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ReportsTableSection;


