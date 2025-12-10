import { calculateAge } from "component/age";
import { message, Image, Tooltip } from "antd";
import moment from "moment";
import { UnderLine } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCreatorRequestDetails,
   updateCreatorRequestApi
   } from "service/api/usermanagement";
import { InstaIcon, PlayButtonIcon, TiktokIcon, TwitterIcon } from "util/svgFile";
import { theme } from "util/theme";

const useCreatorReqDetails = (userId) => {
  const navigate = useNavigate();
  const [profileLoader, setProfileLoader] = useState(false);
  const [contentDetail, setContentDetail] = useState([]);
  const [requestProfile, setRequestProfile] = useState([]);
  const [requestModal, setRequestModal] = useState({ type: "", status: false });
  const [requestLoader, setRequestLoader] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [commisionModal, setCommisionModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const handleVideoModalClose = () => setVideoModal(false);
  const handleCommisionModal = () => setCommisionModal((pre) => !pre);

  const handleRequestModal = (requestType = "") => {
    setRequestModal({
      status: !requestModal.status,
      type: requestType ?? requestModal?.type
    });
  };

  // const updateCreatorRequest = async () => {
  //   setRequestLoader(true);
  //   const actionType = requestModal?.type === "approve" ? "accepted" : "declined";
  //   const payload = {
  //     user_id: userId,
  //     action: actionType
  //   };
  //   const res = await updateCreatorRequestApi(payload);
  //   if (res?.status === 200) {
  //     message.success(res?.message);
  //     navigate(-1);
  //   } else message.error(res?.message);
  //   setRequestLoader(false);
  //   handleRequestModal();
  // };

  const updateCreatorRequest = async (reasons) => {
    setRequestLoader(true);

    try {
      const actionType = requestModal?.type === "approve" ? "accepted" : "declined";

      const formattedReason =
        Array.isArray(reasons) && reasons.length > 0
          ? reasons[0]
          : typeof reasons === "string"
            ? reasons
            : undefined;

      const payload = {
        user_id: userId,
        action: actionType,
        ...(actionType === "declined" && { reason: formattedReason }) // pass full array
      };
      // console.log("🫠 creator profile", payload);
      const res = await updateCreatorRequestApi(payload);

      if (res?.status === 200) {
        message.success(res?.message);
        navigate(-1);
      } else {
        message.error(res?.message);
      }
    } catch (err) {
      message.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setRequestLoader(false);
      handleRequestModal();
      // setShowRejectReason(false);
    }
  };

  const getCreatorRequestDetail = useCallback(async () => {
    setProfileLoader(true);
    const res = await getCreatorRequestDetails(userId);
    if (res?.status === 200) {
      const detail = res?.data[0] || {};
      const firstName = detail?.first_name ?? "";
      const lastName = detail?.last_name ?? "";
      const profileImage = detail?.profile_pic_url;
      const coverImage = detail?.userDetail?.cover_photo_url;

      const filterData = {
        "Name of User": `${firstName} ${lastName}`,
        "Email Address": detail?.email,
        Username: detail?.user_name,
        "Phone Number": `${detail?.country_code} ${detail?.phone_number}`,
        "Date Joined": moment(detail?.createdAt).format("DD MMM, yyyy") ?? "N/A",
        status: detail?.status,
        profilePic: profileImage,
        age: calculateAge(detail?.userDetail?.dob),
        coverImage,
        "Social Links": [
          {
            icon: <TiktokIcon height={20} width={20} />,
            value: detail?.userDetail?.facebook_link
          },
          {
            icon: <InstaIcon />,
            value: detail?.userDetail?.instagram_link
          },
          {
            icon: <TwitterIcon />,
            value: detail?.userDetail?.twitter_link
          }
        ]
      };
      setContentDetail(detail?.contentDetail);
      setRequestProfile(filterData);
    } else {
      setRequestProfile(null);
      message.error(res?.message);
    }
    setProfileLoader(false);
  }, [userId]);

  useEffect(() => {
    getCreatorRequestDetail();
  }, [getCreatorRequestDetail]);

  const content_columns = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 70,
      render: (_, record, index) => `${index + 1}`
    },
    {
      title: "Cover Image",
      dataIndex: "cover_photo_url",
      key: "cover_photo_url",
      align: "center",
      width: 105,
      render: (_, record) => <Image height="50px" width="auto" src={record?.thumbnail} />
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      align: "center",
      width: 120
    },
    {
      title: "Content Type",
      dataIndex: "content_type",
      key: "content_type",
      align: "center",
      width: 150
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 160,
      render: (_, record) => {
        const max = 18;
        const text = record?.description.substring(0, max);
        const showData = record?.description.length > max ? `${text}...` : text;
        return (
          <div className="description-text">
            {showData}

            {record?.description.length > max ? (
              <Tooltip title={record?.description}>
                <UnderLine className="more-content" color={theme.darkblue}>
                  more
                </UnderLine>
              </Tooltip>
            ) : (
              ""
            )}
          </div>
        );
      }
    },
    {
      title: "Cast",
      dataIndex: "cast",
      key: "cast",
      align: "center",
      width: 150,
      render: (_, record) => (
        <UnderLine className="cast" color={theme.red}>
          {record?.cast?.map((list) => (list?.user_name ? `${list?.user_name} ` : ""))}
        </UnderLine>
      )
    },
    {
      title: "View Content",
      dataIndex: "content_url",
      key: "content_url",
      align: "center",
      width: 220,
      render: (_, record) =>
        record?.content_url ? (
          <div className="action-wrapper">
            <span
              onClick={() => {
                setSelectedVideo(record);
                setVideoModal((pre) => !pre);
              }}
              className="play-icon"
              aria-hidden>
              <PlayButtonIcon height="18px" width="18px" />
            </span>
            <UnderLine className="content-link" color={theme.darkblue}>
              {record?.content_url}
            </UnderLine>
          </div>
        ) : (
          ""
        )
    }
  ];

  return [
    profileLoader,
    contentDetail,
    requestProfile,
    updateCreatorRequest,
    requestModal,
    handleRequestModal,
    requestLoader,
    content_columns,

    videoModal,
    commisionModal,
    selectedVideo,
    handleVideoModalClose,
    handleCommisionModal
  ];
};

export default useCreatorReqDetails;
