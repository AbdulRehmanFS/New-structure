import { memo } from "react";
import ButtonComponent from "@components/Button";
import CustomePagination from "@components/Pagination";
import TableComponent from "@components/Table";
import SelectComponent from "@components/Select";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { theme } from "@utils/theme";
import { pageLimit } from "@utils/constant";
import { useEventListing } from "../hooks";

const EventListing = () => {
  const {
    eventListing,
    modalName,
    modalLoading,
    selectedFilter,
    totalPage,
    handleConfirm,
    handleModalOpen,
    handleStatusSelection,
    openModal,
    handlePageChange,
    currentPage,
    loading,
    eventcolumn,
    navigateEventRequest,
    modifyfilter,
    modalIcons,
    modalSubheading
  } = useEventListing();

  return (
    <div className="mt-5">
      <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl  mb-5">
        <div className="text-lg text-white">Events Listing</div>
        <div className="flex items-center gap-2.5">
          <ButtonComponent
            text="Archive"
            width="80px"
            size="middle"
            onClick={() => navigateEventRequest(1)}
            bg={theme.buttonColor}
            height="32px"
          />
          <ButtonComponent
            text="Requests"
            width="80px"
            size="middle"
            onClick={() => navigateEventRequest(2)}
            bg={theme.buttonColor}
            height="32px"
          />
          <SelectComponent
            size="middle"
            options={modifyfilter}
            onChange={handleStatusSelection}
            value={selectedFilter}
            bg={theme.formField || "#2a2a2a"}
            textColor="white"
            optionsBg={theme.screenBackground}
            border="transparent"
            height="32px"
          />
        </div>
      </div>
      <TableComponent data={eventListing} columns={eventcolumn} loading={loading} rowKey="_id" />
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
            iconClass={modalName}
            confirmButtonText="Confirm"
            loading={modalLoading}
            subheading={modalSubheading[modalName]}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default memo(EventListing);

