import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "component/header";
import BackButton from "util/commonSection";
import { ButtonComponent, CustomePagination, ModalComponent, TableComponent } from "component/index";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import ConfirmModal from "component/modal/confirmModal";
import { theme } from "util/theme";
import { useSeriesViewListing } from "hooks/userManagement";

function ViewAllSeries() {
  const { userId, type } = useLocation()?.state || {};
  const navigate=useNavigate()
  const {
    tableLoader,
    viewSeriesListing,
    totalPage,
    handlePageChange,
    currentPage,
    handleSearchData,
    handleSeriesConfirm,
    handleSeriesModalOpen,
    openSeriesModal,
    seriesModalLoading,
    seriesModalName,
    seriesColumns
   } = useSeriesViewListing(userId);
  const navigateRequest=()=>{
    navigate("/user-management/series-archive",{
      state:{userId,type}
    })
   }


  return (
    <>
      <Header handleSearchData={handleSearchData} heading="User Management" showSearch={false} />
      <ViewAllWrapper>
        <div className="main-heading">
        <div className="heading">
          <BackButton />
          Creator {type === "event" ? "Events" : "Content"}
        </div>
        <ButtonComponent
            text="Archive"
            width="80px"
            size="middle" 
            bg={theme.buttonColor}
            onClick={navigateRequest}
          />


        </div>
       
        <TableComponent columns={seriesColumns} data={viewSeriesListing} loading={tableLoader} />
        <CustomePagination
          total={totalPage}
          current={currentPage}
          defaultPageSize={pageLimit}
          onPageChange={handlePageChange}
        />
        {openSeriesModal && (
          <ModalComponent openModal={openSeriesModal} setopenModal={handleSeriesModalOpen}>
            <ConfirmModal
              handleCancel={handleSeriesModalOpen}
              handleConfirm={handleSeriesConfirm}
              icon={modalIcons[seriesModalName]}
              confirmButtonText="Confirm"
              loading={seriesModalLoading}
              subheading={modalSubheading[seriesModalName]}
            />
          </ModalComponent>
        )}
      </ViewAllWrapper>
    </>
  );
}

export default ViewAllSeries;

const ViewAllWrapper = styled.div`
  margin-top: 30px;
  color: ${theme.lightWhite};
  .heading {
    margin: 30px 0;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
    .main-heading{
    display:flex;
    align-items:center;
    justify-content:Space-between;
    }
`;
