import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ButtonComponent from "component/fields/button";
import CountCard from "component/cards/countCard";
import TableComponent from "component/table";
import { buck_purchase_columns, buck_spent_columns } from "./data";
import TableHeaderWrapper from "component/tableHeaderWrapper";
import BackButton from "util/commonSection";
import ModalComponent from "component/modal";
import ConfirmModal from "component/modal/confirmModal";
import {  WarningMessageIcon } from "util/svgFile";
import { theme } from "util/theme";
import Header from "component/header";
import { issuesArray, modalicon } from "util/constant";
import { useDeactiveUser, useUserProfile } from "hooks/userManagement";
import ProfileInfoCard from "./profileInfoCard";
import { HeaderSection, OuterWrapper } from "page/style";
import ReportModal from "page/reports/reportModal";
import { useState } from "react";
import RejectReason from "page/creatorAudioVideo/rejectReason";

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
  const otherReasonChange=(e)=>{
      setOtherReason(e.target.value)
  }
  const [deleteModal, setdeleteModal] = useState(false);
  const { deactiveModal,
    handleDeactiveModal,
    handleUpdateStatus,
    deactiveloading,
    isModalOpen,
    handleclose} = useDeactiveUser(
    viewerProfile,
    info?.userId,
    getUserDetail,
    otherReason,
    selectedValue
  );

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
          <div className="heading">
            <BackButton />
            Viewer Profile
          </div>
          <div className="button-component">
            <ButtonComponent
              text={viewerProfile?.status === "inactive" ? "Reactivate User" : "De-Activate User"}
              width="135px"
              size="middle"
              bg={theme.buttonColor}
              onClick={handleDeactiveModal}
              loading={deactiveloading}
            />
            <ButtonComponent
              text="Delete User"
              width="60px"
              size="middle"
              bg={theme.white}
              onClick={handleDeleteModal}
            />
          </div>
        </HeaderSection>
        <ProfileInfoCard list={viewerProfile} loading={loading} align="left" type="viewer" />
        <CountCard
          list={{
            heading: "Available Bucks",
            count: "3200"
          }}
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
              handleConfirm={viewerProfile?.status === "inactive" ?handleUpdateStatus:handleclose}
              icon={<WarningMessageIcon height="60px" width="60px" />}
              iconClass={modalicon.warning}
              confirmButtonText={viewerProfile?.status === "inactive" ? "Reactive" : "Deactive"}
              heading={viewerProfile?.status === "inactive" ? "Reactive User" : "Deactive User"}
              subheading={`Are you sure you want to ${
                viewerProfile?.status === "inactive" ? "reactive" : "deactive"
              } this user ?`}
            />
          </ModalComponent>
        )}
      </ViewProfileWrapper>
    </>
  );
}

const ViewProfileWrapper = styled(OuterWrapper)`
  .button-component {
    display: flex;
    gap: 10px;
  }
  .profile-wrapper {
    margin: 20px 0;
  }
  .heading {
    display: flex;
    gap: 5px;
  }
`;
