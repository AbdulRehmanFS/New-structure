/* eslint-disable camelcase */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ButtonComponent, TableComponent } from "@components";
import ProfileInfoCard from "../components/ProfileInfoCard";
import CountCard from "@components/cards/CountCard";
import { buck_purchase_columns, buck_spent_columns, reports_columns } from "../utils/data";
import TableHeaderWrapper from "@components/TableHeaderWrapper";
import BackButton from "@utils/commonSection";
import ModalComponent from "@features/common/components/Modal";
import CommissionForm from "../components/CommissionForm";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { WarningMessageIcon } from "@utils/svgFile";
import { issuesArray, modalicon, modalIcons, modalSubheading } from "@utils/constant";
import Header from "@layouts/Header";
import { theme } from "@utils/theme";
import {
  useDeactiveUser,
  useSeriesViewListing,
  useUserProfile,
  useViewAllKlipz,
  useViewAllListing
} from "../hooks";
import ReportModal from "@features/reports/components/ReportModal";
import RejectReason from "@features/creatorAudioVideo/components/RejectReason";
import DateRangeFilter from "@components/DateRangeFilter";

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
  });
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
  } = useUserProfile(userId, filter);
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
      <div className="scroll-without-header" style={{ padding: "20px 0", display: "flex", flexDirection: "column" }}>
        <div className="text-lg flex justify-between items-center" style={{ fontSize: "18px" }}>
          <div className="flex gap-[5px] items-center flex-wrap mb-5">
            <BackButton />
            Content Creator Profile
          </div>
          <div className="flex gap-[10px] flex-wrap w-full lg:w-auto lg:justify-start max-[768px]:flex-col max-[768px]:gap-2">
            <div className="max-[768px]:w-full">
              <ButtonComponent
                text="Set Commission"
                width="135px"
                size="middle"
                bg={theme.buttonColor}
                onClick={handleCommisionModal}
                height="32px"
              />
            </div>
            <div className="max-[768px]:w-full">
              <ButtonComponent
                text={creatorProfile?.status === "inactive" ? "Reactive User" : "De-Activate User"}
                width="135px"
                size="middle"
                bg={theme.buttonColor}
                onClick={handleDeactiveModal}
                height="32px"
              />
            </div>
            <div className="max-[768px]:w-full">
              <ButtonComponent
                text="Delete User"
                size="middle"
                width="80px"
                bg={theme.white}
                onClick={handleDeleteModal}
                height="32px"
              />
            </div>
          </div>
        </div>
        <ProfileInfoCard list={creatorProfile} watchTime={watchTimeCard?.count} loading={loading} align="right" />
        <div className="flex flex-wrap items-start pb-2 mt-5 cards-container" style={{ gap: "4px" }}>
          <style>{`
            .cards-container .single-card-item {
              width: 140px !important;
              min-width: 140px !important;
              max-width: 140px !important;
            }
            @media (max-width: 1200px) {
              .cards-container .single-card-item {
                width: 130px !important;
                min-width: 130px !important;
                max-width: 130px !important;
              }
            }
            @media (max-width: 1024px) {
              .cards-container .single-card-item {
                width: 120px !important;
                min-width: 120px !important;
                max-width: 120px !important;
              }
            }
            @media (max-width: 768px) {
              .cards-container {
                flex-direction: column;
              }
              .cards-container .single-card-item {
                width: 100% !important;
                min-width: 100% !important;
                max-width: 100% !important;
              }
            }
          `}</style>
          <CountCard list={earningCard} align="left" />
          <CountCard list={subscriberCard} align="left" />
          <CountCard list={podcastCardInfo} align="left" />
          <CountCard list={eventCard} align="left" />
          <CountCard list={watchTimeCard} isIcon={false} align="left" />
        </div>
        <div className="flex justify-start overflow-x-auto" style={{ marginTop: "12px" }}>
          <DateRangeFilter onFilterChange={handleFilterSelection} />
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
          <ModalComponent openModal={openSeriesModal} setOpenModal={handleSeriesModalOpen}>
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
      </div>
    </>
  );
}
