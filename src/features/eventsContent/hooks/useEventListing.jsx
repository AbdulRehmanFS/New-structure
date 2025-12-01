import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { message } from "antd";
import { defaultPageNo, eventPodcastType, eventPodcastFilter, pageLimit, modalIcons, modalSubheading } from "@utils/constant";
import { theme } from "@utils/theme";
import { getEventListingApi, deleteScheduleContentAPI } from "../services/eventContent.api";
import { archiveEventContentAPI } from "../services/archive.api";
import { errorMessage } from "@utils/helpers";

const useEventListing = () => {
  const [eventListing, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const { eventsearch } = useOutletContext() || {};
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const navigate = useNavigate();

  const getEventListing = useCallback(
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
      params.append("type", 1); // 1=> event, 2=> content
      const res = await getEventListingApi(params);
      if (res?.status === 200) {
        const { count = 0, data = [] } = res;
        setTotalPage(count);
        setEventList(data);
      } else {
        errorMessage(res?.message || "Something went wrong");
      }
      setLoading(false);
    },
    [eventsearch, selectedFilter]
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getEventListing(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
    getEventListing(defaultPageNo);
  }, [getEventListing]);

  useEffect(() => {
    if (selectedFilter !== null) {
      setCurrentPage(1);
      getEventListing(defaultPageNo);
    }
  }, [getEventListing, selectedFilter]);

  const navigateEventRequest = (value) => {
    if (value === 1)
      navigate("/creator/events-content-archive", {
        state: { type: "Events" }
      });
    else navigate("/events-contents/events-request");
  };

  const handleStatusSelection = (e) => setSelectedFilter(e);

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
    params.append("type", 1); // type 1 => event, type 2 => scheduled content
    const res = await deleteScheduleContentAPI(params);
    if (res?.status === 200) {
      message.success(res?.message || "Event deleted successfully");
      getEventListing(currentPage);
      setOpenModal((pre) => !pre);
    } else {
      errorMessage(res?.message || "Failed to delete event");
    }
    setModalLoading(false);
  };

  const handleArchive = async () => {
    setModalLoading(true);
    const payload = {
      content_id: contentDetail?._id,
      status: true,
    };
    const res = await archiveEventContentAPI(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Event archived successfully");
      getEventListing(currentPage);
      setOpenModal((pre) => !pre);
    } else {
      errorMessage(res?.message || "Failed to archive event");
    }
    setModalLoading(false);
  };

  const handleConfirm = () => {
    if (modalName === "delete") handleDelete();
    if (modalName === "archive") handleArchive();
  };

  const navigateDetailSection = (record) =>
    navigate("/events-contents/events-detail", {
      state: { eventId: record?._id, showExtraInfo: true, contentCount: record?.contentCount }
    });

  const eventcolumn = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 60,
      render: (_, record, index) => (currentPage - 1) * pageLimit + index + 1
    },
    {
      title: "Event Title",
      dataIndex: "event_title",
      key: "event_title",
      align: "center",
      width: 140,
      render: (_, record) => (
        <span
          onClick={() => navigateDetailSection(record)}
          className="cursor-pointer hover:underline truncate block max-w-[140px]"
        >
          {record?.title}
        </span>
      )
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
      align: "center",
      width: 140,
      render: (_, record) => (
        <Link
          to="/events-contents/events-detail"
          state={{ eventId: record?._id, showExtraInfo: true }}
          className="hover:underline"
          style={{ color: theme.fieldBg }}
        >
          {record?.user_account?.user_name}
        </Link>
      )
    },
    {
      title: "Event Date",
      dataIndex: "event_date",
      key: "event_date",
      align: "center",
      width: 90,
      render: (_, record) =>
        record?.scheduled_date ? moment(record?.scheduled_date).format("DD-MMM-YY") : ""
    },
    {
      title: "Time",
      dataIndex: "event_time",
      key: "time",
      align: "center",
      width: 100,
      render: (_, record) =>
        record?.start_time ? moment.unix(record?.start_time).format("hh:mm A") : "--"
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
      align: "center",
      width: 140,
      render: (_, record) => (
        <span className="truncate block max-w-[140px]">{record?.venue}</span>
      )
    },
    {
      title: "Ticket Amount",
      dataIndex: "ticket_amount",
      key: "ticket_amount",
      align: "center",
      width: 110,
      render: (_, record) => `$${record?.ticket_amount}USD`
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
            : record?.status == "accepted"
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
      width: 160,
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

  const modifyfilter = [...eventPodcastFilter];
  modifyfilter.pop();

  return {
    eventListing,
    modalName,
    modalLoading,
    totalPage,
    handleConfirm,
    handleModalOpen,
    openModal,
    handlePageChange,
    currentPage,
    loading,
    eventcolumn,
    navigateEventRequest,
    handleStatusSelection,
    selectedFilter,
    modifyfilter,
    modalIcons,
    modalSubheading
  };
};

export default useEventListing;

