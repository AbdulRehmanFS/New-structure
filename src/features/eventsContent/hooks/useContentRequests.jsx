import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import moment from "moment";
import { message } from "antd";
import { defaultPageNo, eventPodcastType, pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";
import { getContentListingApi, updateContentRequestApi } from "../services/eventContent.api";
import { errorMessage } from "@utils/helpers";
import { GreenOkIcon, RedCrossIcon } from "@utils/svgFile";

const useContentRequests = () => {
  const [podcastRequests, setPodcastRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestModal, setRequestModal] = useState({
    type: "",
    status: false,
    id: null
  });
  const [requestLoader, setRequestLoader] = useState(false);
  const { eventsearch } = useOutletContext() || {};
  const navigate = useNavigate();

  const getPodcastRequest = useCallback(
    async (pageNo) => {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("listing_type", eventPodcastType.pending);
      params.append("page", pageNo);
      params.append("limit", pageLimit);
      if (eventsearch) {
        params.append("search", eventsearch);
      }
      params.append("type", 2); // 2 for content
      const res = await getContentListingApi(params);
      if (res?.status === 200) {
        const { count = 0, data = [] } = res;
        setTotalCount(count);
        setPodcastRequest(data);
      } else {
        errorMessage(res?.message || "Something went wrong");
      }
      setLoading(false);
    },
    [eventsearch]
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getPodcastRequest(pageNumber);
  };
  const closeRequestModal = () => setRequestModal({ status: false });

  const updatePodcastRequest = async () => {
    setRequestLoader(true);
    const podcastAction = requestModal?.type === "approve" ? "accepted" : "cancelled";
    const payload = { content_id: requestModal?.id, action: podcastAction };
    const res = await updateContentRequestApi(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Request updated successfully");
      // stay on same page if after updated any list available on same page otherwise move to first page.
      if (currentPage !== 1 && totalCount <= (currentPage - 1) * pageLimit + 1) {
        setCurrentPage(1);
        getPodcastRequest(1);
      } else getPodcastRequest(currentPage);
    } else {
      errorMessage(res?.message || "Failed to update request");
    }
    setRequestLoader(false);
    closeRequestModal();
  };

  useEffect(() => {
    setCurrentPage(1);
    getPodcastRequest(defaultPageNo);
  }, [getPodcastRequest]);

  const handlePodcastNavigate = () => navigate("/events-contents/contents");

  const openRequestModal = (requestType, id) =>
    setRequestModal({
      status: true,
      type: requestType,
      id
    });

  const navigateToDetail = (record) =>
    navigate("/events-contents/contents-detail", {
      state: { podcastId: record?._id, showGraph: false }
    });

  const podcastcolumn = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 60,
      render: (_, record, index) => (currentPage - 1) * pageLimit + index + 1
    },
    {
      title: "Podcast Title",
      dataIndex: "title",
      key: "podcast_title",
      align: "center",
      width: 160,
      render: (_, record) => (
        <span className="text-white truncate block max-w-[160px]">{record?.title}</span>
      )
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
      align: "center",
      width: 180,
      render: (_, record) => (
        <div
          className="text-white cursor-pointer hover:underline"
          onClick={() => navigateToDetail(record)}
        >
          {record?.user_account?.user_name}
        </div>
      )
    },
    {
      title: "Date Posted",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 100,
      render: (_, record) => moment(record?.createdAt).format("DD-MMM-YY")
    },

    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 100,
      render: (_, record) => moment(record?.createdAt).format("hh:mm a")
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2 border-b border-[rgba(255,255,255,0.1)] w-fit mx-auto">
          <span
            className="cursor-pointer"
            onClick={() => openRequestModal("decline", record?._id)}
          >
            <RedCrossIcon height="16px" width="16px" />
          </span>
          <div className="h-6 w-px bg-[rgba(255,255,255,0.1)]" />
          <span
            className="cursor-pointer"
            onClick={() => openRequestModal("approve", record?._id)}
          >
            <GreenOkIcon height="16px" width="16px" />
          </span>
        </div>
      )
    }
  ];

  return {
    requestModal,
    handlePageChange,
    totalCount,
    loading,
    currentPage,
    closeRequestModal,
    podcastRequests,
    handlePodcastNavigate,
    updatePodcastRequest,
    requestLoader,
    podcastcolumn
  };
};

export default useContentRequests;

