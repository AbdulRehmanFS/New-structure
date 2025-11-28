import { useEffect, useState } from "react";
import { Col, Popover, Row } from "antd";
import moment from "moment";
import Header from "@layouts/Header";
import BackButton from "@features/common/components/BackButton";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";
import AreaChartComponent from "@features/dashboard/components/AreaChart";
import VideoSection from "../components/VideoSection";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { addMoreTime, graphHead, graphTabs } from "@utils/constant";
import { DeleteIcon, TimeIcon } from "@utils/svgFile";
import Loader from "@components/Loader";
import { CastListing } from "../components/CastListing";
import useRecordContentDetail from "../hooks/useRecordContentDetail";
import { NoData } from "@utils/commonSection";

const RecordContentDetail = () => {
  const {
    handleDeleteEvent,
    deleteLoading,
    handleDeleteModal,
    contentType,
    handleGraphTab,
    showGraph,
    contentDetail,
    releaseDate,
    loading,
    deleteModal,
    handleStartEvent,
    onWatchTrailer,
    showVideo,
    handleshowVideoClose,
    startStreamLoading,
    addTimeContent
  } = useRecordContentDetail();

  const [remaingTime, setRemainingTime] = useState(
    contentDetail?.stream_end_time ? contentDetail?.stream_end_time - moment().unix() : 0
  );

  useEffect(() => {
    if (!contentDetail?.stream_end_time) return;

    const interval = setInterval(() => {
      const currentRemainingTime = contentDetail?.stream_end_time - moment().unix();
      setRemainingTime(currentRemainingTime > 0 ? currentRemainingTime : 0);

      if (currentRemainingTime <= 0) {
        clearInterval(interval);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [contentDetail]);

  if (loading) return <Loader />;

  // Check if contentDetail has any meaningful data
  const hasData = contentDetail && Object.keys(contentDetail).length > 0 && contentDetail._id;
  
  if (!hasData) {
    return (
      <>
        <Header heading="Events and Contents" showSearch={false} />
        <div className="scroll-without-header">
          <div className="flex items-center gap-2.5 mb-5 mt-5">
            <BackButton />
            <div className="text-2xl font-semibold text-white">Content Details</div>
          </div>
          <NoData />
        </div>
      </>
    );
  }

  return (
    <>
      <Header heading="Events and Contents" showSearch={false} />
      <div className="scroll-without-header">
        <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4 mb-5 mt-5">
          <div className="flex items-center gap-2.5">
            <BackButton />
            <div className="text-2xl font-semibold text-white">Content Details</div>
          </div>
          <div className="flex gap-2.5">
            {(contentDetail?.live_type == 1 || contentDetail?.live_type == 2) &&
              (contentDetail?.status == "accepted" || contentDetail?.status == "started") && (
                <ButtonComponent
                  loading={startStreamLoading}
                  text={contentDetail?.status == "started" ? "Stop Stream" : "Start Stream"}
                  size="middle"
                  width="100px"
                  bg={theme.red}
                  onClick={handleStartEvent}
                />
              )}

            <ButtonComponent
              text="Delete Content"
              size="middle"
              width="100px"
              bg={theme.red}
              onClick={handleDeleteModal}
            />
          </div>
        </div>
        {contentDetail?.content_url ? (
          <div className="my-5">
            <VideoSection url={contentDetail?.content_url} type={contentDetail?.type} />
          </div>
        ) : (
          <div className="w-full max-h-[300px] my-5 bg-[rgba(19,19,19,1)] flex items-center justify-center">
            <img
              src={contentDetail?.cover_photo_url}
              alt=""
              className="max-w-full max-h-[300px] object-contain"
            />
          </div>
        )}
        <div className="flex justify-end p-2.5">
          <ButtonComponent
            text="Watch Trailer"
            size="middle"
            width="100px"
            bg={theme.red}
            onClick={() => onWatchTrailer()}
          />
        </div>
        <Row className="mb-8">
          <Col span={contentDetail?.cast_users?.length ? 18 : 24}>
            <div className="text-xl font-medium text-white mb-2">{contentDetail?.title}</div>
            <div className="flex flex-wrap items-center gap-2.5 my-5 text-white">
              {contentDetail?.scheduled_date && (
                <>
                  <div>Scheduled for {releaseDate}</div>
                  <div className="h-4 w-px bg-[rgba(196,196,196,0.3)]" />
                </>
              )}
              <div>{contentDetail?.viewCount || 0} views</div>
              <div className="h-4 w-px bg-[rgba(196,196,196,0.3)]" />
              <div>{contentDetail?.genre}</div>
            </div>
            <div
              className="text-white mb-2 mt-4.5 pb-1 border-b-2"
              style={{ borderColor: theme.red, width: "fit-content" }}
            >
              {contentDetail?.user_name || contentDetail?.user_account?.user_name}
            </div>
            <div className="font-light w-[80%] text-sm leading-5 text-grey-text">
              {contentDetail?.description}
            </div>
          </Col>
          {contentDetail?.cast_users?.length ? (
            <Col span={6}>
              <CastListing castLists={contentDetail?.cast_users} />
            </Col>
          ) : (
            ""
          )}
        </Row>
        {showVideo && (
          <ModalComponent openModal={showVideo} setOpenModal={handleshowVideoClose}>
            <VideoSection
              url={contentDetail?.trailer ?? null}
              type="video"
              thumbnail={contentDetail?.cover_photo_url ?? ""}
              title={contentDetail?.title}
            />
          </ModalComponent>
        )}

        {contentDetail?.live_type == 1 && contentDetail?.status == "started" && (
          <div className="flex justify-end items-center gap-1.5 text-[rgba(164,22,20,1)] text-base font-semibold px-2.5">
            {isNaN(remaingTime) ? (
              <p>Loading...</p>
            ) : (
              <div>{`${Math.trunc(remaingTime / 60)} Minutes Remaining`}</div>
            )}

            <Popover
              content={
                <div className="bg-[rgba(19,19,19,1)] p-2">
                  <p className="text-white mb-2">Would you like to add more time?</p>
                  {addMoreTime.map((e, i) => (
                    <div
                      key={i}
                      className="text-white py-0.5 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] px-2 rounded"
                      onClick={() => addTimeContent(e.value)}
                    >
                      {e.label}
                    </div>
                  ))}
                </div>
              }
              trigger="click"
            >
              <div className="cursor-pointer">
                <TimeIcon color={theme.white} />
              </div>
            </Popover>
          </div>
        )}

        {showGraph && (
          <div className="w-[calc(100%-35px)] h-[400px] pt-10 mx-5.5 border-t border-[rgba(196,196,196,0.3)]">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[rgba(82,70,196,0.78)] font-medium">
                {graphHead?.[contentType?.name]} Status
              </div>
              <div className="flex gap-1.5">
                {graphTabs.map((list, i) => (
                  <div
                    key={i}
                    className={`min-w-[40px] max-w-fit px-2.5 py-1.25 rounded cursor-pointer ${
                      list.name === contentType?.name
                        ? "bg-white text-grey-text"
                        : "bg-[rgba(196,196,196,0.3)] text-white"
                    }`}
                    onClick={() => handleGraphTab(list.name)}
                  >
                    {list.name}
                  </div>
                ))}
              </div>
            </div>
            <AreaChartComponent data={{ periodData: [] }} />
          </div>
        )}
        {deleteModal && (
          <ModalComponent openModal={deleteModal} setOpenModal={handleDeleteModal}>
            <ConfirmModal
              handleCancel={handleDeleteModal}
              handleConfirm={handleDeleteEvent}
              loading={deleteLoading}
              icon={<DeleteIcon height="40px" width="40px" />}
              iconClass="delete"
              confirmButtonText="Confirm"
              subheading="This action is irreversible and cannot be undone."
            />
          </ModalComponent>
        )}
      </div>
    </>
  );
};

export default RecordContentDetail;

