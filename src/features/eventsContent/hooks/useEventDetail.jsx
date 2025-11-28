import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { errorMessage } from "@utils/helpers";
import { getEventDetailApi, eventStartStopApi, updateEventRequestApi, updateStreamTime } from "../services/eventContent.api";

const useEventDetails = () => {
  const [eventDetail, setEventDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const [showVideo, setshowVideo] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { eventId, showExtraInfo = false } = useLocation()?.state || {};

  const getEventDetail = useCallback(async () => {
    setLoading(true);
    const res = await getEventDetailApi(eventId);
    if (res?.status === 200) {
      const data = res?.data[0] || {};
      setEventDetail(data);
    } else {
      errorMessage(res?.message || "Failed to fetch event details");
    }
    setLoading(false);
  }, [eventId]);

  const handleDeleteModal = () => setDeleteModal((pre) => !pre);

  const handleDeleteEvent = async () => {
    setDeleteLoading(true);
    const payload = {
      event_id: eventId,
      user_id: eventDetail?.user_id,
      action: 3 // cancelled
    };
    const res = await updateEventRequestApi(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Event cancelled successfully");
      navigate(-1);
    } else {
      errorMessage(res?.message || "Failed to cancel event");
    }
    setDeleteLoading(false);
    handleDeleteModal();
  };

  useEffect(() => {
    if (eventId) {
      getEventDetail();
    }
  }, [getEventDetail, eventId]);

  const handleStartEvent = async () => {
    const currentTime = moment().unix();
    if (eventDetail.start_time > currentTime) {
      const secs = eventDetail.start_time - currentTime;
      const timeleft = moment.duration({ seconds: secs }).humanize();
      message.info(`Remaining Time ${timeleft}`);
    } else {
      if (eventDetail?.status == "accepted") {
        const payload = {
          content_id: eventDetail?._id,
          type: 1
        };
        const req = await eventStartStopApi(payload);
        if (req?.status == 200) {
          message.success("Event Start Successfully");
          getEventDetail();
        } else {
          errorMessage(req?.message || "Failed to start event");
        }
      } else {
        const payload = {
          content_id: eventDetail?._id,
          type: 2
        };
        const req = await eventStartStopApi(payload);
        if (req?.status == 200) {
          message.success("Event Stop Successfully");
          getEventDetail();
        } else {
          errorMessage(req?.message || "Failed to stop event");
        }
      }
    }
  };

  const handleshowVideoClose = () => setshowVideo(false);
  
  const onWatchTrailer = () => {
    if (eventDetail?.trailer) {
      setshowVideo(true);
    } else {
      errorMessage("Trailer is not available");
    }
  };

  const addTimeContent = async (time) => {
    const miliSecondsTime = time * 60;
    const endStreamTime = eventDetail?.stream_end_time + miliSecondsTime;

    const payload = {
      content_id: eventDetail?._id,
      time: endStreamTime
    };
    const req = await updateStreamTime(payload);
    if (req?.status === 200) {
      message.success("Time has been added successfully.");
      getEventDetail();
    } else {
      errorMessage(req?.message || "Failed to add time");
    }
  };

  return {
    deleteLoading,
    handleDeleteEvent,
    deleteModal,
    eventDetail,
    loading,
    showExtraInfo,
    handleDeleteModal,
    handleStartEvent,
    showVideo,
    onWatchTrailer,
    handleshowVideoClose,
    addTimeContent
  };
};

export default useEventDetails;

