import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "util/commonSection";
import { message } from "antd";
import { graphTabsValue } from "util/constant";
import {
  deleteScheduleContentAPI,
  eventStartStopApi,
  getContentDetailApi,
  updateStreamTime
} from "service/api/eventContent";

const useContentDetail = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [podcastDetail, setPodcastDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [startStreamLoading,setStartStreamLoading]=useState(false)
  const [showVideo, setshowVideo] = useState(false);
  const [contentType, setContentType] = useState({
    name: "Day",
    value: graphTabsValue.Day
  });
  const navigate = useNavigate();
  const { podcastId, showGraph } = useLocation()?.state || {};

  const getPodcastDetail = useCallback(async () => {
    setLoading(true);

    const res = await getContentDetailApi(podcastId);
    if (res?.status === 200) {
      const data = res?.data[0] || {};
      setPodcastDetail(data);
    } else errorMessage(res?.message);
    setLoading(false);
  }, [podcastId]);

  const handleDeleteModal = () => setDeleteModal((pre) => !pre);

  const handleDeleteEvent = async () => {
    setDeleteLoading(true);
    const params = new URLSearchParams();
    params.append("event_id", podcastDetail?._id);
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
    getPodcastDetail();
  }, [getPodcastDetail]);
  const handleStartEvent = async () => {
    const currentTime = moment().unix();
    if (podcastDetail.start_time > currentTime) {
      
      const secs = podcastDetail.start_time - currentTime;
      const timeleft = moment.duration({ seconds: secs }).humanize();
      message.info(`Remaining Time ${timeleft}`);
    } else {
      setStartStreamLoading(true)

      getPodcastDetail();
      if (podcastDetail?.status == "accepted") {
        const payload = {
          content_id: podcastDetail?._id,
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
          content_id: podcastDetail?._id,
          type: 2
        };
        const req = await eventStartStopApi(payload);
        if (req?.status == 200) {
          message.success("Event Stop Successfully");
          getPodcastDetail();
        } else {
          errorMessage(req);
        }
      }
      setStartStreamLoading(false)
    }
  };
  const addTimeContent = async (time) => {
    const miliSecondsTime = time * 60 ;
    const endStreamTime = podcastDetail?.stream_end_time + miliSecondsTime;
  
   
    const payload = {
      content_id: podcastDetail?._id,
      time: endStreamTime
    };
    const req = await updateStreamTime(payload);
    if (req?.status === 200) {
      message.success("Time has been added successfully.")
      getPodcastDetail()
    } else {
      errorMessage(req);
    }
  };
  const onWatchTrailer = () => {
    if (podcastDetail?.trailer) {
      setshowVideo(true);
    } else {
      errorMessage("Trailer is not available");
    }
  };
  const handleshowVideoClose=()=>setshowVideo(false)
  const releaseDate = moment(podcastDetail?.scheduled_date).format("DD-MMM-YYYY");

  const handleGraphTab = (e) => setContentType({ name: e, value: graphTabsValue[e] });

  return {
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
  };
};

export default useContentDetail;
