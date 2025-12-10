import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { HeaderSection, OuterWrapper } from "page/style";
import ButtonComponent from "component/fields/button";
import ProfileInfoCard from "./profileInfoCard";
import TableComponent from "component/table";
import TableHeaderWrapper from "component/tableHeaderWrapper";
import { theme } from "util/theme";
import ModalComponent from "component/modal";

import CommissionForm from "./commissionForm";
import BackButton from "util/commonSection";
import VideoSection from "component/videoSection";
import ConfirmModal from "component/modal/confirmModal";
import Header from "component/header";
import { useCreatorReqDetails } from "hooks/userManagement";
import RejectReason from "page/creatorAudioVideo/rejectReason";
import { useState } from "react";
import { message } from "antd";

export default function CreatorProfileRequest() {
  const params = useLocation()?.state || {};
  const userId = params?.userInfo._id;
  const [
    profileLoader,
    contentDetail,
    requestProfile,
    updateCreatorRequest,
    requestModal,
    handleRequestModal,
    requestLoader,
    content_columns,
    videoModal,
    commisionModal,
    selectedVideo,
    handleVideoModalClose,
    handleCommisionModal
  ] = useCreatorReqDetails(userId);

  const [showRejectReason, setShowRejectReason] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const [otherReason, setOtherReason] = useState("");

  const onChange = (values) => setSelectedValue(values[values.length - 1]);
  const otherReasonChange = (e) => setOtherReason(e.target.value);

const handleRejectConfirm = () => {
  
  if (!selectedValue && !otherReason) {
    message.error("Please select or enter at least one rejection reason");
    return;
  }

  let finalReason;

  if (selectedValue === "Other" && otherReason.trim()) {
    finalReason = otherReason.trim();
  } 
  else if (selectedValue === "Other" && !otherReason.trim()) {
    finalReason = "Other";
  } 
  else {
    finalReason = selectedValue;
  }

  updateCreatorRequest([finalReason]);

  setShowRejectReason(false);
  setSelectedValue("");
  setOtherReason("");
};

  return (
    <>
      <Header showSearch={false} heading="User Management" />
      <RequestProfileWrapper className="scroll-without-header">
        <HeaderSection className="top-section">
          <div className="heading">
            <BackButton />
            Content Creator Profile Request
          </div>
          <div className="button-component">
            <ButtonComponent
              text="Set Commission"
              width="135px"
              size="middle"
              bg={theme.buttonColor}
              onClick={handleCommisionModal}
            />
          </div>
        </HeaderSection>
        <ProfileInfoCard list={requestProfile} loading={profileLoader} />
        <TableHeaderWrapper heading="Content" link="" viewAll={false}>
          <TableComponent columns={content_columns} data={contentDetail} />
        </TableHeaderWrapper>
        <div className="action-button-container">
          <ButtonComponent
            text="Approve"
            width="205px"
            size="large"
            bg={theme.green}
            onClick={() => handleRequestModal("approve")}
          />
          <ButtonComponent
            text="Reject"
            width="205px"
            size="large"
            bg={theme.red}
            onClick={() => handleRequestModal("reject")}
          />
        </div>
        {videoModal && (
          <ModalComponent openModal={videoModal} setOpenModal={handleVideoModalClose}>
            <VideoSection
              url={selectedVideo?.content_url ?? null}
              type={selectedVideo?.type}
              thumbnail={selectedVideo?.cover_photo_url ?? ""}
              title={selectedVideo?.title}
            />
          </ModalComponent>
        )}
        <ModalComponent openModal={commisionModal} setOpenModal={handleCommisionModal}>
          <CommissionForm creatorId={userId} />
        </ModalComponent>
        {/* {requestModal?.status && (
          <ModalComponent openModal={requestModal?.status} setOpenModal={handleRequestModal}>
            <ConfirmModal
              handleCancel={handleRequestModal}
              handleConfirm={updateCreatorRequest}
              icon={
                requestModal?.type === "approve" ? (
                  <CheckCircleOutlined style={{ fontSize: "40px", color: theme.green }} />
                ) : (
                  <CloseCircleOutlined style={{ fontSize: "40px", color: theme.red }} />
                )
              }
              iconClass={requestModal?.type === "approve" ? "success" : "delete"}
              loading={requestLoader}
              confirmButtonText="Sure"
              heading={requestModal?.type === "approve" ? "Approve" : "Decline"}
              subheading={`Do You really want to ${
                requestModal?.type === "approve" ? "Accept" : "Reject"
              } the creator Request.`}
            />
          </ModalComponent>
        )} */}
        {requestModal?.status && (
          <ModalComponent openModal={requestModal?.status} setOpenModal={handleRequestModal}>
            {requestModal?.type === "approve" ? (
              <ConfirmModal
                handleCancel={handleRequestModal}
                handleConfirm={updateCreatorRequest}
                icon={<CheckCircleOutlined style={{ fontSize: "40px", color: theme.green }} />}
                iconClass="success"
                loading={requestLoader}
                confirmButtonText="Approve"
                heading="Approve"
                subheading="Do you really want to accept the creator Request?"
              />
            ) : (
              <ConfirmModal
                handleCancel={handleRequestModal}
                // close the confirm modal and open the standalone RejectReason modal
                handleConfirm={() => {
                  handleRequestModal(); // close the confirm modal first
                  setShowRejectReason(true); // then open the RejectReason modal (outside)
                }}
                icon={<CloseCircleOutlined style={{ fontSize: "40px", color: theme.red }} />}
                iconClass="delete"
                loading={requestLoader}
                confirmButtonText="Reject"
                heading="Reject"
                subheading="Do you really want to reject the creator Request?"
              />
            )}
          </ModalComponent>
        )}

        <RejectReason
          isModalOpen={showRejectReason}
          handleclose={() => setShowRejectReason(false)}
          rejected={handleRejectConfirm}
          loading={requestLoader}
          onChange={onChange}
          otherReasonChange={otherReasonChange}
          selectedValue={selectedValue}
          text="Reject Request"
        />
      </RequestProfileWrapper>
    </>
  );
}

const RequestProfileWrapper = styled(OuterWrapper)`
  .heading {
    display: flex;
    gap: 5px;
  }
  .button-component {
    display: flex;
    gap: 10px;
  }
  .profile-wrapper {
    margin: 20px 0;
  }
  .action-button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 80px;
  }
  .description-text {
    display: flex;
    flex-direction: column;
    // text-align: left;
    .more-content {
      font-weight: 600;
      cursor: pointer;
      // padding-left: 16px;
    }
  }
  .content-link {
    text-align: left !important;
    width: 180px;
    text-wrap: balance;
  }
  .action-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
  }
  .play-icon {
    cursor: pointer;
  }
`;
