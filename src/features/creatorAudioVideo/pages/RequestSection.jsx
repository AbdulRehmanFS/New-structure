import { memo, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Header from "@layouts/Header";
import BackButton from "@features/common/components/BackButton";
import TableComponent from "@components/Table";
import CustomePagination from "@components/Pagination";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import RejectReason from "../components/RejectReason";
import { contentRequestType, pageLimit } from "@utils/constant";
import { useLocation } from "react-router-dom";
import useRequestSection from "../hooks/useRequestSection";

const RequestSection = () => {
  const { type = contentRequestType.audio } = useLocation()?.state || {};
  const [selectedValue, setSelectedValue] = useState(null);
  const [otherReason, setOtherReason] = useState("");

  const onChange = (e) => {
    setSelectedValue(e[e.length - 1]);
  };

  const otherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  const {
    handlePageChange,
    handleSearchData,
    columns,
    requestModal,
    updateContentRequest,
    loading,
    creatorRequest,
    totalCount,
    currentPage,
    handleRequestModal,
    requestLoader,
    isModalOpen,
    handleclose,
    rejected
  } = useRequestSection({ type, selectedValue, otherReason });

  const getHeading = () => {
    if (type === contentRequestType.audio) return "Audio Requests";
    if (type === contentRequestType.video) return "Video Requests";
    if (type === contentRequestType.series) return "Series Requests";
    return "Content Requests";
  };

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Content Approval" />
      <div className="scroll-without-header">
        <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4 mb-5 mt-5">
          <div className="flex items-center gap-2">
            <BackButton />
            <div className="text-2xl font-semibold text-white">{getHeading()}</div>
          </div>
        </div>
        <TableComponent columns={columns} data={creatorRequest} loading={loading} />
        <CustomePagination
          total={totalCount}
          current={currentPage}
          defaultPageSize={pageLimit}
          onPageChange={handlePageChange}
        />
        <RejectReason
          isModalOpen={isModalOpen}
          handleclose={handleclose}
          rejected={rejected}
          loading={requestLoader}
          onChange={onChange}
          otherReasonChange={otherReasonChange}
          selectedValue={selectedValue}
        />
        {requestModal?.status && (
          <ModalComponent openModal={requestModal?.status} setOpenModal={handleRequestModal}>
            <ConfirmModal
              handleCancel={handleRequestModal}
              handleConfirm={updateContentRequest}
              icon={
                requestModal?.type === "approve" ? (
                  <CheckCircleOutlined style={{ fontSize: "40px", color: "green" }} />
                ) : (
                  <CloseCircleOutlined style={{ fontSize: "40px" }} />
                )
              }
              iconClass={requestModal?.type === "approve" ? "success" : "delete"}
              loading={requestLoader}
              confirmButtonText={requestModal?.type === "approve" ? "Approve" : "Reject"}
              heading={requestModal?.type === "approve" ? "Approve" : "Reject"}
              subheading={`Do you really want to ${
                requestModal?.type === "approve" ? "accept" : "reject"
              } the creator's content Request?`}
            />
          </ModalComponent>
        )}
      </div>
    </>
  );
};

export default memo(RequestSection);
