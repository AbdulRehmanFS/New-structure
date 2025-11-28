import { memo } from "react";
import ButtonComponent from "@components/Button";
import CustomePagination from "@components/Pagination";
import TableComponent from "@components/Table";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import BackButton from "@features/common/components/BackButton";
import { theme } from "@utils/theme";
import { pageLimit } from "@utils/constant";
import useContentEpisodes from "../hooks/useContentEpisodes";

const ContentEpisodes = () => {
  const {
    recordedContent,
    column,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    handleBack,
    modalLoading,
    modalName,
    openModal,
    handleConfirm,
    handleModalOpen,
    navigateArchive,
    modalIcons,
    modalSubheading
  } = useContentEpisodes();

  return (
    <div className="mt-5">
      <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4 mb-5">
        <div className="flex items-center gap-2.5" onClick={handleBack}>
          <BackButton />
          <div className="text-2xl font-semibold text-white cursor-pointer">Episodes Listings</div>
        </div>
        <ButtonComponent
          text="Archive"
          width="110px"
          size="middle"
          bg={theme.buttonColor}
          onClick={navigateArchive}
        />
      </div>
      <TableComponent data={recordedContent} columns={column} loading={loading} rowKey="_id" />
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

export default memo(ContentEpisodes);
