import styled from "styled-components";
import Header from "component/header";
import { pageLimit } from "util/constant";
import { DateSelector, CustomePagination, TableComponent } from "component/index";
import { theme } from "util/theme";
import useReport from "hooks/report/useReport";
import ReportModal from "./reportModal";

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
      <ReportWrapper className="scroll-without-header">
        <div className="top-heading">Extract Report</div>
        <div className="top-section">
          <div className="left-section">
            <div className="flex-gap">
              From Date
              <DateSelector
                onChange={(e) => handleDateChange(e, "from")}
                extraOptions={{ suffixIcon: null }}
              />
            </div>
            <div className="flex-gap">
              To Date
              <DateSelector
                onChange={(e) => handleDateChange(e, "to")}
                extraOptions={{ suffixIcon: null }}
              />
            </div>
          </div>
     
        </div>
        <div className="heading">Previous Reports</div>
        <TableComponent columns={columns} data={reportListing} loading={loading} />
        <ReportModal openModal={openModal} handleOnChange={handleOnChange} userInfoId={userInfoId} changeStatus={changeStatus} />
        <CustomePagination
          total={totalPage}
          current={currentPage}
          defaultPageSize={pageLimit}
          onPageChange={handlePageChange}
        />
      </ReportWrapper>
    </>
  );
}

const ReportWrapper = styled.div`
  padding-top: 30px;
  color: ${theme.lightWhite};
  .top-heading {
    font-size: 16px;
  }
  .top-section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 0;
    gap: 15px;
  }
  .left-section {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
  }
  .heading {
    margin: 30px 0;
    font-size: 16px;
  }
  .flex-gap {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
  }
  .download-btn {
    background: ${theme.lightGreen};
    color: white;
    padding: 4px 18px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 300;
  }
  .download {
    background: ${theme.greyButton};
    padding: 9px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
`;
