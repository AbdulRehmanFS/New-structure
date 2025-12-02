/* eslint-disable react/prop-types */
import { memo } from "react";
import { modalIcons, modalSubheading, pageLimit } from "@utils/constant";
import TableComponent from "@components/Table";
import CustomePagination from "@components/Pagination";
import ModalComponent from "@components/modal/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";
import BackButton from "@utils/commonSection";
import Header from "@layouts/Header";
import useContentListing from "../hooks/useContentListing";

function ContentListing() {
  const {
    handleSearchData,
    navigate,
    contentId,
    columns,
    userListing,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    handleConfirm,
    modalName,
    modalLoading
  } = useContentListing();

  return (
    <div className="scroll-without-header">
      <Header handleSearchData={handleSearchData} heading="Series" showSearch={true} />
      <div className="px-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-5">
          <div className="flex gap-2.5 items-center">
            <BackButton />
            <div className="text-lg text-white">Episode Listing</div>
          </div>
          <ButtonComponent
            text="Archive"
            width="110px"
            size="middle"
            bg={theme.buttonColor}
            onClick={() =>
              navigate("/creator/archive", { state: { type: "episode", seriesId: contentId } })
            }
          />
        </div>
        <div className="mt-8">
          <TableComponent columns={columns} data={userListing} loading={loading} />
        </div>
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
              confirmButtonText="Confirm"
              loading={modalLoading}
              subheading={modalSubheading[modalName]}
            />
          </ModalComponent>
        )}
      </div>
    </div>
  );
}

export default memo(ContentListing);
