import { message } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultPageNo, pageLimit, modalIcons, modalSubheading } from "@utils/constant";
import { theme } from "@utils/theme";
import { archiveEventContentAPI } from "../services/archive.api";
import { deleteScheduleContentAPI } from "../services/eventContent.api";
import { recordScheduleContentApi } from "../services/eventContent.api";
import { errorMessage } from "@utils/helpers";

const useContentEpisodes = () => {
  const [recordedContent, setRecordedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const navigate = useNavigate();
  const [modalName, setModalName] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [contentDetail, setContentDetail] = useState(null);
  const { id, time } = useLocation()?.state || {};

  const handleBack = () => {
    navigate(-1);
  };

  const navigateDetailSection = (record) => {
    navigate("/events-contents/record-content-details", {
      state: { contentId: record?._id }
    });
  };

  const getContantLisitng = useCallback(
    async (pageNo) => {
      if (!id) return;
      setLoading(true);
      const params = new URLSearchParams();
      params.append("scheduled_id", id);
      params.append("page", pageNo);
      params.append("limit", pageLimit);
      const res = await recordScheduleContentApi(params);
      if (res?.status === 200) {
        const { count = 0, data = [] } = res;
        setTotalPage(count);
        setRecordedContent(data);
      } else {
        errorMessage(res?.message || "Something went wrong");
      }
      setLoading(false);
    },
    [id]
  );

  const navigateArchive = () => {
    navigate("/events-contents/archive-episdoes", {
      state: {
        id: id
      }
    });
  };

  const handleModalOpen = () => setOpenModal((pre) => !pre);
  
  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setContentDetail(detail);
    setOpenModal((pre) => !pre);
  };

  const handleConfirm = () => {
    if (modalName === "delete") handleDelete();
    if (modalName === "archive") handleArchive();
  };

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

  const handleDelete = async () => {
    setModalLoading(true);
    const params = new URLSearchParams();
    params.append("content_id", contentDetail?._id);
    params.append("type", 2); // type 2 => scheduled content
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

  const column = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 60,
      render: (_, record, index) => (currentPage - 1) * pageLimit + index + 1
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      align: "center",
      width: 90,
      render: (_, record) => (
        <div className="flex justify-center items-center">
          <img 
            src={record?.thumbnail} 
            alt="" 
            className="object-contain"
            style={{ maxHeight: "50px", maxWidth: "90px", height: "auto", width: "auto" }}
          />
        </div>
      )
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
          className="text-white cursor-pointer hover:underline truncate block max-w-[160px]"
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
        <span className="text-white">{record?.user_account?.user_name || "--"}</span>
      )
    },
    {
      title: "Content Type",
      dataIndex: "content_type ",
      key: "content_type ",
      align: "center",
      width: 120,
      render: (_, record) => <div className="text-white">{record?.content_type ?? "---"}</div>
    },
    {
      title: "Content Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 100,
      render: (_, record) =>
        record?.createdAt ? moment(record?.createdAt.split("T")[0]).format("DD-MMM-YY") : "--"
    },
    {
      title: "Time",
      dataIndex: "event_time",
      key: "time",
      align: "center",
      width: 80,
      render: (_, record) => (time && moment.unix(time).format("hh:mm a")) || "--"
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
            className="text-white cursor-pointer hover:underline px-2"
            role="button"
            tabIndex={0}
          >
            View
          </div>
          <div className="h-4 w-px bg-[rgba(255,255,255,0.1)]" />
          <div
            className="text-white cursor-pointer hover:underline px-2"
            onClick={(e) => {
              e.stopPropagation();
              handleParticularModal("delete", record);
            }}
            role="button"
            tabIndex={0}
          >
            Delete
          </div>
          <div className="h-4 w-px bg-[rgba(255,255,255,0.1)]" />
          <div
            className="text-white cursor-pointer hover:underline px-2"
            onClick={(e) => {
              e.stopPropagation();
              handleParticularModal("archive", record);
            }}
            role="button"
            tabIndex={0}
          >
            Archive
          </div>
        </div>
      )
    }
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getContantLisitng(pageNumber);
  };

  useEffect(() => {
    if (id) {
      setCurrentPage(1);
      getContantLisitng(defaultPageNo);
    }
  }, [getContantLisitng, id]);

  return {
    recordedContent,
    column,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    handleBack,
    modalLoading,
    modalName,
    openModal,
    handleConfirm,
    handleModalOpen,
    navigateArchive,
    modalIcons,
    modalSubheading
  };
};

export default useContentEpisodes;

