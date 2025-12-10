import { useCallback, useEffect, useState } from "react";
import { weeksName, monthsName, dayTimeInterval, graphTabsValue } from "util/constant";
import {
  DayGraphData,
  getDateGraph,
  getHrMinSec,
  weekYearGraphData
} from "util/commonMethods";
import { message } from "antd";
import moment from "moment";
import { getContentGraphDataApi, getContentRequestDetailApi } from "service/api/contentApproval";

const useDetailsView = ({ contentId }) => {
  const [loading, setLoading] = useState(true);
  const [contentDetail, setContentDetail] = useState({});
  const [graphData, setGraphData] = useState([]);
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
    setLoading(true);
    const params = new URLSearchParams();
    params.append("content_id", contentId);
    const res = await getContentRequestDetailApi(params);
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
    setGraphLoader(true);
    const res = await getContentGraphDataApi(contentId, contentType?.value);
    if (res?.status === 200) {
      if (contentType?.value === graphTabsValue.Week) {
        const { output, maxYLimit } = weekYearGraphData(weeksName, currentDay, res?.data);
        setGraphData(output);
        setYAxisMax(maxYLimit);
      } else if (contentType?.value === graphTabsValue.Year) {
        const { output, maxYLimit } = weekYearGraphData(monthsName, currentMonth, res?.data);
        setGraphData(output);
        setYAxisMax(maxYLimit);
      } else if (contentType?.value === graphTabsValue.Month) {
        const { output, maxYLimit } = getDateGraph(todayDate, currentMonth, res?.data);
        setGraphData(output);
        setYAxisMax(maxYLimit);
      } else {
        const { output, maxYLimit } = DayGraphData(dayTimeInterval, currentHr, res?.data);
        setGraphData(output);
        setYAxisMax(maxYLimit);
      }
    }
    setGraphLoader(false);
  }, [contentType?.value,contentId, currentDay, currentHr, currentMonth, todayDate]);

  useEffect(() => {
    getDetailListing();
  }, [getDetailListing]);

  useEffect(() => {
    getViewGraphData();
  }, [getViewGraphData]);

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
