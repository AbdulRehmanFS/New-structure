import { memo } from "react";
import ButtonComponent from "@components/Button";
import CustomePagination from "@components/Pagination";
import TableComponent from "@components/Table";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { theme } from "@utils/theme";
import { pageLimit } from "@utils/constant";
import { useAudioListing } from "../hooks";

const AudioSection = ({ searchText = "" }) => {
  const {
    userListing,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    modalIcons,
    modalSubheading,
    modalLoading,
    handleConfirm,
    navigateAudioRequest,
    columns
  } = useAudioListing({ searchText });

  return (
    <div className="mt-5">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-3 rounded-xl mb-5">
        <div className="text-base sm:text-lg text-white">Audio Listing</div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          <div className="w-full sm:w-auto sm:min-w-[110px]">
            <ButtonComponent
              text="Archive"
              width="100%"
              size="middle"
              bg={theme.buttonColor}
              onClick={() => navigateAudioRequest(1)}
              height="32px"
            />
          </div>
          <div className="w-full sm:w-auto sm:min-w-[100px]">
            <ButtonComponent
              text="Requests"
              width="100%"
              bg={theme.buttonColor}
              size="middle"
              onClick={() => navigateAudioRequest(2)}
              height="32px"
            />
          </div>
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

export default memo(AudioSection);

