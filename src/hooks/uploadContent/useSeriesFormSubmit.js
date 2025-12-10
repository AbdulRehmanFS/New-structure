import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSeriesAPI } from "service/api/collections";
import { errorMessage } from "util/commonSection";

const useSeriesFormSubmit = () => {
  const navigate = useNavigate();
  const [saveLoading, setSaveLoading] = useState(false);

  const onFinish = async (values) => {
    setSaveLoading(true);
    const payload = {
      user_id: values?.creator,
      description: values?.description,
      title: values?.title,
      thumbnail: values?.cover_art?.url,
      genre: values?.genre,
      type: values?.format,
      content_type: values?.content_type,
      audience: values?.audience,
      trailer: values?.upload_trailer?.url,
      trailer_ratio: values?.upload_trailer?.ratio,
      trailer_duration: values?.upload_trailer?.duration
    };
    const res = await addSeriesAPI(payload);
    if (res.status === 200) {
      navigate("/creator/manage-series-upload", {
        state: {
          user_id: values?.creator,
          series_id: res?.id
        }
      });
    } else {
      errorMessage(res?.message);
    }
    setSaveLoading(false);
  };
  return [onFinish, saveLoading];
};

export default useSeriesFormSubmit;
