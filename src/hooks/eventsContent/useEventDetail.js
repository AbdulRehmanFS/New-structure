import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import {
  eventStartStopApi,
  getEventDetailApi,
  updateEventRequestApi,
  updateStreamTime
} from "service/api/eventContent";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { errorMessage } from "util/commonSection";

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
    } else errorMessage(res?.message);
    setLoading(false);
  }, [eventId]);

  const handleDeleteModal = () => setDeleteModal((pre) => !pre);

  const handleDeleteEvent = async () => {
    setDeleteLoading(true);
    const event_id = eventId;
    const payload = {
      event_id,
      user_id: eventDetail?.user_id,
      action: 3 //cancelled
    };
    const res = await updateEventRequestApi(payload);
    if (res?.status === 200) {
      message.success(res?.message);
      navigate(-1);
    } else errorMessage(res?.message);
    setDeleteLoading(false);
    handleDeleteModal();
  };

  useEffect(() => {
    getEventDetail();
  }, [getEventDetail]);

  const navigateToEditEvent = () => {
    const {
      title,
      description,
      ticket_amount,
      venue,
      event_time,
      event_date,
      cast_users,
      cover_photo_url,
      icon,
      trailer,
      genre,
      content_type,
      _id,
      for_kids,
      rss_url,
      user_account,
      stream_id
    } = eventDetail;
    const cast = cast_users?.map((list) => ({
      value: list?._id,
      label: list?.user_name
    }));
    const initData = {
      banner_image: cover_photo_url,
      event_icon: icon,
      title,
      description,
      audience: for_kids,
      ticket_amount,
      venue,
      rss_url,
      event_date,
      event_time: moment.unix(event_time).format("HH:mm"),
      cast,
      stream_id,
      upload_trailer: trailer,
      genre,
      live: content_type ? { label: content_type, value: content_type } : null,
      event_id: _id,
      creator: { label: user_account?.user_name, value: user_account?._id },
      user_id: user_account?._id
    };
    navigate("/edit-event", { state: { init: initData } });
  };
  const handleStartEvent = async () => {
    const currentTime = moment().unix();
    if (eventDetail.start_time > currentTime) {
      const secs = eventDetail.start_time - currentTime;
      const timeleft = moment.duration({ seconds: secs }).humanize();
      message.info(`Remaining Time ${timeleft}`);
    } else {
      getEventDetail();

      if (eventDetail?.status == "accepted") {
        const payload = {
          content_id: eventDetail?._id,
          type: 1
        };
        const req = await eventStartStopApi(payload);
        if (req?.status == 200) {
          message.success("Event Start Successfully");
        } else {
          errorMessage(req);
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
          errorMessage(req);
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
    const miliSecondsTime = time * 60 ;
    const endStreamTime = eventDetail?.stream_end_time + miliSecondsTime;
  
   
    const payload = {
      content_id: eventDetail?._id,
      time: endStreamTime
    };
    const req = await updateStreamTime(payload);
    if (req?.status === 200) {
      message.success("Time has been added successfully.")
      getEventDetail()
    } else {
      errorMessage(req);
    }
  };

  return {
    deleteLoading,
    handleDeleteEvent,
    deleteModal,
    eventDetail,
    navigateToEditEvent,
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
