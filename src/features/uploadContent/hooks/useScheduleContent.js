import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getUserListApi, scheduleEventAPI } from "@services/api/collections";
import { checkAvailabilityApi } from "@services/api/eventContent";
import { errorMessage } from "@utils/commonSection";
import { isInteger } from "@utils/constant";
import { message } from "antd";

const useScheduleContent = (formRef, endDate, clickedDays, frequencyValue, userRegion) => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    const {
      cover_art,
      live_type,
      creator,
      cast,
      scheduled_date,
      upload_trailer,
      start_time,
      upload,
      end_time,
      title,
      genre,
      description,
      content_type
    } = values;

    const timeStamp = (e) => moment(`${scheduled_date} ${e}`, "yyyy/MM/DD hh:mm a").unix();
    const castUser = cast?.map((e) => ({ user_id: e }));
    let payload = {
      type: 2,
      user_id: creator,
      cover_photo_url: cover_art?.url,
      cover_photo: cover_art?.key_name,
      scheduled_date,
      live_type,
      frequency: live_type == 2 ? 1 : frequencyValue,
      start_time: timeStamp(start_time),
      end_time: live_type == 2 ? timeStamp(start_time) + upload?.duration : live_type === 1 ? timeStamp(end_time) : null,
      cast: castUser,
      uploaded_by_admin: true,
      repeat_days: clickedDays,
      end_date: endDate,
      stream_region: userRegion,
      upload,
      title,
      genre,
      description,
      content_type
    };
    if (upload_trailer)
      payload = {
        ...payload,
        trailer: upload_trailer?.url,
        trailer_ratio: isInteger(upload_trailer?.ratio),
        trailer_duration: upload_trailer?.duration
      };
    setLoading(true);

    const params = new URLSearchParams();
    params.append("user_id", creator);
    params.append("scheduled_date", scheduled_date);
    params.append("start_time", timeStamp(start_time));

    const req = await checkAvailabilityApi(params);
    if (req?.status == 200) {
      const res = await scheduleEventAPI(payload);
      if (res?.status === 200) {
        message.success(res?.message || "Content created successfully");
        formRef?.current?.resetFields();
        navigate(-1);
      } else errorMessage(res);
    } else {
      errorMessage(req);
    }

    setLoading(false);
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

  return [userList, loading, handleFinish];
};

export default useScheduleContent;

