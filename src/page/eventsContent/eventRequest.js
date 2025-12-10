import styled from "styled-components";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import {
  HeaderSection,
  OuterWrapper,
} from "../style";
import ButtonComponent from "component/fields/button";
import TableComponent from "component/table";
import CustomePagination from "component/table/pagination";
import BackButton  from "util/commonSection";
import { pageLimit } from "util/constant";
import ModalComponent from "component/modal";
import ConfirmModal from "component/modal/confirmModal";
import { theme } from "util/theme";
import useEventRequest from "hooks/eventsContent/useEventRequest";


export default function EventRequest() {
  const {
    requestModal,
        requestLoader,
        updateEventRequest,
        closeRequestModal,
        handlePageChange,
        currentPage,
        totalCount,
        loading,
        eventListing,
        eventRequestColumns,
        handleEventNavigate

  }=useEventRequest();
  return (
    <EventRequestWrapper>
      <HeaderSection className="top-section">
        <div className="heading">
          <BackButton />
          Events Requests
        </div>
        <div className="button-component">
          <ButtonComponent
            text="Events Listing"
            width="135px"
            size="middle"
            bg={theme.buttonColor}
            onClick={handleEventNavigate}
          />
        </div>
      </HeaderSection>
      <TableComponent
        columns={eventRequestColumns}
        data={eventListing}
        loading={loading}
      />
      <CustomePagination
        total={totalCount}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
      {requestModal?.status && (
        <ModalComponent
          openModal={requestModal?.status}
          setOpenModal={closeRequestModal}
        >
          <ConfirmModal
            handleCancel={closeRequestModal}
            handleConfirm={updateEventRequest}
            icon={
              requestModal?.type === "approve" ? (
                <CheckCircleOutlined
                  style={{ fontSize: "40px", color: "green" }}
                />
              ) : (
                <CloseCircleOutlined style={{ fontSize: "40px" }} />
              )
            }
            iconClass={requestModal?.type === "approve" ? "success" : "delete"}
            loading={requestLoader}
            confirmButtonText={
              requestModal?.type === "approve" ? "Approve" : "Decline"
            }
            heading={requestModal?.type === "approve" ? "Approve" : "Decline"}
            subheading={`Do you really want to ${
              requestModal?.type === "approve" ? "accept" : "reject"
            } the Event's Request?`}
          />
        </ModalComponent>
      )}
    </EventRequestWrapper>
  );
}

const EventRequestWrapper = styled(OuterWrapper)`
  .createdBy {
    cursor: pointer;
  }
  .heading {
    display: flex;
    gap: 5px;
  }
  .button-component {
    display: flex;
    gap: 10px;
  }
  .viewer-action {
    .action {
      min-width: 100%;
    }
  }
  .table-wrapper {
    margin-top: 30px;
  }
`;
