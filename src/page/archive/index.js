/* eslint-disable no-nested-ternary */

import styled from "styled-components";
import Header from "component/header";
import { HeaderSection, OuterWrapper } from "../style";
import BackButton from "util/commonSection";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import { ConfirmModal, CustomePagination, ModalComponent, TableComponent } from "component";
import useArchive from "hooks/archive/useArchive";

function Archivesection() {
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
    modalName,
    handlePageChange,
    title,
    type
  } = useArchive();
 

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Content Approval" />
      <AudioRequestWrapper className="scroll-without-header">
        <HeaderSection className="mid-section">
          <div className="heading">
            <BackButton />
            {title[type] ?? "Archive Episode"}
          </div>
        </HeaderSection>
        <TableComponent columns={type==="klipz"?columns.filter((e)=>e.key !=="genre"):columns} data={archiveData} loading={loading} />
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
              // iconClass={modalicon.delete}
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

export default Archivesection;

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
