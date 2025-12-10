import { memo } from "react";
import styled from "styled-components";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {  HeaderSection } from "../style";
import { theme } from "util/theme";
import BackButton from "util/commonSection";
import { pageLimit } from "util/constant";
import {
  CustomePagination,
  TableComponent,
  ButtonComponent,
  ModalComponent,
  ConfirmModal
} from "component";
import useContentRequests from "hooks/eventsContent/useContentRequests";

const PodcastRequests = () => {
  const {
    requestModal,
    handlePageChange,
    totalCount,
    loading,
    currentPage,
    closeRequestModal,
    podcastRequests,
    handlePodcastNavigate,
    updatePodcastRequest,
    requestLoader,
    podcastcolumn
  } = useContentRequests();

  return (
    <PodcastRequestsWrapper>
      <HeaderSection className="heading-wrapper">
        <div className="heading">
          <BackButton />
          Podcasts Requests
        </div>
        <div className="button-component">
          <ButtonComponent
            text="Podcasts Listing"
            width="135px"
            size="middle"
            bg={theme.buttonColor}
            onClick={handlePodcastNavigate}
          />
        </div>
      </HeaderSection>
      <TableComponent data={podcastRequests} columns={podcastcolumn} loading={loading} />
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
            handleConfirm={updatePodcastRequest}
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
            } the Podcast's Request?`}
          />
        </ModalComponent>
      )}
    </PodcastRequestsWrapper>
  );
};

export default memo(PodcastRequests);

const PodcastRequestsWrapper = styled.div`
  .heading-wrapper {
    margin-top: 20px;
  }
  .heading {
    display: flex;
    gap: 5px;
  }
  .createdBy {
    cursor: pointer;
  }
  .table-wrapper {
    margin-top: 30px;
  }
  .action {
    min-width: 64px !important;
  }
  .action .view {
    text-decoration: underline;
    text-underline-offset: 3px;
    color: ${theme.greyText};
  }
`;
