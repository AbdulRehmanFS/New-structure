import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getContentApi, updatePoliciesApi } from "service/api/manageContent";

const useGetContent = (contenttype,modalLoading) => {
  const [contentData, setContentData] = useState();
  const [loading, setLoading] = useState(false);
  const [screenLoader, setScreenLoader] = useState(true);

  const handleSubmit = async (newContent) => {
    setLoading(true);
    const payload = { ...newContent, type: contenttype };
    const res = await updatePoliciesApi(payload);
    if (res?.status === 200) {
      message.success(res?.message || "");
    }
    setLoading(false);
  };

  const handleContentApi = useCallback(async () => {
    setScreenLoader(true);
    const res = await getContentApi(contenttype);
    if (res?.status === 200) {
      if (contenttype === 4) {
        const { data = [] } = res || {};
        setContentData(data);
      } else {
        const { content = "" } = res?.data || {};
        setContentData(content);
      }
    } else message.error(res?.message);
    setScreenLoader(false);
  },[contenttype]);

  useEffect(() => {
    handleContentApi();
  }, [handleContentApi,modalLoading]);

  return {contentData, screenLoader, loading, handleSubmit};
};

export default useGetContent;
