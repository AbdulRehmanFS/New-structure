import { Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSeriesContentAPI, getUserListApi } from "service/api/collections";
import { errorMessage } from "util/commonSection";

const useManageSeries = (formRef, idData,fields) => {
  const [seriesLoading, setseriesLoading] = useState(false);
  const [episodeData, setepisodeData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [post, setPost] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const getSubmit = async (newValues) => {
    setseriesLoading(true);
    const arrayOne = episodeData;
    const arraytwo = [newValues];
    const episodes = arrayOne.concat(arraytwo);
    const payload = {
      user_id: idData?.user_id,
      contents: episodes,
      series_id: idData.series_id,
      uploaded_by_admin:true
    };
    const res = await addSeriesContentAPI(payload);
    if (res?.status === 200) {
      navigate("/creator/audio-video");
    } else {
      errorMessage(res.message);
    }
    setseriesLoading(false);
  };

  const onFinish = (values) => {
    const newValues = {
      title: values?.title,
      cast: values?.cast?.map((id) => ({ user_id: id })),
      thumbnail: values?.cover_art?.url,
      description: values?.description,
      content: values?.upload_trailer?.key_name,
      content_url: values?.upload_trailer?.url,
      duration: values?.upload_trailer?.duration,
      ratio: values?.upload_trailer?.ratio,
      subtitles:fields[0].language==null?[]:fields
      
    };
    setepisodeData((prevlist) => [...prevlist, newValues]);
    if (post) {
      getSubmit(newValues);
      setPost(false);
    } else formRef.current?.resetFields();
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleNextButton = () => {
    form.submit();
    setPost((prev) => !prev);
  };

  const getViewUserList = async () => {
    const result = await getUserListApi();
    const { data = [] } = result || {};
    const update = data?.map((list) => ({
      label: list?.check_user_name,
      value: list?._id
    }));
    setUserList(update);
  };

  const handleDelete = (value) => {
    setepisodeData((prevlist) => prevlist.filter((e, i) => i !== value));
  };

  useEffect(() => {
    getViewUserList();
  }, []);

  return [
    userList,
    episodeData,
    onFinish,
    seriesLoading,
    filterOption,
    handleNextButton,
    handleDelete
  ];
};

export default useManageSeries;
