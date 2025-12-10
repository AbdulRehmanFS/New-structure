import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { userDetailApi, userStatsApi } from "service/api/usermanagement"; // ✅ both apis
import moment from "moment";
import { useLocation } from "react-router-dom";
import { podcastCardList } from "page/userManagement/data";
import { calculateAge } from "component/age";
import { CashIcon, EventsIcon, UserIcon } from "util/svgFile";

const useUserProfile = (info, filter) => {
  console.log(info,filter ,"yeahaaa");
  const location = useLocation().pathname;
  const [creatorProfile, setCreatorProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [allDetails, setAllDetails] = useState({});
  const [podcastCardInfo, setPodcastInfo] = useState(podcastCardList);

  // ✅ separate states for stats API
  const [watchTimeCard, setWatchTimeCard] = useState({
    heading: "Total Watch Time",
    count: "0"
  });
  const [subscriberCard, setSubscriberCard] = useState({
    heading: "Total Subscribers",
    count: "0",
    icon: <UserIcon color="white" opacity="1" height="16px" width="16px" />
  });
  const [earningCard, setEarningCard] = useState({
    heading: "Total Earnings",
    count: "$0",
    icon: <CashIcon color="white" opacity="1" height="20px" width="20px" />
  });
  const [eventCard, setEventCard] = useState({
    heading: "Total Events",
    count: "0",
    icon: <EventsIcon color="white" opacity="1" height="16px" width="16px" />
  });

  // ---- First API (user details + content counts)
  const getUserDetail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userDetailApi(info, filter);

      if (res?.status === 200) {
        const detail = res?.data[0] || {};
        const firstName = detail?.first_name ?? "";
        const lastName = detail?.last_name ?? "";
        const profilePic = detail?.profile_pic_url;

        const filterData = {
          "Name of User": `${firstName} ${lastName}`,
          Username: detail?.user_name,
          "Email Address": detail?.email,
          Gender: detail?.userDetail?.gender,
          "Phone Number": `${detail?.country_code} ${detail?.phone_number}`,
          "Date Joined": moment(detail?.createdAt).format("DD-MM-yyyy") ?? "N/A",
          status: detail?.status,
          age: calculateAge(detail?.userDetail?.dob),
          profilePic
        };

        if (location.includes("creator-profile")) {
          filterData["About Me"] = detail?.userDetail?.about_me;
          filterData["coverImage"] = detail?.userDetail?.cover_photo_url;
        }

        setCreatorProfile(filterData);

        if (location.includes("creator-profile")) {
          setAllDetails(detail);

          // ✅ update podcast cards
          setPodcastInfo((pre) => {
            const updatePodcast = [...pre];
            updatePodcast[0].count = detail?.contentCount ?? 0;
            updatePodcast[1].count = detail?.audioContentCount ?? 0;
            updatePodcast[2].count = detail?.videoContentCount ?? 0;
            updatePodcast[3].count = detail?.KlipzContentCount ?? 0;
            return updatePodcast;
          });
        }
      } else {
        setCreatorProfile(null);
        message.error(res?.message);
      }
    } catch (error) {
      message.error("Failed to fetch user details");
    }
    setLoading(false);
  }, [info, filter, location]);

  // ---- Second API (stats: subscribers, earnings, watch time, events)
  const getUserStats = useCallback(async () => {
    try {
      const res = await userStatsApi(info, filter);

      if (res?.status === 200) {
        console.log(" res?.data", res?.data)
        const stats = res?.data || {};

        setSubscriberCard((prev) => ({ ...prev, count: stats?.subscriberCount ?? 0 }));
        setEarningCard((prev) => ({ ...prev, count: `$${stats?.overallEarnings ?? 0}` }));
        setWatchTimeCard((prev) => ({ ...prev, count: stats?.totalWatchtime ?? 0 }));
        setEventCard((prev) => ({ ...prev, count: stats?.eventCount ?? 0 }));
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error("Failed to fetch user stats");
    }
  }, [info, filter]);

  useEffect(() => {
    getUserDetail();
    getUserStats();
  }, [getUserDetail, getUserStats]);

  // ✅ return everything
  return {
    creatorProfile,
    loading,
    getUserDetail,
    getUserStats,
    allDetails,
    podcastCardInfo,
    watchTimeCard,
    subscriberCard,
    earningCard,
    eventCard
  };
};
export default useUserProfile;