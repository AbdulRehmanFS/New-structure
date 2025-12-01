/* eslint-disable no-nested-ternary */
import { Col, Row } from "antd";
import { memo } from "react";
import { useLocation } from "react-router-dom";
import { theme } from "@utils/theme";
import BackButton from "@utils/commonSection";
import { NoData } from "@utils/commonSection";
import Loader from "@components/Loader";
import Header from "@layouts/Header";
import { graphHead, graphTabs, graphTabsValue, xAxisLabel } from "@utils/constant";
import AreaChartComponent from "@features/dashboard/components/AreaChart";
import useDetailsView from "../hooks/useDetailsView";
import { CastListing } from "@features/eventsContent/components/CastListing";

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
  } = useDetailsView({ contentId, showGraph });

  return (
    <>
      {loading ? (
        <Loader loading={true} fullscreen={true} />
      ) : (
        <>
          <Header heading="Content Approval" showSearch={false} />
          {Object.values(contentDetail).length > 0 ? (
            <div className="scroll-without-header">
              <div className="flex text-lg justify-between items-center mt-5">
                <div className="flex gap-[5px]">
                  <BackButton />
                  Content Details
                </div>
              </div>
              {watchVideoTrailerBtn && (
                <div className="my-5">
                  {contentDetail?.type === "video" ? (
                    <div className="w-[90%] h-[380px] flex items-center justify-center">
                      <video
                        width="100%"
                        height="100%"
                        className="bg-black"
                        style={{ border: `1px solid ${theme.midGrey}`, objectFit: "contain" }}
                        controls>
                        <source src={contentDetail?.trailer} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div className="flex p-[10px] rounded-[4px] bg-[#f1f1f1] gap-[10px] w-[90%]">
                      <div className="w-[20%] flex justify-center items-center bg-[#c6c3c3]">
                        <img
                          src={contentDetail?.thumbnail || "/audioImage.jpeg"}
                          alt=""
                          height="90px"
                          width="100%"
                          className="object-contain"
                        />
                      </div>
                      <div className="w-[80%] flex flex-col justify-between">
                        <div className="pt-[10px] pl-5 text-xl capitalize font-medium" style={{ color: theme.greyText }}>
                          {contentDetail?.title}
                        </div>
                        <audio controls className="w-full">
                          <source src={contentDetail?.trailer} />
                        </audio>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!watchVideoTrailerBtn && (
                <div className="my-5">
                  {contentDetail?.type === "video" ? (
                    <div className="w-[90%] h-[380px] flex items-center justify-center">
                      <video
                        width="100%"
                        height="100%"
                        className="bg-black"
                        style={{ border: `1px solid ${theme.midGrey}`, objectFit: "contain" }}
                        controls>
                        <source src={contentDetail?.content_url} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div className="flex p-[10px] rounded-[4px] bg-[#f1f1f1] gap-[10px] w-[90%]">
                      <div className="w-[20%] flex justify-center items-center bg-[#c6c3c3]">
                        <img
                          src={contentDetail?.thumbnail || "/audioImage.jpeg"}
                          alt=""
                          height="70px"
                          width="100%"
                          className="object-contain h-full"
                        />
                      </div>
                      <div className="w-[80%] flex flex-col justify-between">
                        <div className="pt-[10px] pl-5 text-xl capitalize font-medium" style={{ color: theme.greyText }}>
                          {contentDetail?.title}
                        </div>
                        <audio controls className="w-full">
                          <source src={contentDetail?.content_url} />
                        </audio>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Row className="mb-[30px]">
                <Col span={contentDetail?.cast_users?.length > 0 ? 18 : 18}>
                  <div className="text-xl font-medium">{contentDetail?.title}</div>
                  <div className="flex mt-[22px] mr-[25px] flex-wrap">
                    <div style={{ color: theme.lightWhite }}>{duration}</div>
                    <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
                    <div style={{ color: theme.lightWhite }}>
                      {contentDetail?.viewCount ?? 0} views
                    </div>
                    <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
                    <div style={{ color: theme.lightWhite }}>{contentDetail?.genre}</div>
                  </div>
                  <div
                    className="mt-[18px] mb-2 capitalize underline underline-offset-[4px]"
                    style={{ color: theme.red }}>
                    {contentDetail?.user_account?.user_name}
                  </div>
                  <div
                    className="font-light w-[80%] text-[15px] leading-5"
                    style={{ color: theme.lightWhite }}>
                    {contentDetail?.description}
                  </div>
                </Col>

                <Col span={6}>
                  {contentDetail?.trailer && (
                    <button
                      className="bg-[rgba(164,22,20,1)] text-white border-none py-[10px] px-5 rounded-lg text-sm font-semibold cursor-pointer"
                      type="button"
                      onClick={() => videotrailerset()}>
                      {watchVideoTrailerBtn ? " Watch Video" : "Watch Trailer"}
                    </button>
                  )}
                  {contentDetail?.cast_users?.length > 0 && (
                    <CastListing castLists={contentDetail?.cast_users} />
                  )}
                </Col>
              </Row>
              {showGraph && (
                <div
                  className="pt-10 mx-[22px] border-t border-[rgba(196,196,196,0.45)]"
                  style={{
                    width: "calc(100% - 35px)",
                    height: graphData?.periodData?.length ? "400px" : "200px"
                  }}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-[rgba(82,70,196,0.78)] font-medium">
                      {graphHead?.[contentType?.name]} Stats
                    </div>
                    <div className="flex gap-[5px]">
                      {graphTabs.map((list) => (
                        <div
                          key={list?.name}
                          className="min-w-[40px] max-w-fit px-2.5 py-[5px] rounded cursor-pointer"
                          style={{
                            background: list.name === contentType?.name ? theme.white : theme.grey2,
                            color: list.name === contentType?.name ? theme.greyText : theme.white
                          }}
                          onClick={() => handleGraphTab(list.name)}>
                          {list.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  {graphLoader ? (
                    <div className="flex-wrap h-full">
                      <Loader loading={true} fullscreen={false} />
                    </div>
                  ) : graphData?.periodData?.length ? (
                    <AreaChartComponent
                      data={graphData}
                      yLabel="Number of Views"
                      showXAxisLable={
                        contentType.value === graphTabsValue.Day ||
                        contentType.value === graphTabsValue.Month
                      }
                      xAxisLabel={xAxisLabel[contentType.name]}
                      loading={graphLoader}
                    />
                  ) : (
                    <NoData />
                  )}
                </div>
              )}
            </div>
          ) : (
            <NoData />
          )}
        </>
      )}
    </>
  );
}
export default memo(DetailView);
