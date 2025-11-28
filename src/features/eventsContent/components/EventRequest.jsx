import { memo } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ButtonComponent from "@components/Button";
import TableComponent from "@components/Table";
import CustomePagination from "@components/Pagination";
import BackButton from "@features/common/components/BackButton";
import { pageLimit } from "@utils/constant";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { theme } from "@utils/theme";
import { useEventRequest } from "../hooks";

const EventRequest = () => {
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
  } = useEventRequest();

  return (
    <div className="mt-5">
      <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4 mb-5">
        <div className="flex items-center gap-2.5">
          <BackButton />
          <div className="text-2xl font-semibold text-white">Events Requests</div>
        </div>
        <div className="flex items-center gap-2.5">
          <ButtonComponent
            text="Events Listing"
            width="135px"
            size="middle"
            bg={theme.buttonColor}
            onClick={handleEventNavigate}
          />
        </div>
      </div>
      <TableComponent
        columns={eventRequestColumns}
        data={eventListing}
        loading={loading}
        rowKey="_id"
      />
      <CustomePagination
        total={totalCount}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
      {requestModal?.status && (
        <ModalComponent openModal={requestModal?.status} setOpenModal={closeRequestModal}>
          <ConfirmModal
            handleCancel={closeRequestModal}
            handleConfirm={updateEventRequest}
            icon={
              requestModal?.type === "approve" ? (
                <CheckCircleOutlined style={{ fontSize: "40px", color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ fontSize: "40px" }} />
              )
            }
            iconClass={requestModal?.type === "approve" ? "success" : "delete"}
            loading={requestLoader}
            confirmButtonText={requestModal?.type === "approve" ? "Approve" : "Decline"}
            heading={requestModal?.type === "approve" ? "Approve" : "Decline"}
            subheading={`Do you really want to ${
              requestModal?.type === "approve" ? "accept" : "reject"
            } the Event's Request?`}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default memo(EventRequest);

