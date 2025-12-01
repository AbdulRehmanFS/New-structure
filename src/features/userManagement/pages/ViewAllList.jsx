import { useLocation, useNavigate } from "react-router-dom";
import { ButtonComponent, TableComponent, CustomePagination, ModalComponent } from "@components";
import { theme } from "@utils/theme";
import BackButton from "@utils/commonSection";
import { useViewAllListing } from "../hooks";
import Header from "@layouts/Header";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { modalIcons, modalSubheading, pageLimit } from "@utils/constant";

export default function ViewAll() {
  const { userId, type } = useLocation()?.state || {};
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

  const navigate = useNavigate();
  const navigateRequest = () => {
    navigate("/user-management/event-content-archive", {
      state: { userId, type }
    });
  };

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="User Management" showSearch={false} />
      <div className="mt-[30px] text-light-white">
        <div className="flex items-center justify-between">
          <div className="my-[30px] text-base flex items-center">
            <BackButton />
            Creator {type === "event" ? "Events" : "Content"}
          </div>
          <ButtonComponent
            text="Archive"
            width="80px"
            size="middle"
            bg={theme.buttonColor}
            onClick={navigateRequest}
            height="40px"
          />
        </div>

        <TableComponent
          columns={type === "event" ? eventColumns : contentColumns}
          data={type === "event" ? eventData : contentData}
          loading={tableLoader}
        />
        <CustomePagination
          total={type === "event" ? totalPage : contentTotalPage}
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
      </div>
    </>
  );
}
