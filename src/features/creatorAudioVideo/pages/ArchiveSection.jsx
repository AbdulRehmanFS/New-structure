import { memo } from "react";
import Header from "@layouts/Header";
import BackButton from "@features/common/components/BackButton";
import TableComponent from "@components/Table";
import CustomePagination from "@components/Pagination";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { pageLimit } from "@utils/constant";
import { contentRequestType } from "@utils/constant";
import { useLocation } from "react-router-dom";
import useArchive from "../hooks/useArchive";

const ArchiveSection = () => {
  const { type = contentRequestType.audio } = useLocation()?.state || {};
  const {
    columns,
    loading,
    openModal,
    handleModalOpen,
    handleConfirm,
    modalLoading,
    totalPage,
    currentPage,
    archiveData,
    handleSearchData,
    handlePageChange,
    title,
    modalIcons,
    modalSubheading
  } = useArchive();

  const getHeading = () => {
    if (type === contentRequestType.audio) return "Audio Archive";
    if (type === contentRequestType.video) return "Video Archive";
    if (type === contentRequestType.series) return "Series Archive";
    if (type === contentRequestType.klipz) return "Klipz Archive";
    return "Archive";
  };

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Content Approval" />
      <div className="scroll-without-header">
        <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4 mb-5 mt-5">
          <div className="flex items-center gap-2">
            <BackButton />
            <div className="text-2xl font-semibold text-white">{getHeading()}</div>
          </div>
        </div>
        <TableComponent columns={columns} data={archiveData} loading={loading} />
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
    </>
  );
};

export default memo(ArchiveSection);

