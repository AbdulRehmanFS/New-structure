import styled from "styled-components";
import { Col, Popover, Row } from "antd";
import { HeaderSection, Line, UnderLine } from "../style";
import ButtonComponent from "component/fields/button";
import { theme } from "util/theme";
import AreaChartComponent from "component/graph";
import VideoSection from "component/videoSection";
import BackButton, { NoData } from "util/commonSection";
import ModalComponent from "component/modal";
import ConfirmModal from "component/modal/confirmModal";
import { addMoreTime, graphHead, graphTabs, modalicon } from "util/constant";
import { DeleteIcon, TimeIcon } from "util/svgFile";
import Header from "component/header";
import Loader from "component/loader";
import { CastListing } from "component/castListing/CastListing";
import useContentDetail from "hooks/eventsContent/useContentDetail";
import { useEffect, useState } from "react";
import moment from "moment";

export default function PodcastDetail() {
  const {
    handleDeleteEvent,
    deleteLoading,
    handleDeleteModal,
    contentType,
    handleGraphTab,
    showGraph,
    podcastDetail,
    releaseDate,
    loading,
    deleteModal,
    handleStartEvent,
    onWatchTrailer,
    showVideo,
    handleshowVideoClose,
    startStreamLoading,
    addTimeContent
  } = useContentDetail();
  const [remaingTime, setRemainingTime] = useState(podcastDetail?.stream_end_time - moment().unix());
  useEffect(() => {
    if (!podcastDetail?.stream_end_time) return;

    const interval = setInterval(() => {
      const currentRemainingTime = podcastDetail?.stream_end_time - moment().unix();

      setRemainingTime(currentRemainingTime > 0 ? currentRemainingTime : 0);

      if (currentRemainingTime <= 0) {
        clearInterval(interval); // Stop the interval when time runs out
      }
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount or dependency change
  }, [podcastDetail]);

  if (loading) return <Loader />;
  return Object.values(podcastDetail).length ? (
    <>
      <Header heading="Events and Contents" showSearch={false} />
      <PodcastDetailWrapper className="scroll-without-header">
        <HeaderSection className="heading-section">
          <div className="top-heading">
            <BackButton />
            Content Details
          </div>
          <div className="stant-delete-btn">
            {(podcastDetail?.live_type == 1 || podcastDetail?.live_type == 2)   &&
              (podcastDetail?.status == "accepted" || podcastDetail?.status == "started"  ) && (
                <ButtonComponent
                loading={startStreamLoading}
                  text={podcastDetail?.status == "started" ? "Stop Stream" : "Start Stream"}
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
        </HeaderSection>
        {podcastDetail?.content_url ? (
          <div className="video-section">
            <VideoSection url={podcastDetail?.content_url} type={podcastDetail?.type} />
          </div>
        ) : (
          <div className="cover-section">
            <img src={podcastDetail?.cover_photo_url} alt="" width="100%" height="300px" />
          </div>
        )}
           <div className="trailer">
                <ButtonComponent
                  text="Watch Trailer"
                  size="middle"
                  width="100px"
                  bg={theme.red}
                  onClick={() => onWatchTrailer()}
                />
              </div>
        <InfoSection>
          <Col span={podcastDetail?.cast_users?.length ? 18 : 24}>
            <div className="title">{podcastDetail?.title}</div>
            <div className="podcast-date-time">
              <div style={{ display: "flex" }}>
                {podcastDetail?.scheduled_date && (
                  <>
                    <div>Scheduled for {releaseDate}</div>
                    <Line height="16px" borderColor={theme.grey2} />
                  </>
                )}
                <div>{podcastDetail?.viewCount} views</div>
                <Line height="16px" borderColor={theme.grey2} />
                <div>{podcastDetail?.genre}</div>
              </div>
           
            </div>
            <UnderLine className="name" color={theme.red}>
              {podcastDetail?.user_name}
            </UnderLine>
            <div className="description">{podcastDetail?.description}</div>
          </Col>
          {podcastDetail?.cast_users?.length ? (
            <Col span={6}>
              <CastListing castLists={podcastDetail?.cast_users} />
            </Col>
          ) : (
            ""
          )}
        </InfoSection>
        {showVideo && (
          <ModalComponent openModal={showVideo} setOpenModal={handleshowVideoClose}>
            <VideoSection
              url={podcastDetail?.trailer ?? null}
              type="video"
              thumbnail={podcastDetail?.cover_photo_url ?? ""}
              title={podcastDetail?.title}
            />
          </ModalComponent>
        )}
        
        {(podcastDetail?.live_type==1 && podcastDetail?.status=="started")&& <div className="add-moreitime">
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

        {showGraph && (
          <GraphContainer
            className="graph-container"
            isData={1} // graphData.length
          >
            <div className="graph-header">
              <div className="heading">{graphHead?.[contentType?.name]} Status</div>
              <div className="tab-group">
                {graphTabs.map((list, i) => (
                  <TabButton
                    key={i}
                    className="tab-button"
                    onClick={() => handleGraphTab(list.name)}
                    selected={list.name === contentType?.name}>
                    {list.name}
                  </TabButton>
                ))}
              </div>
            </div>
            <AreaChartComponent />
          </GraphContainer>
        )}
        {deleteModal && (
          <ModalComponent openModal={deleteModal} setOpenModal={handleDeleteModal}>
            <ConfirmModal
              handleCancel={handleDeleteModal}
              handleConfirm={handleDeleteEvent}
              loading={deleteLoading}
              icon={<DeleteIcon height="40px" width="40px" />}
              iconClass={modalicon.delete}
              confirmButtonText="Confirm"
              subheading="This action is irreversible and cannot be undone."
            />
          </ModalComponent>
        )}
      </PodcastDetailWrapper>
    </>
  ) : (
    <NoData />
  );
}

const PodcastDetailWrapper = styled.div`
  .top-heading {
    display: flex;
    gap: 5px;
  }
  .heading-section {
    margin-top: 20px;
  }
  .video-section {
    margin: 20px 0;
    video {
      max-width: 100%;
    }
    .video-container {
      border: 1px solid ${theme.midGrey};
    }
  }
    .trailer{
    display:flex;
    justify-content:end;
    }
  .cover-section {
    width: 100%;
    height: 300px;
    margin: 20px 0;
    background: ${theme.sidebar};
    img {
      object-fit: contain;
    }
  }
    .add-moreitime{
    display:flex;
    justify-content:end;
    color:${theme.primaryColor};
    padding:10px;
    gap:5px;
    font-size:16px;
    }

  .stant-delete-btn {
    display: flex;
    gap: 10px;
  }
`;

const InfoSection = styled(Row)`
  margin-bottom: 30px;
  .title {
    font-size: 20px;
    font-weight: 500;
  }
  .name {
    margin: 18px 0 8px 0;
  }
  .description {
    font-weight: 300;
    width: 80%;
    font-size: 15px;
    line-height: 20px;
    color: ${theme.greyText};
  }
  .podcast-date-time {
    display: flex;
    margin: 22px 25px 0 0;
    justify-content: space-between;
    flex-wrap: wrap;
    color: ${theme.lightWhite};
  }
`;

const TabButton = styled.div`
  min-width: 40px;
  max-width: fit-content;
  background: ${(props) => (props.selected ? theme.white : theme.grey2)};
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => (props.selected ? theme.greyText : theme.white)};
`;

const GraphContainer = styled.div`
  width: calc(100% - 35px);
  height: ${(props) => (props.isData ? "400px" : "200px")};
  padding-top: 40px;
  margin: 0 22px;
  border-top: 1px solid ${theme.midGrey};
  .graph-loader {
    height: 100%;
  }
  .graph-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .heading {
      color: ${theme.purple};
      font-weight: 500;
    }
    .tab-group {
      display: flex;
      gap: 5px;
    }
  }
`;

const AddTime = styled.div`
  background: ${theme.screenBackground};
  .time{
  padding:2px 0px;
  cursor:pointer;
  }
`;
