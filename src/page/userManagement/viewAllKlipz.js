import styled from "styled-components";
import { theme } from "antd";
import { useLocation } from "react-router-dom";
import Header from "component/header";
import BackButton from "util/commonSection";
import { ButtonComponent, CustomePagination, ModalComponent, TableComponent } from "component/index";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import { useViewAllKlipz } from "hooks/userManagement";
import ConfirmModal from "component/modal/confirmModal";

function ViewAllKlipz() {
  const { userId } = useLocation()?.state || {};
  const {
    viewAllListing,
    currentPage,
    tableLoader,
    totalPage,
    handleSearchData,
    handlePageChange,
    klipzContent,
    openModal,
    modalLoading,
    handleConfirm,
    modalName,
    handleModalOpen,
    navigateEventRequest

  } = useViewAllKlipz(userId);

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="User Management" showSearch={false} />
      <ViewAllWrapper>
        <div className="main-heading">
        <div className="heading">
          <BackButton />
          Creator Klipz
        </div>
        <ButtonComponent
            text="Archive"
            width="80px"
            size="middle"
            
            bg={theme.buttonColor}
            onClick={navigateEventRequest}
          />

        </div>
    

        <TableComponent columns={klipzContent} data={viewAllListing} loading={tableLoader} />
        <CustomePagination
          total={totalPage}
          current={currentPage}
          defaultPageSize={pageLimit}
          onPageChange={handlePageChange}
        />
          {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={handleModalOpen}>
          <ConfirmModal
            handleCancel={handleModalOpen}
            handleConfirm={handleConfirm}
            icon={modalIcons[modalName]}
            confirmButtonText="Confirm"
            loading={modalLoading}
            subheading={modalSubheading[modalName]}
          />
        </ModalComponent>
      )}
      </ViewAllWrapper>
    </>
  );
}

export default ViewAllKlipz;
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
    justify-content:space-between;
    }
`;
