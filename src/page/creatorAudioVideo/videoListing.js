/* eslint-disable react/prop-types */

import styled from "styled-components";
import { HeaderSection } from "../style";
import {
  TableComponent,
  CustomePagination,
  ButtonComponent,
  ModalComponent
} from "component";
import {  modalIcons, modalSubheading, pageLimit } from "util/constant";

import { theme } from "util/theme";
import ConfirmModal from "component/modal/confirmModal";
import useVideoListing from "hooks/contentApprovel/useVideoListing";

export default function VideoSection({searchText = "" }) {
  const {
    modalName,
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
  } = useVideoListing({searchText});
  

  
  return (
    <VideoSectionWrapper>
      <HeaderSection className="heading-section">
        <div>Video Listing</div>
        <div className="actions-btns">
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
      </HeaderSection>
      <TableComponent columns={columns} data={userListing} loading={loading} />
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
    </VideoSectionWrapper>
  );
}

const VideoSectionWrapper = styled.div`
  .heading-section {
    margin-top: 20px;
  }
  .table-wrapper {
    margin-top: 30px;
  }
  .actions-btns {
    display: flex;
    gap: 10px;
  }
`;
