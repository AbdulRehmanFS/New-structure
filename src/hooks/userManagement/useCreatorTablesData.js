import { useCallback, useEffect, useState } from "react";
import { getSeriesRequestApi } from "service/api/contentApproval";
import { getCreatorEventsApi, getCreatorPodcastsApi } from "service/api/usermanagement";
import { errorMessage } from "util/commonSection";
import { EventsIcon } from "util/svgFile";

const useCreatorTablesData = (userId) => {
  const [allTableRecord, setAllTableRecord] = useState({
    podcasts: [],
    events: []
  });
  const [eventCard, setEventCard] = useState({
    heading: "Total Events",
    count: "0",
    icon: <EventsIcon color="white" opacity="1" height="16px" width="16px" />
  });


  const getKlipz = useCallback(async () => {
    const params = new URLSearchParams();
    params.append("user_id", userId);
    params.append("page", 1);
    params.append("limit", 6);
    params.append("type", 3);
    const res = await getCreatorPodcastsApi(params);
    if (res?.status === 200) setAllTableRecord((prev) => ({ ...prev, klipz: res?.data }));
    else errorMessage(res?.message);
  },[userId]);

  const getSeriesData = useCallback(async () => {
    const params = new URLSearchParams();
    params.append("page", 1);
    params.append("limit", 6);
    params.append("user_id", userId);
    const res = await getSeriesRequestApi(params);
    if (res?.status === 200) setAllTableRecord((prev) => ({ ...prev, series: res?.data }));
    else errorMessage(res?.message);
  },[userId]);

  const getCreatorPodcasts = useCallback(async () => {
    const params = new URLSearchParams();
    params.append("user_id", userId);
    params.append("page", 1);
    params.append("limit", 6);
    const res = await getCreatorPodcastsApi(params);
    if (res?.status === 200) {
      setAllTableRecord((prev) => ({ ...prev, podcasts: res?.data }));
    } else errorMessage(res?.message);
  },[userId]);

  const getCreatorEvents = useCallback(async () => {
    const params = new URLSearchParams();
    params.append("user_id", userId);
    params.append("page", 1);
    params.append("limit", 6);
    const res = await getCreatorEventsApi(params);
    if (res?.status === 200) {
      setEventCard((pre) => ({ ...pre, count: res?.count ?? 0 }));
      setAllTableRecord((prev) => ({ ...prev, events: res?.data }));
    } else errorMessage(res?.message);
  },[userId]);

  useEffect(() => {
    getCreatorEvents();
    getCreatorPodcasts();
    getSeriesData();
    getKlipz();
  }, [getSeriesData, getCreatorPodcasts, getCreatorEvents, getKlipz]);
 // ✅ Update return order for clarity
return { eventCard, allTableRecord };

};

export default useCreatorTablesData;
