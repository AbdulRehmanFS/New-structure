import styled from "styled-components";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import Header from "component/header";
import { ButtonComponent, CustomePagination, ModalComponent, TableComponent } from "component/index";
import { theme } from "util/theme";
import BackButton from "util/commonSection";
import { useViewAllListing } from "hooks/userManagement";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmModal from "component/modal/confirmModal";

export default function ViewAll() {

  const { userId,type } = useLocation()?.state || {};
  const {
    handleSearchData,
    handlePageChange,
    eventData,
    contentData,
    contentTotalPage,
    tableLoader,
    currentPage,
    totalPage,
    contentColumns,
    eventColumns,
    eventopenModal,
    eventmodalName,
    modalEventLoading,
    handleEventModalOpen,
    handleEventConfirm
   } = useViewAllListing(userId);
  
   const navigate=useNavigate()
   const navigateRequest=()=>{
    navigate("/user-management/event-content-archive",{
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
      
        <TableComponent
          columns={type === "event" ? eventColumns : contentColumns}
          data={type==="event"?eventData:contentData}
          loading={tableLoader}
        />
        <CustomePagination
          total={type==="event"?totalPage:contentTotalPage}
          current={currentPage}
          defaultPageSize={pageLimit}
          onPageChange={handlePageChange}
        />
              {eventopenModal && (
        <ModalComponent openModal={eventopenModal} setOpenModal={handleEventModalOpen}>
          <ConfirmModal
            handleCancel={handleEventModalOpen}
            handleConfirm={handleEventConfirm}
            icon={modalIcons[eventmodalName]}
            confirmButtonText="Confirm"
            loading={modalEventLoading}
            subheading={modalSubheading[eventmodalName]}
          />
        </ModalComponent>
      )}
      </ViewAllWrapper>
    </>
  );
}

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
