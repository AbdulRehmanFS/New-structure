/* eslint-disable react/prop-types */

import styled from "styled-components";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import {  HeaderSection } from "../style";
import {
  TableComponent,
  CustomePagination,
  ButtonComponent,
  ModalComponent
} from "component";

import { theme } from "util/theme";
import ConfirmModal from "component/modal/confirmModal";
import useSeriesListing from "hooks/contentApprovel/useSeriesListing";

export default function SeriesSection({ searchText = "" }) {
  const {
    navigateRequestSection,
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
  } = useSeriesListing({ searchText });

  return (
    <SeriesSectionWrapper>
      <HeaderSection className="heading-section">
        <div>Series Listing</div>
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
            width="110px"
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
    </SeriesSectionWrapper>
  );
}
const SeriesSectionWrapper = styled.div`
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
