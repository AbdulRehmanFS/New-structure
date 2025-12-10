import Message from "component/messages";
import moment from "moment";
import { EllipseText, Line, Text, ViewerAction } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { archiveEventContentAPI } from "service/api/archive";
import { deleteScheduleContentAPI, getContentListingApi } from "service/api/eventContent";
import { errorMessage } from "util/commonSection";
import { defaultPageNo, eventPodcastType, pageLimit } from "util/constant";
import { theme } from "util/theme";

const useContentlisting = () => {
  const [podcastListing, setPodcastList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const { eventsearch } = useOutletContext() || {};
  const navigate = useNavigate();

  const getContantLisitng = useCallback(
    async (pageNo) => {
      setLoading(true);
      const filterType = selectedFilter ?? eventPodcastType.all;
      const params = new URLSearchParams();
      params.append("listing_type", filterType);
      params.append("page", pageNo);
      params.append("limit", pageLimit);
      params.append("search", eventsearch);
      params.append("type", 2);
      const res = await getContentListingApi(params);
      if (res?.status === 200) {
        const { count = 0, data = [] } = res;
        setTotalPage(count);
        setPodcastList(data);
      } else errorMessage(res?.message);
      setLoading(false);
    },
    [eventsearch, selectedFilter]
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getContantLisitng(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
    getContantLisitng(defaultPageNo);
  }, [getContantLisitng]);

  const handleStatusSelection = (e) => setSelectedFilter(e);

  useEffect(() => {
    if (selectedFilter !== null) {
      setCurrentPage(1);
      getContantLisitng(defaultPageNo);
    }
  }, [getContantLisitng, selectedFilter]);

  const handleModalOpen = () => setOpenModal((pre) => !pre);

  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setContentDetail(detail);
    setOpenModal((pre) => !pre);
  };

  const handleDelete = async () => {
    setModalLoading(true);
    const params = new URLSearchParams();
    params.append("event_id", contentDetail?._id);
    params.append("type", 2); // type 1 => event, type 2 => scheduled content
    const res = await deleteScheduleContentAPI(params);
    if (res?.status === 200) {
      Message.success(res);
      getContantLisitng(currentPage);
    } else Message.error(res);
    setOpenModal((pre) => !pre);
    setModalLoading(false);
  };

  const navigateEventRequest = () =>
    navigate("/creator/events-content-archive", {
      state: { type: "Contents" }
    });

  const handleArchive = async () => {
    setModalLoading(true);
    const payload = {
      content_id: contentDetail?._id,
      status: true
    };
    const res = await archiveEventContentAPI(payload);
    if (res?.status === 200) {
      Message.success(res);
      getContantLisitng(currentPage);
      setOpenModal((pre) => !pre);
    } else Message.error(res);
    setModalLoading(false);
  };

  const handleConfirm = () => {
    if (modalName === "delete") handleDelete();
    if (modalName === "archive") handleArchive();
  };

  const navigateDetailSection = (record) =>{
    if(record?.contentCount===0){

      navigate("/events-contents/contents-detail", {
        state: { podcastId: record?._id, showGraph: true }
      });
    }
    else{
      navigate("/events-contents/episodes",{
        state:{id:record?._id,time:record?.start_time}
      })
    }
  
  
  }

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
      title: "Content Title",
      dataIndex: "title",
      key: "podcast_title",
      align: "center",
      width: 160,
      render: (_, record) => (
        <EllipseText onClick={() => navigateDetailSection(record)} style={{ cursor: "pointer" }}>
          {record?.title}
        </EllipseText>
      )
    },
    {
      title: "Created By",
      dataIndex: "user_name",
      key: "created_by",
      align: "center",
      width: 120,
      render: (_, record) => (
        <Link
          to="/events-contents/contents-detail"
          state={{ podcastId: record?._id, showGraph: true }}
          className="view">
          <Text color={theme.fieldBg}>{record?.user_account?.user_name}</Text>
        </Link>
      )
    },
    {
      title: "Content Type",
      dataIndex: "content_type ",
      key: "content_type ",
      align: "center",
      width: 120,
      render: (_, record) => <div>{record?.content_type ?? "---"}</div>
    },
    {
      title: "Content Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 100,
      render: (_, record) => moment(record?.scheduled_date).format("DD-MMM-YY")
    },
    {
      title: "Time",
      dataIndex: "event_time",
      key: "time",
      align: "center",
      width: 80,
      render: (_, record) => record?.start_time && moment.unix(record?.start_time).format("hh:mm A")
    },
    {
      title: "Episodes",
      dataIndex: "contentCount",
      key: "contentCount",
      width: 80,
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>{record?.contentCount ?? "---"}</div>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 90,
      render: (_, record) => (
        <div>
          {" "}
          {record?.status == "cancelled"
            ? "Cancelled"
            : record?.status == "accepted" && !record?.is_reoccur
              ? "Upcoming"
              : record?.is_reoccur
                ? "Reoccurring"
                : "Past"}
        </div>
      )
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 180,
      render: (_, record) => (
        <ViewerAction>
          <div onClick={() => navigateDetailSection(record)} className="action-icon" aria-hidden>
            View
          </div>
          <Line height="16px" borderColor={theme.grey2} />
          <div
            className="action-icon"
            onClick={() => handleParticularModal("delete", record)}
            aria-hidden>
            Delete
          </div>
          <Line height="16px" borderColor={theme.grey2} />
          <div
            className="action-icon"
            onClick={() => handleParticularModal("archive", record)}
            aria-hidden>
            Archive
          </div>
        </ViewerAction>
      )
    }
  ];
  return {
    podcastListing,
    modalLoading,
    modalName,
    podcastcolumn,
    loading,
    totalPage,
    selectedFilter,
    navigateEventRequest,
    handleStatusSelection,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    handleConfirm
  };
};

export default useContentlisting;
