import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ButtonComponent from "component/fields/button";
import TableComponent from "component/table";
import CustomePagination from "component/table/pagination";
import { HeaderSection, OuterWrapper } from "../style";
import BackButton from "util/commonSection";
import ModalComponent from "component/modal";
import ConfirmModal from "component/modal/confirmModal";
import Header from "component/header";
import { pageLimit } from "util/constant";
import { theme } from "util/theme";
import { useCreatorRequestList } from "hooks/userManagement";
import RejectReason from "page/creatorAudioVideo/rejectReason";
import { useState } from "react";
import { message } from "antd";

export default function CreatorReqest() {
  const navigate = useNavigate();
  const [
    creatorRequest,
    loading,
    currentPage,
    totalCount,
    requestLoader,
    requestModal,
    updateCreatorRequest,
    handleSearchData,
    handlePageChange,
    handleRequestModal,
    columns
  ] = useCreatorRequestList();

  // state
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const [otherReason, setOtherReason] = useState("");

  const [tempRequestModal, setTempRequestModal] = useState(null);

  // handlers
  // const onChange = (values) => setSelectedValue(values);
  const onChange = (values) => {
    setSelectedValue(values[values.length - 1]);
  };

  const otherReasonChange = (e) => setOtherReason(e.target.value);

  const handleRejectConfirm = () => {
  // validation
  if (!selectedValue && !otherReason) {
    message.error("Please select or enter at least one rejection reason");
    return;
  }

  const reasons = [];

  if (selectedValue) {
    if (selectedValue === "Other") {
      if (otherReason && otherReason.trim().length > 0) {
        reasons.push(otherReason.trim());
      } else {
        reasons.push("Other");
      }
    } else {
      reasons.push(selectedValue);
    }
  }

  if (otherReason && otherReason.trim().length > 0 && selectedValue !== "Other") {
    reasons.push(otherReason.trim());
  }

  updateCreatorRequest(reasons, tempRequestModal, setShowRejectReason);

  setShowRejectReason(false);
  
  setSelectedValue("");
  setOtherReason("");
};

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="User Management" />
      <CreatorRequestWrapper className="scroll-without-header">
        <HeaderSection className="mid-section">
          <div className="heading">
            <BackButton />
            Profile Requests
          </div>
          <div className="button-component">
            <ButtonComponent
              text="User Listing"
              width="135px"
              size="middle"
              bg={theme.buttonColor}
              onClick={() => navigate(-1)}
            />
          </div>
        </HeaderSection>
        <TableComponent columns={columns} data={creatorRequest} loading={loading} />
        <CustomePagination
          total={totalCount}
          current={currentPage}
          defaultPageSize={pageLimit}
          onPageChange={handlePageChange}
        />
        {/* {requestModal?.status && (
          <ModalComponent openModal={requestModal?.status} setOpenModal={handleRequestModal}>
            <ConfirmModal
              handleCancel={handleRequestModal}
              handleConfirm={updateCreatorRequest}
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
              } the creator's Request?`}
            />
          </ModalComponent>
        )} */}
        {requestModal?.status && (
          <ModalComponent openModal={requestModal?.status} setOpenModal={handleRequestModal}>
            {requestModal?.type === "approve" ? (
              <ConfirmModal
                handleCancel={handleRequestModal}
                handleConfirm={updateCreatorRequest}
                icon={<CheckCircleOutlined style={{ fontSize: "40px", color: "green" }} />}
                iconClass="success"
                loading={requestLoader}
                confirmButtonText="Approve"
                heading="Approve"
                subheading="Do you really want to accept the creator's Request?"
              />
            ) : (
              <ConfirmModal
                handleCancel={handleRequestModal}
                handleConfirm={() => {
                  setTempRequestModal(requestModal); // ✅ backup current modal data
                  handleRequestModal(); // closes confirm modal
                  setTimeout(() => setShowRejectReason(true), 100); // open reason modal
                }}
                icon={<CloseCircleOutlined style={{ fontSize: "40px", color: "red" }} />}
                iconClass="delete"
                loading={requestLoader}
                confirmButtonText="Reject"
                heading="Reject"
                subheading="Do you really want to reject the creator's Request?"
              />
            )}
          </ModalComponent>
        )}
        {showRejectReason && (
          <RejectReason
            isModalOpen={showRejectReason}
            handleclose={() => {
              setShowRejectReason(false);
              setSelectedValue([]);
              setOtherReason("");
            }}
            rejected={handleRejectConfirm}
            loading={requestLoader}
            onChange={onChange}
            otherReasonChange={otherReasonChange}
            selectedValue={selectedValue}
            text="Reject Request"
          />
        )}
      </CreatorRequestWrapper>
    </>
  );
}

const CreatorRequestWrapper = styled(OuterWrapper)`
  .table-wrapper {
    margin-top: 30px;
  }
  .heading {
    display: flex;
    gap: 5px;
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
`;
