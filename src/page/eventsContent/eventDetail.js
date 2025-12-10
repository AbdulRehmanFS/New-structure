/* eslint-disable camelcase */

import styled from "styled-components";
import { HeaderSection } from "../style";
import ButtonComponent from "component/fields/button";
import { theme } from "util/theme";
import BackButton, { NoData } from "util/commonSection";
import LiveEventCard from "./liveEventCard";
import TableHeaderWrapper from "component/tableHeaderWrapper";
import TableComponent from "component/table";
import { ticketHistoryColumns, ticketHistoryRows } from "./data";
import AreaChartComponent from "component/graph";
import ModalComponent from "component/modal";
import ConfirmModal from "component/modal/confirmModal";
import { addMoreTime, modalicon } from "util/constant";
import { DeleteIcon, TimeIcon } from "util/svgFile";
import Header from "component/header";
import Loader from "component/loader";
import useEventDetails from "hooks/eventsContent/useEventDetail";
import VideoSection from "component/videoSection";
import { useEffect, useState } from "react";
import moment from "moment";
import { Popover } from "antd";

export default function EventDetail() {
  // const [timeLeft, settimeLeft] = useState();
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
  const [remaingTime, setRemainingTime] = useState(eventDetail?.stream_end_time - moment().unix());

  useEffect(() => {
    if (!eventDetail?.stream_end_time) return;

    const interval = setInterval(() => {
      const currentRemainingTime = eventDetail?.stream_end_time - moment().unix();

      setRemainingTime(currentRemainingTime > 0 ? currentRemainingTime : 0);

      if (currentRemainingTime <= 0) {
        clearInterval(interval); // Stop the interval when time runs out
      }
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount or dependency change
  }, [eventDetail]);
  

  if (loading) return <Loader />;
  return (
    <>
      <Header heading="Events and Podcasts" showSearch={false} />
      {Object.values(eventDetail).length ? (
        <EventDetailWrapper className="scroll-without-header">
          <HeaderSection className="header-section">
            <div className="back">
              <BackButton />
              Event Details
            </div>
            {(eventDetail?.status == "accepted" || eventDetail?.status == "started") && (
              <div className="btn-section">
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
          </HeaderSection>
          <LiveEventCard eventDetail={eventDetail} />
          <div className="watch-trailer">
            <ButtonComponent
              text="Watch Trailer"
              bg={theme.red}
              onClick={() => onWatchTrailer()}
              width="90px"
            />
          </div>
          {eventDetail?.contentDetail?.length > 0 && (
            <div className="recorded-content">
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

         {(eventDetail?.live_type==1 && eventDetail?.status=="started")&& <div className="add-moreitime">
          {
            isNaN(remaingTime)?<p>Loading...</p>:
            <div>{` ${Math.trunc(remaingTime / 60)} Mintues Remaining `}</div>
          }
            
            <Popover
              prefixCls="addtime"
              content={
                <AddTime>
                  <p>Would you like to add more time?</p>
                  {addMoreTime.map((e, i) => (
                    <div className="time" key={i} onClick={()=>addTimeContent(e.value)}>{e.label}</div>
                  ))}
                </AddTime>
              }
              trigger="click">
              <div>
                <TimeIcon color={theme.white} />
              </div>
            </Popover>
          </div>}

          {showExtraInfo && (
            <>
              <div className="graph-container">
                <div className="chart-heading">Peak Views</div>
                <AreaChartComponent />
              </div>
              <TableHeaderWrapper
                heading="Event Tickets History"
                link=""
                dataLength={ticketHistoryRows?.length}>
                <TableComponent
                  columns={ticketHistoryColumns}
                  data={ticketHistoryRows}
                  defaultTheme={false}
                />
              </TableHeaderWrapper>
            </>
          )}
          {deleteModal && (
            <ModalComponent openModal={deleteModal} setOpenModal={handleDeleteModal}>
              <ConfirmModal
                handleCancel={handleDeleteModal}
                handleConfirm={handleDeleteEvent}
                icon={<DeleteIcon height="40px" width="40px" />}
                iconClass={modalicon.delete}
                confirmButtonText="Confirm"
                loading={deleteLoading}
                subheading="This action is irreversible and cannot be undone."
              />
            </ModalComponent>
          )}
        </EventDetailWrapper>
      ) : (
        <NoData />
      )}
    </>
  );
}

const EventDetailWrapper = styled.div`
  .btn-section {
    display: flex;
    gap: 15px;
  }
  .back {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .header-section {
    margin-top: 20px;
  }
  .graph-container {
    color: ${theme.purple};
    font-weight: 500;
    width: calc(100% - 35px);
    height: 400px;
    border-bottom: 1px solid ${theme.greyBorder};
    margin: 10px 15px 40px 15px;
    padding: 25px 20px;
    .chart-heading {
      margin-bottom: 16px;
      font-size: 16px;
    }
  }
  .watch-trailer {
    padding: 10px;
    display: flex;
    justify-content: end;
  }
  .recorded-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-moreitime {
    display: flex;
    justify-content: end;
    color: ${theme.primaryColor};
    font-size: 16px;
    font-weight: 600;
    padding: 0px 10px;
    gap: 5px;
  }
`;

const AddTime = styled.div`
  background: ${theme.screenBackground};
  .time{
  padding:2px 0px;
  cursor:pointer;
  }
`;
