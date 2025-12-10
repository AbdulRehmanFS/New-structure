/* eslint-disable react/prop-types */

import styled from "styled-components";
import { theme } from "util/theme";
import { HeaderSection } from "../style";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import {
  TableComponent,
  CustomePagination,
  ButtonComponent,
  ModalComponent,
  ConfirmModal
} from "component";

import useAudioListing from "hooks/contentApprovel/useAudioListing";

export default function AudioSection({ searchText = "" }) {
  const {
    userListing,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    modalName,
    modalLoading,
    handleConfirm,
    navigateAudioRequest,
    columns
  } = useAudioListing({ searchText });
  return (
    <AudioSectionWrapper>
      <HeaderSection className="heading-section">
        <div>Audio Listing</div>
        <div className="actions-btns">
          <ButtonComponent
            text="Archive"
            width="110px"
            size="middle"
            bg={theme.buttonColor}
            onClick={() => navigateAudioRequest(1)}
          />
          <ButtonComponent
            text="Requests"
            width="100px"
            bg={theme.buttonColor}
            size="middle"
            onClick={() => navigateAudioRequest(2)}
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
    </AudioSectionWrapper>
  );
}
const AudioSectionWrapper = styled.div`
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
