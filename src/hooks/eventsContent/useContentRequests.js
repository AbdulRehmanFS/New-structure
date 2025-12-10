import { message, theme } from "antd";
import { useNavigate, useOutletContext } from "react-router-dom";
import { GreenOkIcon, RedCrossIcon } from "util/svgFile";
import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "util/commonSection";
import { defaultPageNo, eventPodcastType, pageLimit } from "util/constant";
import { Line } from "recharts";
import { EllipseText, ViewerAction } from "page/style";
import moment from "moment";
import { getContentListingApi, updateContentRequestApi } from "service/api/eventContent";

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

  const getPodcastRequest = useCallback(async (pageNo) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("listing_type", eventPodcastType.pending);
    params.append("page", pageNo);
    params.append("limit", pageLimit);
    params.append("search", eventsearch);
    const res = await getContentListingApi(params);
    if (res?.status === 200) {
      const { count = 0, data = [] } = res;
      setTotalCount(count);
      setPodcastRequest(data);
    } else errorMessage(res?.message);
    setLoading(false);
  },[eventsearch]);

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
      message.success(res?.message);
      // stay on same page if after updated any list available on same page otherwise move to first page.
      if (currentPage !== 1 && totalCount <= (currentPage - 1) * pageLimit + 1) {
        setCurrentPage(1);
        getPodcastRequest(defaultPageNo);
      } else getPodcastRequest(currentPage);
    } else errorMessage(res?.message);
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
      render: (_, record, index) => `${index + 1}`
    },
    {
      title: "Podcast Title",
      dataIndex: "title",
      key: "podcast_title",
      align: "center",
      width: 160,
      render: (_, record) => <EllipseText>{record?.title}</EllipseText>
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
      align: "center",
      width: 180,
      render: (_, record) => (
        <div className="createdBy" onClick={() => navigateToDetail(record)} aria-hidden>
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
        <ViewerAction className="viewer-action">
          <div className="action">
            <span
              className="action-icon flex-wrap"
              onClick={() => openRequestModal("decline", record?._id)}
              aria-hidden>
              <RedCrossIcon height="16px" width="16px" />
            </span>
            <Line height="24px" borderColor={theme.grey2} />
            <span
              className="action-icon flex-wrap"
              onClick={() => openRequestModal("approve", record?._id)}
              aria-hidden>
              <GreenOkIcon height="16px" width="16px" />
            </span>
          </div>
        </ViewerAction>
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
