import { memo } from "react";
import styled from "styled-components";
import {  HeaderSection} from "../style";
import { theme } from "util/theme";
import {
  eventPodcastFilter,
  modalIcons,
  modalSubheading,
  pageLimit,
} from "util/constant";

import {
  ButtonComponent,
  ConfirmModal,
  CustomePagination,
  ModalComponent,
  SelectComponent,
  TableComponent,
} from "component";
import useContentlisting from "hooks/eventsContent/useContentListing";




const PodcastListing = () => {
  const {
    podcastListing,
    modalLoading,
    modalName,
    podcastcolumn,
    loading,
    totalPage,
    selectedFilter,
    navigateEventRequest,
    handleStatusSelection,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    handleConfirm

  }=useContentlisting()
 
 

  return (
    <PodcastListingWrapper>
      <HeaderSection className="heading">
        <div>Contents Listing </div>
        <div className="filter-section">
          <ButtonComponent
            text="Archive"
            width="80px"
            size="middle"
            bg={theme.buttonColor}
            onClick={navigateEventRequest}
          />
          <SelectComponent
            size="middle"
            options={eventPodcastFilter}
            onChange={handleStatusSelection}
            value={selectedFilter}
          />
        </div>
      </HeaderSection>
      <TableComponent
        data={podcastListing}
        columns={podcastcolumn}
        loading={loading}
      />
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
    </PodcastListingWrapper>
  );
};

export default memo(PodcastListing);
 
 export const PodcastListingWrapper = styled.div`
  .heading {
    margin-top: 20px;
  }
    .back-navigate{
    display:flex;
    align-items:center;
    cursor:pointer;
    }
  .table-wrapper {
    margin-top: 30px;
  }
  .action .view {
    text-decoration: underline;
    text-underline-offset: 3px;
    color: ${theme.greyText};
  }
  .filter-section {
    display: flex;
    gap: 10px;
  }
`;


