/* eslint-disable no-nested-ternary */
import { memo, useState } from "react";
import styled from "styled-components";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import TableComponent from "component/table";
import CustomePagination from "component/table/pagination";
import { HeaderSection, OuterWrapper } from "../style";
import BackButton from "util/commonSection";
import ModalComponent from "component/modal";
import ConfirmModal from "component/modal/confirmModal";
import Header from "component/header";
import { contentRequestType, pageLimit } from "util/constant";
import useRequestSection from "hooks/contentApprovel/useRequestSection";
import { useLocation } from "react-router-dom";
import RejectReason from "./rejectReason";

function AudioReqest() {
  const { type = contentRequestType.audio } = useLocation()?.state || {};
  const [selectedValue, setSelectedValue] = useState(null);
  const [otherReason, setOtherReason] = useState();

  const onChange = (e) => {
    setSelectedValue(e[e.length - 1]);
  };
  const otherReasonChange=(e)=>{
      setOtherReason(e.target.value)
  }


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
  } = useRequestSection({ type,
    selectedValue,
    otherReason
  });

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Content Approval" />
      <AudioRequestWrapper className="scroll-without-header">
        <HeaderSection className="mid-section">
          <div className="heading">
            <BackButton />
            {type === contentRequestType.audio
              ? "Audio Requests"
              : type === contentRequestType.video
                ? "Video Requests"
                : "Series Requests"}
          </div>
        </HeaderSection>
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
      </AudioRequestWrapper>
    </>
  );
}
export default memo(AudioReqest);

const AudioRequestWrapper = styled(OuterWrapper)`
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

  .button-component {
    display: flex;
    gap: 10px;
  }
  .thumbnail {
    object-fit: contain;
  }
`;
