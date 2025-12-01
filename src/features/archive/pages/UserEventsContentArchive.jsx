import { useLocation } from "react-router-dom";
import { CustomePagination, ModalComponent, TableComponent } from "@components";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { modalIcons, modalSubheading, pageLimit } from "@utils/constant";
import BackButton from "@utils/commonSection";
import useUserArchive from "../hooks/useUserArchive";

const UserEventsContentArchive = () => {
  const { userId, type } = useLocation()?.state || {};

  const {
    openModal,
    archiveContent,
    klipzContent,
    modalLoading,
    loading,
    totalPage,
    currentPage,
    modalName,
    handleArchive,
    handlePageChange,
    handleParticularModal
  } = useUserArchive(userId, type);

  return (
    <div className="[&_.table-wrapper]:mt-[30px]">
      <div className="mt-5 text-lg flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <BackButton />
          archive Listing
        </div>
      </div>
      <TableComponent data={archiveContent} columns={klipzContent} loading={loading} />
      <CustomePagination
        total={totalPage}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={handleParticularModal}>
          <ConfirmModal
            handleCancel={handleParticularModal}
            handleConfirm={handleArchive}
            icon={modalIcons[modalName]}
            confirmButtonText="Confirm"
            loading={modalLoading}
            subheading={modalSubheading[modalName]}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default UserEventsContentArchive;
