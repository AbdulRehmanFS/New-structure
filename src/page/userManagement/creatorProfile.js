/* eslint-disable camelcase */
import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { HeaderSection, OuterWrapper } from "../style";
import ButtonComponent from "component/fields/button";
import ProfileInfoCard from "./profileInfoCard";
import CountCard from "component/cards/countCard";
import TableComponent from "component/table";
import { buck_purchase_columns, buck_spent_columns, reports_columns } from "./data";
import TableHeaderWrapper from "component/tableHeaderWrapper";
import BackButton from "util/commonSection";
import ModalComponent from "component/modal";
import CommissionForm from "./commissionForm";
import ConfirmModal from "component/modal/confirmModal";
import { WarningMessageIcon } from "util/svgFile";
import { issuesArray, modalicon, modalIcons, modalSubheading } from "util/constant";
import Header from "component/header";
import { theme } from "util/theme";
import {
  useDeactiveUser,
  useSeriesViewListing,
  useUserProfile,
  useViewAllKlipz,
  useViewAllListing
} from "hooks/userManagement";
import ReportModal from "page/reports/reportModal";
import RejectReason from "page/creatorAudioVideo/rejectReason";
import DateRangeFilter from "component/DateRangeFilter/DateRangeFilter";

export default function CreatorProfile() {
  const creator = useLocation()?.state || {};
  const userId = creator?.userInfo?._id ?? null;
  const [selectedValue, setSelectedValue] = useState(null);
  const [otherReason, setOtherReason] = useState();
  const onChange = (e) => {
    setSelectedValue(e[e.length - 1]);
  };
  const otherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };
   const [filter, setFilter] = useState({
    type: "current",
    start: null,
    end: null,
  })
  const {
    creatorProfile,
    loading,  
    getUserDetail,
    allDetails,
    podcastCardInfo,
    watchTimeCard,
    subscriberCard,
    earningCard,
    eventCard
   } = useUserProfile(userId,filter);
  console.log(creatorProfile,"creatorProfile");
  console.log(watchTimeCard,"watchTimeCard");
  const [deleteModal, setdeleteModal] = useState(false);
  const {
    deactiveModal,
    handleDeactiveModal,
    handleUpdateStatus,
    deactiveloading,
    isModalOpen,
    handleclose
  } = useDeactiveUser(creatorProfile, userId, getUserDetail, otherReason, selectedValue);
  const {
    eventData,
    contentData,
    contentColumns,
    eventColumns,
    eventopenModal,
    modalEventLoading,
    eventmodalName,
    handleEventConfirm,
    handleEventModalOpen
  } = useViewAllListing(userId);
  const {
    viewSeriesListing,
    seriesColumns,
    openSeriesModal,
    handleSeriesModalOpen,
    handleSeriesConfirm,
    seriesModalName,
    seriesModalLoading
  } = useSeriesViewListing(userId);
  const [commisionModal, setCommisionModal] = useState(false);
  const handleCommisionModal = () => setCommisionModal((pre) => !pre);
  const {
    viewAllListing,
    klipzContent,
    openModal,
    modalLoading,
    handleConfirm,
    modalName,
    handleModalOpen
  } = useViewAllKlipz(userId);
  const handleOnChange = () => {
    setdeleteModal(false);
  };
  const handleDeleteModal = () => {
    setdeleteModal(true);
  };
  const changeStatus = () => {};
 
  const handleFilterSelection = (data) => {
    setFilter(data);
  };
  return (
    <>
      <Header showSearch={false} heading="User Management" />
      <CreatorProfileWrapper className="scroll-without-header">
        <HeaderSection className="top-section">
          <div className="heading">
            <BackButton />
            Content Creator Profile
          </div>
          <div className="button-component">
            <ButtonComponent
              text="Set Commission"
              width="135px"
              size="middle"
              bg={theme.buttonColor}
              onClick={handleCommisionModal}
            />
            <ButtonComponent
              text={creatorProfile?.status === "inactive" ? "Reactive User" : "De-Activate User"}
              width="135px"
              size="middle"
              bg={theme.buttonColor}
              onClick={handleDeactiveModal}
            />
            <ButtonComponent
              text="Delete User"
              size="middle"
              width="80px"
              bg={theme.white}
              onClick={handleDeleteModal}
            />
          </div>
        </HeaderSection>
        <ProfileInfoCard list={creatorProfile} watchTime={watchTimeCard?.count} loading={loading} align="right" />
        <div className="wrap">
          {/* {cardList.map((list, i) => (
            <CountCard key={i} list={list} />
          ))} */}
          <CountCard list={earningCard} />
          <CountCard list={subscriberCard} />
          <CountCard list={podcastCardInfo} />
          <CountCard list={eventCard} />
          <CountCard list={watchTimeCard} isIcon={false} />
          <DateRangeFilter   onFilterChange={handleFilterSelection}   />
          {/* <CountCard list={WatchTimeInfo} isDiamond={false} /> */}
        </div>
        <TableHeaderWrapper
          heading="Events"
          link="/user-management/creator-events"
          state={{ userId, type: "event" }}
          dataLength={5}>
          <TableComponent columns={eventColumns} data={eventData} defaultTheme={false} />
        </TableHeaderWrapper>
        <TableHeaderWrapper
          heading="Klipz"
          link="/user-management/all-klipz"
          state={{ userId, type: "klipz" }}
          dataLength={5}>
          <TableComponent columns={klipzContent} data={viewAllListing} defaultTheme={false} />
        </TableHeaderWrapper>
        <TableHeaderWrapper
          heading="Series"
          link="/user-management/series"
          state={{ userId }}
          dataLength={5}>
          <TableComponent columns={seriesColumns} data={viewSeriesListing} defaultTheme={false} />
        </TableHeaderWrapper>
        <TableHeaderWrapper
          heading="Content"
          link="/user-management/creator-content"
          state={{ userId, type: "podcast" }}
          dataLength={5}>
          <TableComponent columns={contentColumns} data={contentData} defaultTheme={false} />
        </TableHeaderWrapper>
        <TableHeaderWrapper heading="Reports" link="" dataLength={[]?.length}>
          <TableComponent columns={reports_columns} data={[]} defaultTheme={false} />
        </TableHeaderWrapper>
        <TableHeaderWrapper heading="Bucks Purchased History" link="" dataLength={[]?.length}>
          <TableComponent columns={buck_purchase_columns} data={[]} defaultTheme={false} />
        </TableHeaderWrapper>
        <TableHeaderWrapper heading="Bucks Spent History" link="" dataLength={[]?.length}>
          <TableComponent columns={buck_spent_columns} data={[]} defaultTheme={false} />
        </TableHeaderWrapper>
        <ModalComponent openModal={commisionModal} setOpenModal={handleCommisionModal}>
          <CommissionForm creatorId={userId} commissionValue={allDetails?.commission} />
        </ModalComponent>
        {openSeriesModal && (
          <ModalComponent openModal={openSeriesModal} setopenModal={handleSeriesModalOpen}>
            <ConfirmModal
              handleCancel={handleSeriesModalOpen}
              handleConfirm={handleSeriesConfirm}
              icon={modalIcons[seriesModalName]}
              confirmButtonText="Confirm"
              loading={seriesModalLoading}
              subheading={modalSubheading[seriesModalName]}
            />
          </ModalComponent>
        )}
        <ReportModal
          openModal={deleteModal}
          handleOnChange={handleOnChange}
          userInfoId={userId}
          changeStatus={changeStatus}
          deletemodal={true}
        />
        {eventopenModal && (
          <ModalComponent openModal={eventopenModal} setOpenModal={handleEventModalOpen}>
            <ConfirmModal
              handleCancel={handleEventModalOpen}
              handleConfirm={handleEventConfirm}
              icon={modalIcons[eventmodalName]}
              confirmButtonText="Confirm"
              loading={modalEventLoading}
              subheading={modalSubheading[eventmodalName]}
            />
          </ModalComponent>
        )}
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
        {openModal && (
          <ModalComponent openModal={openModal} setOpenModal={handleModalOpen}>
            <ConfirmModal
              handleCancel={handleModalOpen}
              handleConfirm={handleConfirm}
              icon={modalIcons[modalName]}
              confirmButtonText="Confirm"
              loading={modalLoading}
              subheading={modalSubheading[modalName]}
            />
          </ModalComponent>
        )}
        {deactiveModal && (
          <ModalComponent openModal={deactiveModal} setOpenModal={handleDeactiveModal}>
            <ConfirmModal
              handleCancel={handleDeactiveModal}
              handleConfirm={
                creatorProfile?.status === "inactive" ? handleUpdateStatus : handleclose
              }
              loading={deactiveloading}
              icon={<WarningMessageIcon height="60px" width="60px" />}
              iconClass={modalicon.warning}
              confirmButtonText={creatorProfile?.status === "inactive" ? "Reactive" : "Deactive"}
              heading={creatorProfile?.status === "inactive" ? "Reactive User" : "Deactive User"}
              subheading={`Do you really want to ${
                creatorProfile?.status === "inactive" ? "Reactive" : "deactive"
              } the creator?`}
            />
          </ModalComponent>
        )}
      </CreatorProfileWrapper>
    </>
  );
}
const CreatorProfileWrapper = styled(OuterWrapper)`
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
  .wrap {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .description-text {
    display: flex;
    align-items: center;
    gap: 3px;
    justify-content: center;
  }
`;