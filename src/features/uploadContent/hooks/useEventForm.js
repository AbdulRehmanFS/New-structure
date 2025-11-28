import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import moment from "moment";
import { errorMessage } from "@utils/commonSection";
import { getUserListApi, scheduleEventAPI } from "@services/api/collections";
import { isInteger } from "@utils/constant";
import { checkAvailabilityApi } from "@services/api/eventContent";

const useEventForm = (formRef, userRegion) => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [eventLoader, setEventLoader] = useState(false);

  const handleFinish = async (payload) => {
    setEventLoader(true);
    const {
      cast,
      banner_image,
      scheduled_date,
      event_icon,
      upload_trailer,
      creator,
      live_type,
      start_time,
      end_time,
      upload,
      ...rest
    } = payload;

    const updateCast = cast?.map((list) => ({ user_id: list }));
    const timeStamp = (event_time) =>
      moment(`${scheduled_date} ${event_time}`, "yyyy/MM/DD hh:mm a").unix();

    let updatePayload = {
      type: 1,
      live_type: live_type,
      user_id: creator,
      cast: updateCast,
      icon: event_icon?.url,
      cover_photo: banner_image?.key_name,
      cover_photo_url: banner_image?.url,
      scheduled_date,
      start_time: timeStamp(start_time),
      upload: upload,
      stream_region: userRegion,
      uploaded_by_admin: true,
      end_time: live_type == 2 ? timeStamp(start_time) + upload?.duration : timeStamp(end_time),
      ...rest
    };
    if (upload_trailer)
      updatePayload = {
        ...updatePayload,
        trailer: upload_trailer?.url,
        trailer_ratio: isInteger(upload_trailer?.ratio),
        trailer_duration: upload_trailer?.duration
      };
    const params = new URLSearchParams();
    params.append("user_id", creator);
    params.append("scheduled_date", scheduled_date);
    params.append("start_time", timeStamp(start_time));

    const req = await checkAvailabilityApi(params);
    if (req?.status === 200) {
      const res = await scheduleEventAPI(updatePayload);
      if (res?.status === 200) {
        message.success(res?.message || "Event create successfully");
        navigate(-1);
        formRef?.current?.resetFields();
      } else errorMessage(res);
    } else {
      errorMessage(req);
    }

    setEventLoader(false);
  };

  const getViewUserList = async () => {
    const result = await getUserListApi();
    const { data: listing = [] } = result || {};
    const update = listing?.map((list) => ({
      value: list?._id,
      label: list?.check_user_name,
      ...list
    }));
    setUserList(update);
  };

  useEffect(() => {
    getViewUserList();
  }, []);
  return [userList, handleFinish, eventLoader];
};

export default useEventForm;

