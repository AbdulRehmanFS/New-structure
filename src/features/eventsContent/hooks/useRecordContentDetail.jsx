import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "@utils/commonSection";
import { message } from "antd";
import { graphTabsValue } from "@utils/constant";
import {
  deleteScheduleContentAPI,
  eventStartStopApi,
  getContentDetailApi,
  updateStreamTime
} from "../services/eventContent.api";

const useRecordContentDetail = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [contentDetail, setContentDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [startStreamLoading, setStartStreamLoading] = useState(false);
  const [showVideo, setshowVideo] = useState(false);
  const [contentType, setContentType] = useState({
    name: "Day",
    value: graphTabsValue.Day
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { contentId, showGraph = false } = location?.state || {};

  const getContentDetail = useCallback(async () => {
    if (!contentId) {
      setLoading(false);
      setContentDetail({});
      return;
    }
    setLoading(true);

    try {
      const res = await getContentDetailApi(contentId);
      if (res?.status === 200) {
        // API might return data as array or object
        const data = Array.isArray(res?.data) 
          ? (res?.data[0] || {}) 
          : (res?.data || {});
        setContentDetail(data);
      } else {
        errorMessage(res?.message || "Failed to load content details");
        setContentDetail({});
      }
    } catch (error) {
      errorMessage("Failed to load content details");
      setContentDetail({});
    }
    setLoading(false);
  }, [contentId]);

  const handleDeleteModal = () => setDeleteModal((pre) => !pre);

  const handleDeleteEvent = async () => {
    setDeleteLoading(true);
    const params = new URLSearchParams();
    params.append("content_id", contentDetail?._id);
    params.append("type", 2); // type 1 => event, type 2 => scheduled content
    const res = await deleteScheduleContentAPI(params);
    if (res?.status === 200) {
      message.success(res?.message);
      navigate(-1);
    } else errorMessage(res?.message);
    setDeleteLoading(false);
    handleDeleteModal();
  };

  useEffect(() => {
    getContentDetail();
  }, [getContentDetail]);

  const handleStartEvent = async () => {
    const currentTime = moment().unix();
    if (contentDetail.start_time > currentTime) {
      const secs = contentDetail.start_time - currentTime;
      const timeleft = moment.duration({ seconds: secs }).humanize();
      message.info(`Remaining Time ${timeleft}`);
    } else {
      setStartStreamLoading(true);

      if (contentDetail?.status == "accepted") {
        const payload = {
          content_id: contentDetail?._id,
          type: 1
        };
        const req = await eventStartStopApi(payload);
        if (req?.status == 200) {
          message.success("Event Start Successfully");
          getContentDetail();
        } else {
          errorMessage(req);
        }
      } else {
        const payload = {
          content_id: contentDetail?._id,
          type: 2
        };
        const req = await eventStartStopApi(payload);
        if (req?.status == 200) {
          message.success("Event Stop Successfully");
          getContentDetail();
        } else {
          errorMessage(req);
        }
      }
      setStartStreamLoading(false);
    }
  };

  const addTimeContent = async (time) => {
    const miliSecondsTime = time * 60;
    const endStreamTime = contentDetail?.stream_end_time + miliSecondsTime;

    const payload = {
      content_id: contentDetail?._id,
      time: endStreamTime
    };
    const req = await updateStreamTime(payload);
    if (req?.status === 200) {
      message.success("Time has been added successfully.");
      getContentDetail();
    } else {
      errorMessage(req);
    }
  };

  const onWatchTrailer = () => {
    if (contentDetail?.trailer) {
      setshowVideo(true);
    } else {
      errorMessage("Trailer is not available");
    }
  };

  const handleshowVideoClose = () => setshowVideo(false);
  const releaseDate = moment(contentDetail?.scheduled_date).format("DD-MMM-YYYY");

  const handleGraphTab = (e) => setContentType({ name: e, value: graphTabsValue[e] });

  return {
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
  };
};

export default useRecordContentDetail;

