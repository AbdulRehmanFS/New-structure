import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import moment from "moment";
import { message } from "antd";
import { defaultPageNo, eventPodcastType, eventPodcastFilter, pageLimit, modalIcons, modalSubheading } from "@utils/constant";
import { theme } from "@utils/theme";
import { getContentListingApi, deleteScheduleContentAPI } from "../services/eventContent.api";
import { archiveEventContentAPI } from "../services/archive.api";
import { errorMessage } from "@utils/helpers";

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
      if (eventsearch) {
        params.append("search", eventsearch);
      }
      params.append("type", 2);
      const res = await getContentListingApi(params);
      if (res?.status === 200) {
        const { count = 0, data = [] } = res;
        setTotalPage(count);
        setPodcastList(data);
      } else {
        errorMessage(res?.message || "Something went wrong");
      }
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
      message.success(res?.message || "Content deleted successfully");
      getContantLisitng(currentPage);
      setOpenModal((pre) => !pre);
    } else {
      errorMessage(res?.message || "Failed to delete content");
    }
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
      message.success(res?.message || "Content archived successfully");
      getContantLisitng(currentPage);
      setOpenModal((pre) => !pre);
    } else {
      errorMessage(res?.message || "Failed to archive content");
    }
    setModalLoading(false);
  };

  const handleConfirm = () => {
    if (modalName === "delete") handleDelete();
    if (modalName === "archive") handleArchive();
  };

  const navigateDetailSection = (record) => {
    if (record?.contentCount === 0) {
      navigate("/events-contents/contents-detail", {
        state: { podcastId: record?._id, showGraph: true }
      });
    } else {
      navigate("/events-contents/episodes", {
        state: { id: record?._id, time: record?.start_time }
      });
    }
  };

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
        <span
          onClick={() => navigateDetailSection(record)}
          className="cursor-pointer hover:underline truncate block max-w-[160px]"
        >
          {record?.title}
        </span>
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
          className="hover:underline"
          style={{ color: theme.fieldBg }}
        >
          {record?.user_account?.user_name}
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
        <div className="flex justify-center items-center border-b border-[rgba(255,255,255,0.1)] w-fit mx-auto">
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigateDetailSection(record);
            }}
            className="cursor-pointer hover:underline px-2"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigateDetailSection(record);
              }
            }}
          >
            View
          </div>
          <div className="h-4 w-px bg-[rgba(255,255,255,0.1)]" />
          <div
            className="cursor-pointer hover:underline px-2"
            onClick={(e) => {
              e.stopPropagation();
              handleParticularModal("delete", record);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleParticularModal("delete", record);
              }
            }}
          >
            Delete
          </div>
          <div className="h-4 w-px bg-[rgba(255,255,255,0.1)]" />
          <div
            className="cursor-pointer hover:underline px-2"
            onClick={(e) => {
              e.stopPropagation();
              handleParticularModal("archive", record);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleParticularModal("archive", record);
              }
            }}
          >
            Archive
          </div>
        </div>
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
    handleConfirm,
    modalIcons,
    modalSubheading
  };
};

export default useContentlisting;

