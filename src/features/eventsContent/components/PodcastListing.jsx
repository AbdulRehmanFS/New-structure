import { memo } from "react";
import ButtonComponent from "@components/Button";
import CustomePagination from "@components/Pagination";
import TableComponent from "@components/Table";
import SelectComponent from "@components/Select";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { theme } from "@utils/theme";
import { eventPodcastFilter, pageLimit } from "@utils/constant";
import { useContentListing } from "../hooks";

const PodcastListing = () => {
  const {
    podcastListing,
    modalLoading,
    modalName,
    podcastcolumn,
    loading,
    totalPage,
    selectedFilter,
    navigateEventRequest,
    handleStatusSelection,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    handleConfirm,
    modalIcons,
    modalSubheading
  } = useContentListing();

  return (
    <div className="mt-5">
      <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl mb-5">
        <div className="text-lg text-white">Contents Listing</div>
        <div className="flex items-center gap-2.5">
          <ButtonComponent
            text="Archive"
            width="80px"
            size="middle"
            bg={theme.buttonColor}
            onClick={navigateEventRequest}
            height="32px"
          />
          <SelectComponent
            size="middle"
            options={eventPodcastFilter}
            onChange={handleStatusSelection}
            value={selectedFilter}
            bg={theme.formField || "#2a2a2a"}
            textColor="white"
            optionsBg={theme.screenBackground}
            border="transparent"
          />
        </div>
      </div>
      <TableComponent
        data={podcastListing}
        columns={podcastcolumn}
        loading={loading}
        rowKey="_id"
      />
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

export default memo(PodcastListing);

