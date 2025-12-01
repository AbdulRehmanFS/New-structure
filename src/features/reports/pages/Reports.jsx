import Header from "@layouts/Header";
import { theme } from "@utils/theme";
import useReport from "../hooks/useReport";
import ReportFilter from "../components/ReportFilter";
import ReportsTableSection from "../components/ReportsTableSection";

export default function Reports() {
  const {
    reportListing,
    loading,
    totalPage,
    currentPage,
    handleDateChange,
    handlePageChange,
    columns,
    openModal,
    handleOnChange,
    userInfoId,
    changeStatus
  } = useReport();

  return (
    <>
      <Header showSearch={false} heading="Reports" />
      <div
        className="scroll-without-header"
        style={{ paddingTop: "30px", color: theme.lightWhite }}
      >
        <ReportFilter handleDateChange={handleDateChange} />
        <ReportsTableSection
          columns={columns}
          data={reportListing}
          loading={loading}
          totalPage={totalPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          openModal={openModal}
          handleOnChange={handleOnChange}
          userInfoId={userInfoId}
          changeStatus={changeStatus}
        />
      </div>
    </>
  );
}
