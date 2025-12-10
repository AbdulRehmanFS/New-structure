/* eslint-disable no-nested-ternary */
import { Col, Row } from "antd";
import { memo } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { theme } from "util/theme";
import { HeaderSection, Line, UnderLine } from "../style";
import VideoSection from "component/videoSection";
import BackButton, { NoData } from "util/commonSection";
import Loader from "component/loader";
import Header from "component/header";
import { graphHead, graphTabs, graphTabsValue, xAxisLabel } from "util/constant";
import AreaChartComponent from "component/graph";
import useDetailsView from "hooks/contentApprovel/useDetailsView";
import { CastListing } from "component/castListing/CastListing";

function DetailView() {
  const { contentId, showGraph = true } = useLocation()?.state || {};
 
  const {
    contentDetail,
    watchVideoTrailerBtn,
    graphData,
    graphLoader,
    yAxisMax,
    contentType,
    duration,
    videotrailerset,
    handleGraphTab,
    loading
  } = useDetailsView({contentId , showGraph });
  

  return (
    <>
      {loading?<Loader/>:<>  <Header heading="Content Approval" showSearch={false} />
      {Object.values(contentDetail).length > 0 ? (
        <DetailViewWrapper className="scroll-without-header">
          <HeaderSection className="heading-section">
            <div className="top-heading">
              <BackButton />
              Content Details
            </div>
          </HeaderSection>
          {watchVideoTrailerBtn && (
            <div className="video-audio-section">
              <VideoSection
                url={contentDetail?.trailer}
                type={contentDetail?.type}
                thumbnail={contentDetail?.thumbnail}
                title={contentDetail?.title}
              />
            </div>
          )}
          {!watchVideoTrailerBtn && (
            <div className="video-audio-section">
              <VideoSection
                url={contentDetail?.content_url}
                type={contentDetail?.type}
                thumbnail={contentDetail?.thumbnail}
                title={contentDetail?.title}
              />
            </div>
          )}

          <InfoSection>
            <Col span={contentDetail?.cast_users?.length > 0 ? 18 : 18}>
              <div className="title">{contentDetail?.title}</div>
              <div className="podcast-date-time">
                <div className="info-value">{duration}</div>
                <Line height="16px" borderColor={theme.grey2} />
                <div className="info-value">{contentDetail?.viewCount ?? 0} views</div>
                <Line height="16px" borderColor={theme.grey2} />
                <div className="info-value">{contentDetail?.genre}</div>
              </div>
              <UnderLine className="name" color={theme.red}>
                {contentDetail?.user_account?.user_name}
              </UnderLine>
              <div className="description">{contentDetail?.description}</div>
            </Col>

            <Col span={6}>
              {contentDetail?.trailer && (
                <button className="watch-trailer" type="button" onClick={() => videotrailerset()}>
                  {watchVideoTrailerBtn ? " Watch Video" : "Watch Trailer"}
                </button>
              )}
              {contentDetail?.cast_users?.length>0 && (
                <CastListing castLists={contentDetail?.cast_users} />
              )}
            </Col>
          </InfoSection>
          {showGraph && (
            <GraphContainer className="graph-container" isData={graphData.length}>
              <div className="graph-header">
                <div className="heading">{graphHead?.[contentType?.name]} Stats</div>
                <div className="tab-group">
                  {graphTabs.map((list) => (
                    <TabButton
                      className="tab-button"
                      key={list?.name}
                      onClick={() => handleGraphTab(list.name)}
                      selected={list.name === contentType?.name}>
                      {list.name}
                    </TabButton>
                  ))}
                </div>
              </div>
              {graphLoader ? (
                <div className="flex-wrap graph-loader">
                  <Loader fullscreen={false} />
                </div>
              ) : graphData?.length ? (
                <AreaChartComponent
                  dataKey="view"
                  data={graphData}
                  showXAxisLable={
                    contentType.value === graphTabsValue.Day ||
                    contentType.value === graphTabsValue.Month
                  }
                  xAxisLabel={xAxisLabel[contentType.name]}
                  maxCount={yAxisMax}
                />
              ) : (
                <NoData />
              )}
            </GraphContainer>
          )}
        </DetailViewWrapper>
      ) : (
        <NoData />
      )}</>}
     
    </>
  );
}
export default memo(DetailView);

const DetailViewWrapper = styled.div`
  .top-heading {
    display: flex;
    gap: 5px;
  }
  .heading-section {
    margin-top: 20px;
  }
  .video-audio-section {
    margin: 20px 0;
    .video-container {
      border: 1px solid ${theme.midGrey};
    }
  }
  .watch-trailer {
    background: ${theme.primaryColor};
    color: ${theme.white};
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
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

const TabButton = styled.div`
  min-width: 40px;
  max-width: fit-content;
  background: ${(props) => (props.selected ? theme.white : theme.grey2)};
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => (props.selected ? theme.greyText : theme.white)};
`;

const InfoSection = styled(Row)`
  margin-bottom: 30px;
  .title {
    font-size: 20px;
    font-weight: 500;
  }
  .name {
    margin: 18px 0 8px 0;
    text-transform: capitalize;
  }
  .description {
    font-weight: 300;
    width: 80%;
    font-size: 15px;
    line-height: 20px;
    color: ${theme.lightWhite};
  }
  .podcast-date-time {
    display: flex;
    margin: 22px 25px 0 0;
    flex-wrap: wrap;
  }
  .info-value {
    color: ${theme.lightWhite};
  }
`;
