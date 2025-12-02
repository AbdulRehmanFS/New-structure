import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ButtonComponent from "@components/Button";
import CountCard from "@components/cards/CountCard";
import { TableComponent } from "@components";
import { buck_purchase_columns, buck_spent_columns } from "../utils/data";
import TableHeaderWrapper from "@components/TableHeaderWrapper";
import BackButton, { errorMessage } from "@utils/commonSection";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { WarningMessageIcon } from "@utils/svgFile";
import { theme } from "@utils/theme";
import Header from "@layouts/Header";
import { issuesArray, modalicon } from "@utils/constant";
import { useDeactiveUser, useUserProfile } from "../hooks";
import ProfileInfoCard from "../components/ProfileInfoCard";
import { HeaderSection, OuterWrapper } from "../utils/style";
import ReportModal from "@features/reports/components/ReportModal";
import { useState } from "react";
import RejectReason from "@features/creatorAudioVideo/components/RejectReason";

export default function ViewerProfile() {
  const info = useLocation()?.state || {};
  const {
    creatorProfile: viewerProfile,
    loading,
    getUserDetail
  } = useUserProfile(info?.userId);
  const [selectedValue, setSelectedValue] = useState(null);
  const [otherReason, setOtherReason] = useState();

  const onChange = (e) => {
    setSelectedValue(e[e.length - 1]);
  };
  const otherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };
  const [deleteModal, setdeleteModal] = useState(false);
  const {
    deactiveModal,
    handleDeactiveModal,
    handleUpdateStatus,
    deactiveloading,
    isModalOpen,
    handleclose
  } = useDeactiveUser(viewerProfile, info?.userId, getUserDetail, otherReason, selectedValue);

  const handleOnChange = () => {
    setdeleteModal(false);
  };
  const handleDeleteModal = () => {
    setdeleteModal(true);
  };
  const changeStatus = () => {};

  return (
    <>
      <Header showSearch={false} heading="User Management" />
      <ViewProfileWrapper className="scroll-without-header">
        <HeaderSection className="top-section">
          <div className="flex gap-[5px]">
            <BackButton />
            Viewer Profile
          </div>
          <div className="flex gap-2.5">
            <ButtonComponent
              text={viewerProfile?.status === "inactive" ? "Reactivate User" : "De-Activate User"}
              width="135px"
              size="middle"
              bg={theme.buttonColor}
              onClick={handleDeactiveModal}
              loading={deactiveloading}
              height="32px"
            />
            <ButtonComponent
              text="Delete User"
              width="60px"
              size="middle"
              bg={theme.white}
              onClick={handleDeleteModal}
              height="32px"
            />
          </div>
        </HeaderSection>
        <ProfileInfoCard list={viewerProfile} loading={loading} align="left" type="viewer" />
        <CountCard
          list={{
            heading: "Available Bucks",
            count: "3200"
          }}
          align="left"
        />
        <TableHeaderWrapper heading="Bucks Purchased History" link="" dataLength={[]?.length}>
          <TableComponent columns={buck_purchase_columns} data={[]} defaultTheme={false} />
        </TableHeaderWrapper>
        <TableHeaderWrapper heading="Bucks Spent History" link="" dataLength={[]?.length}>
          <TableComponent
            columns={buck_spent_columns}
            data={[]}
            loading={loading}
            defaultTheme={false}
          />
        </TableHeaderWrapper>
        <ReportModal
          openModal={deleteModal}
          handleOnChange={handleOnChange}
          userInfoId={info?.userId}
          changeStatus={changeStatus}
          deletemodal={true}
        />
        <RejectReason
          isModalOpen={isModalOpen}
          handleclose={handleclose}
          rejected={handleUpdateStatus}
          loading={deactiveloading}
          onChange={onChange}
          otherReasonChange={otherReasonChange}
          selectedValue={selectedValue}
          rejectedIssue={issuesArray}
          text="Deactive user"
        />
        {deactiveModal && (
          <ModalComponent openModal={deactiveModal} setOpenModal={handleDeactiveModal}>
            <ConfirmModal
              handleCancel={handleDeactiveModal}
              handleConfirm={viewerProfile?.status === "inactive" ? handleUpdateStatus : handleclose}
              icon={<WarningMessageIcon height="60px" width="60px" />}
              iconClass={modalicon.warning}
              confirmButtonText={viewerProfile?.status === "inactive" ? "Reactive" : "Deactive"}
              heading={viewerProfile?.status === "inactive" ? "Reactive User" : "Deactive User"}
              subheading={`Are you sure you want to ${
                viewerProfile?.status === "inactive" ? "reactive" : "deactive"
              } this user ?`}
              loading={deactiveloading}
            />
          </ModalComponent>
        )}
      </ViewProfileWrapper>
    </>
  );
}

const ViewProfileWrapper = styled(OuterWrapper)`
  .profile-wrapper {
    margin: 20px 0;
  }
`;
