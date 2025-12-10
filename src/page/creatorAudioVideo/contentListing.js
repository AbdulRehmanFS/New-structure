/* eslint-disable react/prop-types */
import { memo } from "react";
import styled from "styled-components";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import { HeaderSection } from "../style";
import {
  TableComponent,
  CustomePagination,
  ModalComponent,
  ConfirmModal,
  ButtonComponent
} from "component";
import { theme } from "util/theme";
import BackButton from "util/commonSection";
import Header from "component/header";
import useContentListing from "hooks/contentApprovel/useContentListing";

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
    <SeriesSectionWrapper>
      <Header handleSearchData={handleSearchData} heading="Series" />
      <HeaderSection className="heading-section">
        <div className="back-container">
          <BackButton />
          Episode Listing
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

export default memo(ContentListing);

const SeriesSectionWrapper = styled.div`
  .heading-section {
    margin-top: 20px;
  }
  .table-wrapper {
    margin-top: 30px;
  }
  .back-container {
    display: flex;
    gap: 10px;
  }
`;

