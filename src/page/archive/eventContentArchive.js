import styled from "styled-components";
import Header from "component/header";
import BackButton from "util/commonSection";
import { HeaderSection, OuterWrapper } from "../style";
import { ConfirmModal, CustomePagination, ModalComponent, TableComponent } from "component/index";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import useEventContnetArchive from "hooks/archive/useEventContnetArchive";

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
  } = useEventContnetArchive();

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Live Events and Contents" />
      <AudioRequestWrapper className="scroll-without-header">
        <HeaderSection className="mid-section">
          <div className="heading">
            <BackButton />
            <div>{type === "Events" ? "Archive Events" : "Archive Contents"}</div>
          </div>
        </HeaderSection>
        <TableComponent columns={columns} data={archiveData} loading={loading} />
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
      </AudioRequestWrapper>
    </>
  );
}

export default Eventcontentarchive;

const AudioRequestWrapper = styled(OuterWrapper)`
  .table-wrapper {
    margin-top: 30px;
  }
  .heading {
    display: flex;
    gap: 5px;
  }
  .creator-name {
    pointer: cursor;
  }
  .action {
    min-width: 60px !important;
    span {
      display: flex;
    }
  }
  .creator-name {
    cursor: pointer;
  }
  .button-component {
    display: flex;
    gap: 10px;
  }
  .thumbnail {
    object-fit: contain;
  }
`;
