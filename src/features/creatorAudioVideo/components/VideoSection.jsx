import { memo } from "react";
import ButtonComponent from "@components/Button";
import CustomePagination from "@components/Pagination";
import TableComponent from "@components/Table";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { theme } from "@utils/theme";
import { pageLimit } from "@utils/constant";
import { useVideoListing } from "../hooks";

const VideoSection = ({ searchText = "" }) => {
  const {
    modalIcons,
    modalSubheading,
    modalLoading,
    userListing,
    columns,
    navigateRequestSection,
    loading,
    handleConfirm,
    handleModalOpen,
    openModal,
    handlePageChange,
    totalPage,
    currentPage
  } = useVideoListing({ searchText });

  return (
    <div className="mt-5">
      <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4 mb-5">
        <div className="text-2xl font-semibold text-white">Video Listing</div>
        <div className="flex items-center gap-2.5">
          <ButtonComponent
            text="Archive"
            width="110px"
            size="middle"
            bg={theme.buttonColor}
            onClick={() => navigateRequestSection(1)}
          />
          <ButtonComponent
            text="Requests"
            width="100px"
            size="middle"
            bg={theme.buttonColor}
            onClick={() => navigateRequestSection(2)}
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
      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={handleModalOpen} bg="white">
          <ConfirmModal
            handleCancel={handleModalOpen}
            handleConfirm={handleConfirm}
            icon={modalIcons}
            confirmButtonText="Confirm"
            loading={modalLoading}
            subheading={modalSubheading}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default memo(VideoSection);

