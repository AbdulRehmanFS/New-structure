import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import moment from "moment";
import { message } from "antd";
import { defaultPageNo, eventPodcastType, pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";
import { getEventListingApi, updateEventRequestApi } from "../services/eventContent.api";
import { errorMessage } from "@utils/helpers";
import { GreenOkIcon, RedCrossIcon } from "@utils/svgFile";

const useEventRequest = () => {
  const [eventListing, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { eventsearch } = useOutletContext() || {};
  const [requestModal, setRequestModal] = useState({
    type: "",
    status: false,
    id: null,
    user_id: null
  });
  const [requestLoader, setRequestLoader] = useState(false);
  const navigate = useNavigate();

  const getEventListing = useCallback(
    async (pageNo) => {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("listing_type", eventPodcastType.pending);
      params.append("page", pageNo);
      params.append("limit", pageLimit);
      if (eventsearch) {
        params.append("search", eventsearch);
      }
      params.append("type", 1); // 1=> event, 2=> content
      const res = await getEventListingApi(params);
      if (res?.status === 200) {
        const { count = 0, data = [] } = res;
        setTotalCount(count);
        setEventList(data);
      } else {
        errorMessage(res?.message || "Something went wrong");
      }
      setLoading(false);
    },
    [eventsearch]
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getEventListing(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
    getEventListing(defaultPageNo);
  }, [getEventListing]);

  const handleEventNavigate = () => navigate("/events-contents/events");
  const closeRequestModal = () => setRequestModal({ status: false });

  const updateEventRequest = async () => {
    setRequestLoader(true);

    const payload = {
      event_id: requestModal?.id,
      user_id: requestModal?.user_id,
      action: requestModal?.type === "approve" ? 1 : 2 // 1 for accepted & 2 for rejected
    };

    const res = await updateEventRequestApi(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Request updated successfully");
      // stay on same page if after updated any list available on same page otherwise move to first page.
      if (currentPage !== 1 && totalCount <= (currentPage - 1) * pageLimit + 1) {
        setCurrentPage(1);
        getEventListing(1);
      } else getEventListing(currentPage);
    } else {
      errorMessage(res?.message || "Failed to update request");
    }
    setRequestLoader(false);
    closeRequestModal();
  };

  const openRequestModal = (requestType, id, userid) => {
    setRequestModal({
      status: true,
      type: requestType,
      id,
      user_id: userid
    });
  };

  const navigateToDetail = (record) =>
    navigate("/events-contents/events-detail", {
      state: { eventId: record?._id, showExtraInfo: false }
    });

  const eventRequestColumns = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "60px",
      render: (_, record, index) => (currentPage - 1) * pageLimit + index + 1
    },
    {
      title: "Event Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "110px",
      render: (_, record) => (
        <span className="text-white truncate block max-w-[110px]">{record?.title}</span>
      )
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
      align: "center",
      width: "110px",
      render: (_, record) => (
        <div
          onClick={() => navigateToDetail(record)}
          className="text-white cursor-pointer hover:underline"
        >
          {record?.user_account?.user_name}
        </div>
      )
    },
    {
      title: "Event Date",
      dataIndex: "event_date",
      key: "event_date",
      align: "center",
      width: "110px",
      render: (_, record) =>
        record?.scheduled_date ? moment(record?.scheduled_date).format("DD-MMM-YY") : ""
    },
    {
      title: "Time",
      dataIndex: "event_time",
      key: "time",
      align: "center",
      width: "90px",
      render: (_, record) =>
        record?.start_time ? moment.unix(record?.start_time).format("hh:mm A") : "--"
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
      align: "center",
      width: "140px",
      render: (_, record) => <span className="text-white">{record?.venue || "--"}</span>
    },
    {
      title: "Ticket Amount",
      dataIndex: "ticket_amount",
      key: "ticket_amount",
      align: "center",
      width: "110px",
      render: (_, record) => <span className="text-white">{record?.ticket_amount ? `$${record?.ticket_amount}USD` : "--"}</span>
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "75px",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2 border-b border-[rgba(255,255,255,0.1)] w-fit mx-auto">
          <span
            className="cursor-pointer"
            onClick={() => openRequestModal("decline", record?._id, record?.user_account?._id)}
          >
            <RedCrossIcon height="16px" width="16px" />
          </span>
          <div className="h-6 w-px bg-[rgba(255,255,255,0.1)]" />
          <span
            className="cursor-pointer"
            onClick={() => openRequestModal("approve", record?._id, record?.user_account?._id)}
          >
            <GreenOkIcon height="16px" width="16px" />
          </span>
        </div>
      )
    }
  ];

  return {
    requestModal,
    requestLoader,
    updateEventRequest,
    closeRequestModal,
    handlePageChange,
    currentPage,
    totalCount,
    loading,
    eventListing,
    eventRequestColumns,
    handleEventNavigate
  };
};

export default useEventRequest;

