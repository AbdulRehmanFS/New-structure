import { EllipseText, Line, ViewerAction } from "page/style";
import { getEventListingApi, updateEventRequestApi } from "service/api/eventContent";
import { errorMessage } from "util/commonSection";
import { GreenOkIcon, RedCrossIcon } from "util/svgFile";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { message } from "antd";
import moment from "moment";
import { defaultPageNo, eventPodcastType, pageLimit } from "util/constant";
import { theme } from "util/theme";

const useEventRequest = () => {
  const [eventListing, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { eventsearch } = useOutletContext() || {};
  const [requestModal, setRequestModal] = useState({
    type: "",
    status: false,
    id: null
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
      params.append("search", eventsearch);
      params.append("type",1) //. 1=> event, 2=> content 
      const res = await getEventListingApi(params);
      if (res?.status === 200) {
        const { count = 0, data = [] } = res;
        setTotalCount(count);
        setEventList(data);
      } else errorMessage(res?.message);
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
      user_id:requestModal?.user_id,
      action: requestModal?.type === "approve" ? 1 : 2 // 1 for accepted & 2 for rejected
    };
   
    const res = await updateEventRequestApi(payload);
    if (res?.status === 200) {
      message.success(res?.message);
      // stay on same page if after updated any list available on same page otherwise move to first page.
      if (currentPage !== 1 && totalCount <= (currentPage - 1) * pageLimit + 1) {
        setCurrentPage(1);
        getEventListing(1);
      } else getEventListing(defaultPageNo);
    } else errorMessage(res?.message);
    setRequestLoader(false);
    closeRequestModal();
  };

  const openRequestModal = (requestType, id,userid) => {
    setRequestModal({
      status: true,
      type: requestType,
      id,
      user_id:userid
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
      render: (_, record) => <EllipseText>{record?.title}</EllipseText>
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
      align: "center",
      width: "110px",
      render: (_, record) => (
        <div onClick={() => navigateToDetail(record)} className="createdBy" aria-hidden>
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
      width: "140px"
    },
    {
      title: "Ticket Amount",
      dataIndex: "ticket_amount",
      key: "ticket_amount",
      align: "center",
      width: "110px"
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "75px",
      render: (_, record) => (
        <ViewerAction className="viewer-action">
          <div className="action">
            <span
              className="action-icon flex-wrap"
              onClick={() => openRequestModal("decline", record?._id,record?.user_account?._id)}
              aria-hidden>
              <RedCrossIcon height="16px" width="16px" />
            </span>
            <Line height="24px" borderColor={theme.grey2} />
            <span
              className="action-icon flex-wrap"
              onClick={() => openRequestModal("approve", record?._id,record?.user_account?._id)}
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
