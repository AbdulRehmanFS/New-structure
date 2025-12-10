import React from "react";
import Message from "component/messages";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { editEventAPI, getCreatorListing, getUserListApi } from "service/api/collections";
import { errorMessage } from "util/commonSection";

const useEditEventForm = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [eventLoader, setEventLoader] = useState(false);
  const [creatorList, setCreatorList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const formRef = React.useRef(null);
  const { init } = useLocation()?.state || {};

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

  const handleGetCreator = async (searchValue = "") => {
    setSearchLoading(true);
    const param = new URLSearchParams();
    param.append("search", searchValue);
    const res = await getCreatorListing(`?${param}`);
    if (res?.status === 200) {
      const output = await res?.data?.map((list) => ({
        label: list?.user_name,
        value: list?._id
      }));
      setCreatorList(output);
    }
    setSearchLoading(false);
  };

  useEffect(() => {
    getViewUserList();
    handleGetCreator();
  }, []);

  const handleFinish = async (payload) => {
   
    const { rss_url: url, stream_id } = payload;
    setEventLoader(true);
    const updatedPayload = {
      stream_id,
      rss_url: url,
      event_id: init?.event_id,
      user_id: init?.user_id // data?._id,
    };
    const res = await editEventAPI(updatedPayload);
    if (res?.status === 200) {
      Message.success(res || "Event edit successfully");
      navigate(-1);
    } else errorMessage(res?.message);
    setEventLoader(false);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const optList = {
    cast: userList,
    creator: creatorList
  };
  return {
    filterOption,
    optList,
    formRef,
    eventLoader,
    handleFinish,
    init,
    searchLoading
  };
};

export default useEditEventForm;
