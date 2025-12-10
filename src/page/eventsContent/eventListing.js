import { memo } from "react";
import styled from "styled-components";
import { HeaderSection } from "../style";
import { eventPodcastFilter, modalIcons, modalSubheading, pageLimit } from "util/constant";
import {
  SelectComponent,
  TableComponent,
  CustomePagination,
  ButtonComponent,
  ModalComponent,
  ConfirmModal
} from "component";

import { theme } from "util/theme";
import useEventListing from "hooks/eventsContent/useEventListing";

const EventListing = () => {
  const {
    eventListing,
    modalName,
    modalLoading,
    selectedFilter,
    totalPage,
    handleConfirm,
    handleModalOpen,
    handleStatusSelection,
    openModal,
    handlePageChange,
    currentPage,
    loading,
    eventcolumn,
    navigateEventRequest
  } = useEventListing();

  const modifyfilter=[...eventPodcastFilter]
 modifyfilter.pop()
 


  return (
    <EventListingWrapper>
      <HeaderSection className="heading">
        <div>Events Listing </div>
        <div className="right-section">
          <ButtonComponent
            text="Archive"
            width="80px"
            size="middle"
            onClick={() => navigateEventRequest(1)}
            bg={theme.buttonColor}
          />
          <ButtonComponent
            text="Requests"
            width="80px"
            size="middle"
            onClick={() => navigateEventRequest(2)}
            bg={theme.buttonColor}
          />
          <SelectComponent
            size="middle"
            options={modifyfilter}
            onChange={handleStatusSelection}
            value={selectedFilter}
          />
        </div>
      </HeaderSection>
      <TableComponent data={eventListing} columns={eventcolumn} loading={loading} />
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
    </EventListingWrapper>
  );
};
export default memo(EventListing);
const EventListingWrapper = styled.div`
  .heading {
    margin-top: 20px;
  }
  .table-wrapper {
    margin-top: 30px;
  }
  .right-section {
    display: flex;
    gap: 10px;
  }
`;
