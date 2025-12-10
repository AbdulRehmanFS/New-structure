import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { theme } from "util/theme";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { EllipseText, Line, Text } from "page/style";
import { defaultPageNo, eventPodcastType, pageLimit } from "util/constant";
import styled from "styled-components";
import Message from "component/messages";
import { errorMessage } from "util/commonSection";
import { archiveEventContentAPI } from "service/api/archive";
import { deleteScheduleContentAPI, getEventListingApi } from "service/api/eventContent";

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
      params.append("search", eventsearch);
      params.append("type", 1); //. 1=> event, 2=> content
      const res = await getEventListingApi(params);
      if (res?.status === 200) {
        const { count = 0, data = [] } = res;
        setTotalPage(count);
        setEventList(data);
      } else errorMessage(res?.message);
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
      Message.success(res);
      getEventListing(currentPage);
    } else Message.error(res);
    setOpenModal((pre) => !pre);
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
      Message.success(res);
      getEventListing(currentPage);
      setOpenModal((pre) => !pre);
    } else Message.error(res);
    setModalLoading(false);
  };

  const handleConfirm = () => {
    if (modalName === "delete") handleDelete();
    if (modalName === "archive") handleArchive();
  };

  const navigateDetailSection = (record) =>
    navigate("/events-contents/events-detail", {
      state: { eventId: record?._id, showExtraInfo: true,contentCount:record?.contentCount }
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
        <EllipseText onClick={() => navigateDetailSection(record)} style={{ cursor: "pointer" }}>
          {record?.title}
        </EllipseText>
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
          className="view">
          <Text color={theme.fieldBg}>{record?.user_account?.user_name}</Text>
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
      render: (_, record) => <EllipseText>{record?.venue}</EllipseText>
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
          {" "}
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
    selectedFilter
  };
};

export default useEventListing;

const ViewerAction = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid;
  width: fit-content;
  margin: auto;
  .action-icon {
    cursor: pointer;
  }
`;
