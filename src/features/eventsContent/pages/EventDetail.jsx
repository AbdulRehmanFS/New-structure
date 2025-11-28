import { useEffect, useState } from "react";
import { Popover } from "antd";
import moment from "moment";
import Header from "@layouts/Header";
import BackButton from "@features/common/components/BackButton";
import ButtonComponent from "@components/Button";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import TableComponent from "@components/Table";
import { theme } from "@utils/theme";
import { addMoreTime } from "@utils/constant";
import { DeleteIcon, TimeIcon } from "@utils/svgFile";
import LiveEventCard from "../components/LiveEventCard";
import VideoSection from "../components/VideoSection";
import AreaChartComponent from "@features/dashboard/components/AreaChart";
import { ticketHistoryColumns, ticketHistoryRows } from "../utils/data";
import useEventDetails from "../hooks/useEventDetail";
import Loader from "@components/Loader";

const EventDetail = () => {
  const {
    deleteLoading,
    handleDeleteEvent,
    deleteModal,
    eventDetail,
    handleStartEvent,
    loading,
    showExtraInfo,
    handleDeleteModal,
    showVideo,
    onWatchTrailer,
    handleshowVideoClose,
    addTimeContent
  } = useEventDetails();

  const [remaingTime, setRemainingTime] = useState(
    eventDetail?.stream_end_time ? eventDetail?.stream_end_time - moment().unix() : 0
  );

  useEffect(() => {
    if (!eventDetail?.stream_end_time) return;

    const interval = setInterval(() => {
      const currentRemainingTime = eventDetail?.stream_end_time - moment().unix();
      setRemainingTime(currentRemainingTime > 0 ? currentRemainingTime : 0);

      if (currentRemainingTime <= 0) {
        clearInterval(interval);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [eventDetail]);

  if (loading) return <Loader />;

  return (
    <>
      <Header heading="Events and Podcasts" showSearch={false} />
      {Object.values(eventDetail).length ? (
        <div className="scroll-without-header">
          <div className="flex flex-wrap justify-between items-center gap-3 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4 mb-5 mt-5">
            <div className="flex items-center gap-2.5">
              <BackButton />
              <div className="text-2xl font-semibold text-white">Event Details</div>
            </div>
            {(eventDetail?.status == "accepted" || eventDetail?.status == "started") && (
              <div className="flex gap-4">
                <ButtonComponent
                  text={eventDetail?.status == "accepted" ? "Start Event" : "Stop Event"}
                  bg={theme.red}
                  width="90px"
                  size="middle"
                  onClick={handleStartEvent}
                />
                <ButtonComponent
                  text="Cancel Event"
                  bg={theme.red}
                  width="90px"
                  size="middle"
                  onClick={handleDeleteModal}
                />
              </div>
            )}
          </div>
          <LiveEventCard eventDetail={eventDetail} />
          <div className="flex justify-end p-2.5">
            <ButtonComponent
              text="Watch Trailer"
              bg={theme.red}
              onClick={() => onWatchTrailer()}
              width="90px"
            />
          </div>
          {eventDetail?.contentDetail?.length > 0 && (
            <div className="flex justify-center items-center my-4">
              <VideoSection
                url={eventDetail?.contentDetail[0].content_url}
                type="video"
                thumbnail={eventDetail?.pre_recorded?.content_url ?? ""}
                title={eventDetail?.title}
              />
            </div>
          )}

          {showVideo && (
            <ModalComponent openModal={showVideo} setOpenModal={handleshowVideoClose}>
              <VideoSection
                url={eventDetail?.trailer ?? null}
                type="video"
                thumbnail={eventDetail?.cover_photo_url ?? ""}
                title={eventDetail?.title}
              />
            </ModalComponent>
          )}

          {eventDetail?.live_type == 1 && eventDetail?.status == "started" && (
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

          {showExtraInfo && (
            <>
              <div className="text-[rgba(82,70,196,0.78)] font-medium w-[calc(100%-35px)] h-[400px] border-b border-[rgba(255,255,255,0.37)] mx-4 my-10 px-5 py-6">
                <div className="mb-4 text-base">Peak Views</div>
                <AreaChartComponent data={{ periodData: [] }} />
              </div>
              <div className="px-4">
                <div className="text-xl font-semibold text-white mb-4">Event Tickets History</div>
                <TableComponent
                  columns={ticketHistoryColumns}
                  data={ticketHistoryRows}
                  defaultTheme={false}
                  rowKey="key"
                />
              </div>
            </>
          )}
          {deleteModal && (
            <ModalComponent openModal={deleteModal} setOpenModal={handleDeleteModal}>
              <ConfirmModal
                handleCancel={handleDeleteModal}
                handleConfirm={handleDeleteEvent}
                icon={<DeleteIcon height="40px" width="40px" />}
                iconClass="delete"
                confirmButtonText="Confirm"
                loading={deleteLoading}
                subheading="This action is irreversible and cannot be undone."
              />
            </ModalComponent>
          )}
        </div>
      ) : (
        <div className="text-white text-center py-20">No data available</div>
      )}
    </>
  );
};

export default EventDetail;
