import Header from "@layouts/Header";
import BackButton from "@features/common/components/BackButton";
import { ConfirmModal, CustomePagination, ModalComponent, TableComponent } from "@components";
import { modalIcons, modalSubheading, pageLimit } from "@utils/constant";
import useEventContentArchive from "../hooks/useEventContentArchive";

function Eventcontentarchive() {
  const {
    modalLoading,
    modalName,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    handleConfirm,
    columns,
    archiveData,
    type,
    handleSearchData
  } = useEventContentArchive();

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Live Events and Contents" />
      <div className="scroll-without-header">
        <div className="flex items-center gap-2.5 mb-5 mt-5">
          <BackButton />
          <div className="text-2xl font-semibold text-white">
            {type === "Events" ? "Archive Events" : "Archive Contents"}
          </div>
        </div>
        <TableComponent columns={columns} data={archiveData} loading={loading} rowKey="_id" />
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
    </>
  );
}

export default Eventcontentarchive;
