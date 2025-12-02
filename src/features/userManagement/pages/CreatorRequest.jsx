import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ButtonComponent from "@components/Button";
import { TableComponent, CustomePagination } from "@components";
import { HeaderSection, OuterWrapper } from "../utils/style";
import BackButton from "@utils/commonSection";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import Header from "@layouts/Header";
import { pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";
import { useCreatorRequestList } from "../hooks";
import RejectReason from "@features/creatorAudioVideo/components/RejectReason";
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

  const [showRejectReason, setShowRejectReason] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const [otherReason, setOtherReason] = useState("");

  const [tempRequestModal, setTempRequestModal] = useState(null);

  const onChange = (values) => {
    setSelectedValue(values[values.length - 1]);
  };

  const otherReasonChange = (e) => setOtherReason(e.target.value);

  const handleRejectConfirm = () => {
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
          <div className="flex gap-[5px]">
            <BackButton />
            Profile Requests
          </div>
          <div className="flex gap-2.5">
            <ButtonComponent
              text="User Listing"
              width="135px"
              size="middle"
              bg={theme.buttonColor}
              onClick={() => navigate(-1)}
              height="32px"
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
                  setTempRequestModal(requestModal);
                  handleRequestModal();
                  setTimeout(() => setShowRejectReason(true), 100);
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
  .action {
    min-width: 60px !important;
    span {
      display: flex;
    }
  }
  .creator-name {
    cursor: pointer;
  }
`;
