import Message from "@components/Message";
import { Tooltip } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { archiveContentAPI, archiveEventContentAPI } from "../services/archive.api";
import { deleteContentAPI } from "../services/contentApproval.api";
import { getCreatorEventsApi, getCreatorPodcastsApi } from "../services/userManagement.api";
import { errorMessage } from "@utils/commonSection";
import { defaultPageNo, pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";
import { deleteScheduleContentAPI } from "../services/eventContent.api";

const useViewAllListing = (userId) => {
  const [searchContent, setSearchContent] = useState("");
  const [eventData, seteventData] = useState();
  const [contentTotalPage, setContentTotalPage] = useState();
  const [contentData, setContentData] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [eventmodalName, setEventModalName] = useState(null);
  const [eventopenModal, seteventOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [tableLoader, setTableLoader] = useState(true);

  const [type, setType] = useState(null);
  const limit = 15;

  const [contentDetail, setContentDetail] = useState(null);
  const [modalEventLoading, setmodalEventLodading] = useState(false);
  const getListing = useCallback(
    async (page) => {
      if (!userId) {
        setTableLoader(false);
        return;
      }
      setTableLoader(true);
      const params = new URLSearchParams();
      params.append("user_id", userId);
      params.append("page", page);
      params.append("limit", pageLimit);
      params.append("search", searchContent);

      const req = await getCreatorEventsApi(params);
      if (req?.status === 200) {
        seteventData(req?.data);
        setTotalPage(req?.count ?? 0);
      } else {
        errorMessage(req);
      }
      const contentReq = await getCreatorPodcastsApi(params);
      if (contentReq?.status === 200) {
        setContentData(contentReq?.data);
        setContentTotalPage(contentReq?.count);
      } else {
        errorMessage(contentReq);
      }

      setTableLoader(false);
    },
    [userId, searchContent]
  );

  const handleEventModalOpen = () => seteventOpenModal((pre) => !pre);

  const handleParticularModal = (name, detail, type) => {
    setEventModalName(name);
    setContentDetail(detail);
    seteventOpenModal((pre) => !pre);
    setType(type);
  };

  const handleSearchData = (e) => setSearchContent(e);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getListing(pageNumber);
  };
  const handleEventConfirm = () => {
    if (eventmodalName === "delete") handleDelete();
    if (eventmodalName === "archive") handleArchive();
  };
  const handleArchive = async () => {
    setmodalEventLodading(true);
    let res;
    if (type == "event") {
      const payload = {
        content_id: contentDetail?._id,
        status: true
      };

      res = await archiveEventContentAPI(payload);
    } else {
      const payload = {
        content_id: contentDetail?._id,
        status: true
      };
      res = await archiveContentAPI(payload);
    }

    if (res?.status === 200) {
      Message.success(res);
      getListing(currentPage);
      seteventOpenModal((pre) => !pre);
    } else Message.error(res);
    setmodalEventLodading(false);
  };
  const handleDelete = async () => {
    setmodalEventLodading(true);
    let res;
    const params = new URLSearchParams();

    if (type == "event") {
      params.append("event_id", contentDetail?._id);
      params.append("type", 1);
      res = await deleteScheduleContentAPI(params);
    } else {
      params.append("content_id", contentDetail?._id);
      params.append("type", 2);
      res = await deleteContentAPI(params);
    }

    if (res?.status === 200) {
      Message.success(res);
      getListing(currentPage);
    } else Message.error(res);
    seteventOpenModal((pre) => !pre);
    setmodalEventLodading(false);
  };

  useEffect(() => {
    getListing(defaultPageNo);
  }, [getListing]);
  const contentColumns = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 60,
      render: (_, record, index) => (currentPage - 1) * limit + index + 1
    },
    {
      title: "Category",
      dataIndex: "type",
      key: "category",
      align: "center",
      width: 120,

      render: (_, record) => `${record?.type} Content`
    },
    {
      title: "Content Type",
      dataIndex: "content_type",
      key: "type",
      align: "center",
      width: 120
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "podcast_title",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Tooltip title={record?.title?.length > 37 ? record?.title : ""}>
          <div className="max-w-[300px] overflow-hidden text-center mx-auto" style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
            {record?.title}
          </div>
        </Tooltip>
      )
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      align: "center",
      width: 80,
      render: (_, record) =>
        record?.createdAt ? moment(record?.createdAt).format("DD-MMM-YY") : ""
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "time",
      align: "center",
      width: 60,
      render: (_, record) =>
        record?.createdAt ? moment(record?.createdAt).format("hh:mm A") : "--"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 70,
      render: (_, record) => {
        if (!record.approved_by_admin && record.approved_date === null) {
          return "Under Review";
        } else if (record.approved_by_admin && record.approved_date !== null) {
          return "Approved";
        } else if (!record.approved_by_admin && record.approved_date !== null) {
          return "Denied";
        }
      }
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 180,
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="flex min-w-[84px] justify-between items-center">
            <Link
              to="/creator/content-detail"
              state={{ contentId: record?._id, showGraph: true }}
              className="underline underline-offset-[3px] text-[#9E9E9E]">
              View
            </Link>
            <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
            <div
              className="cursor-pointer"
              onClick={() => handleParticularModal("delete", record, "content")}
              aria-hidden>
              Delete
            </div>
            <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
            <div
              className="cursor-pointer"
              onClick={() => handleParticularModal("archive", record, "content")}
              aria-hidden>
              Archive
            </div>
          </div>
        </div>
      )
    }
  ];
  const eventColumns = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 60,
      render: (_, record, index) => `${index + 1}`
    },
    {
      title: "Event Title",
      dataIndex: "title",
      key: "event_title",
      align: "center",
      width: 140
    },
    {
      title: "Date",
      dataIndex: "event_date",
      key: "event_date",
      align: "center",
      width: 100,
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
      width: 180
    },
    {
      title: "Ticket Amount",
      dataIndex: "ticket_amount",
      key: "ticket_amount",
      align: "center",
      width: 110,
      render: (_, record) => record?.ticket_amount && `$${record?.ticket_amount}USD`
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 180,
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="flex min-w-[84px] justify-between items-center">
            <Link
              to="/events-contents/events-detail"
              state={{ eventId: record?._id, showExtraInfo: true }}
              className="underline underline-offset-[3px] text-[#9E9E9E]">
              View
            </Link>
            <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
            <div
              className="cursor-pointer"
              onClick={() => handleParticularModal("delete", record, "event")}
              aria-hidden>
              Delete
            </div>
            <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
            <div
              className="cursor-pointer"
              onClick={() => handleParticularModal("archive", record, "event")}
              aria-hidden>
              Archive
            </div>
          </div>
        </div>
      )
    }
  ];

  return {
    handleSearchData,
    handlePageChange,
    eventData,
    contentData,
    contentTotalPage,
    tableLoader,
    eventColumns,
    currentPage,
    totalPage,
    contentColumns,
    eventopenModal,
    eventmodalName,
    handleEventModalOpen,
    handleEventConfirm,
    modalEventLoading
  };
};

export default useViewAllListing;

