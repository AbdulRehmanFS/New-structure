import { useCallback, useEffect, useState } from "react";
import { weeksName, monthsName, dayTimeInterval, graphTabsValue } from "@utils/constant";
import {
  DayGraphData,
  getDateGraph,
  getHrMinSec,
  weekYearGraphData
} from "@utils/commonMethods";
import { message } from "antd";
import moment from "moment";
import { getContentGraphDataApi, getContentRequestDetailApi } from "@services/api/contentApproval";

const useDetailsView = ({ contentId, showGraph = true }) => {
  const [loading, setLoading] = useState(true);
  const [contentDetail, setContentDetail] = useState({});
  const [graphData, setGraphData] = useState({ periodData: [] });
  const [graphLoader, setGraphLoader] = useState(true);
  const [watchVideoTrailerBtn, setWatchVideoTrailerBtn] = useState(false);
  const [contentType, setContentType] = useState({
    name: "Day",
    value: graphTabsValue.Day
  }); // used to set the graph type value like day/month..so on
  const [yAxisMax, setYAxisMax] = useState(0);

  const [duration, setDuration] = useState("0 min 0 sec");
  const currentDay = moment().day() + 1;
  const currentMonth = moment().month() + 1;
  const currentHr = moment().hour();
  const todayDate = moment().date();

  const getDetailListing = useCallback(async () => {
    if (!contentId) return;
    setLoading(true);
    const params = new URLSearchParams();
    params.append("content_id", contentId);
    const queryString = params.toString();
    const res = await getContentRequestDetailApi(queryString);
    if (res?.status === 200) {
      const detail = res?.data[0] || {};
      const contentDuration = getHrMinSec(detail?.duration);
      setDuration(contentDuration);
      setContentDetail(detail);
    } else message.error(res?.message || "Something went wrong");
    setLoading(false);
  }, [contentId]);

  const videotrailerset = () => setWatchVideoTrailerBtn((prev) => !prev);

  const getViewGraphData = useCallback(async () => {
    if (!showGraph) return;
    setGraphLoader(true);
    const res = await getContentGraphDataApi(contentId, contentType?.value);
    if (res?.status === 200) {
      if (contentType?.value === graphTabsValue.Week) {
        const { output, maxYLimit } = weekYearGraphData(weeksName, currentDay, res?.data);
        const transformedData = output.map((item) => ({ ...item, value: item.view || 0 }));
        setGraphData({ periodData: transformedData });
        setYAxisMax(maxYLimit);
      } else if (contentType?.value === graphTabsValue.Year) {
        const { output, maxYLimit } = weekYearGraphData(monthsName, currentMonth, res?.data);
        const transformedData = output.map((item) => ({ ...item, value: item.view || 0 }));
        setGraphData({ periodData: transformedData });
        setYAxisMax(maxYLimit);
      } else if (contentType?.value === graphTabsValue.Month) {
        const { output, maxYLimit } = getDateGraph(todayDate, currentMonth, res?.data);
        const transformedData = output.map((item) => ({ ...item, value: item.view || 0 }));
        setGraphData({ periodData: transformedData });
        setYAxisMax(maxYLimit);
      } else {
        const { output, maxYLimit } = DayGraphData(dayTimeInterval, currentHr, res?.data);
        const transformedData = output.map((item) => ({ ...item, value: item.view || 0 }));
        setGraphData({ periodData: transformedData });
        setYAxisMax(maxYLimit);
      }
    }
    setGraphLoader(false);
  }, [contentType?.value, contentId, currentDay, currentHr, currentMonth, todayDate, showGraph]);

  useEffect(() => {
    if (contentId) {
      getDetailListing();
    }
  }, [getDetailListing, contentId]);

  useEffect(() => {
    if (contentId && showGraph) {
      getViewGraphData();
    }
  }, [getViewGraphData, contentId, showGraph]);

  const handleGraphTab = (e) => setContentType({ name: e, value: graphTabsValue[e] });

  return {
    contentDetail,
    watchVideoTrailerBtn,
    graphData,
    graphLoader,
    yAxisMax,
    contentType,
    loading,
    duration,
    videotrailerset,
    handleGraphTab
  };
};

export default useDetailsView;

