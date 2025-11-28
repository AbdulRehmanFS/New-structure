import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserListApi } from "@services/api/collections";
import { isInteger } from "@utils/constant";
import { message } from "antd";

const useVideoForm = (uploadContent, fields) => {
  const [userList, setUserList] = useState([]);
  const [uploadLoader, setUploadLoader] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (payload) => {
    setUploadLoader(true);
    const { upload, cast, uploadTrailer, cover_art, ...rest } = payload;
    const thumbnail = cover_art;
    let finalList = {
      cast,
      subtitles: fields[0]?.language == null ? [] : fields,
      ...rest
    };

    if (typeof upload === "string") {
      finalList = {
        ...finalList,
        content_url: uploadContent?.content_url,
        content: uploadContent?.content,
        duration: uploadContent?.duration,
        ratio: uploadContent?.ratio
      };
    } else {
      finalList = {
        ...finalList,
        content_url: upload?.url,
        content: upload?.key_name,
        duration: Math.floor(upload?.duration),
        ratio: isInteger(upload?.ratio)
      };
    }

    if (typeof uploadTrailer === "string") {
      finalList = {
        ...finalList,
        trailer: uploadContent?.trailer,
        trailer_duration: uploadContent?.trailer_duration,
        trailer_ratio: uploadContent?.trailer_ratio
      };
    } else if (uploadTrailer) {
      finalList = {
        ...finalList,
        trailer: uploadTrailer?.url,
        trailer_duration: Math.floor(uploadTrailer?.duration),
        trailer_ratio: isInteger(uploadTrailer?.ratio)
      };
    }

    if (typeof thumbnail === "string") {
      finalList = {
        ...finalList,
        thumbnail: uploadContent?.thumbnail,
        cover_name: uploadContent?.cover_name
      };
    } else if (thumbnail) {
      finalList = {
        ...finalList,
        thumbnail: thumbnail?.url,
        cover_name: thumbnail?.name
      };
    }

    if (finalList?.content?.split("/")[1] === rest?.type) {
      navigate("/creator/review-content", {
        state: { uploadContent: finalList }
      });
    } else {
      message.error("Upload content and format of content are not matching");
    }
    setUploadLoader(false);
  };

  const getViewUserList = async () => {
    const result = await getUserListApi();
    const { data = [] } = result || {};
    const update = data?.map((list) => ({
      label: list?.check_user_name,
      value: JSON.stringify({ userId: list?._id, ...list?.userDetail }),
      ...list
    }));
    setUserList(update);
  };

  useEffect(() => {
    getViewUserList();
  }, []);

  return [userList, onFinish, uploadLoader];
};

export default useVideoForm;

