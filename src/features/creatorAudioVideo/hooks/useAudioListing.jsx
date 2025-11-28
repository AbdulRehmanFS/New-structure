import { useCallback, useEffect, useState } from "react";
import { Image, message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { contentRequestType, defaultPageNo, pageLimit, modalIcons, modalSubheading } from "@utils/constant";
import { theme } from "@utils/theme";
import { deleteContentAPI, getContentRequestApi } from "../services/contentApproval.api";
import { archiveContentAPI } from "../services/archive.api";
import { errorMessage } from "@utils/helpers";

const useAudioListing = ({ searchText = "" }) => {
  const [userListing, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const navigate = useNavigate();

  const navigateAudioRequest = (value) => {
    if (value === 1) navigate("/creator/archive");
    else
      navigate("/creator/request-list", {
        state: { type: contentRequestType.audio }
      });
  };

  const getRequestListing = useCallback(
    async (page) => {
      setLoading(true);
      const param = new URLSearchParams();
      param.append("type", contentRequestType.audio);
      param.append("listing_type", "approved");
      param.append("page", page);
      param.append("limit", pageLimit);
      if (searchText) {
        param.append("search", searchText);
      }
      const res = await getContentRequestApi(param);
      if (res?.status === 200) {
        const { data = [], count = 0 } = res;
        setUserList(data);
        setTotalPage(count);
      } else {
        errorMessage(res?.message || "Something went wrong");
      }
      setLoading(false);
    },
    [searchText]
  );

  const handlePageChange = (pageNumber) => {
    getRequestListing(pageNumber);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getRequestListing(defaultPageNo);
    setCurrentPage(1);
  }, [getRequestListing]);

  const navigateDetailSection = (record) =>
    navigate("/creator/content-detail", { state: { contentId: record?._id } });

  const handleModalOpen = () => setOpenModal((prev) => !prev);

  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setContentDetail(detail);
    setOpenModal((prev) => !prev);
  };

  const handleDelete = async () => {
    setModalLoading(true);
    const params = new URLSearchParams();
    params.append("content_id", contentDetail?._id);
    const res = await deleteContentAPI(params);
    if (res?.status === 200) {
      message.success(res?.message || "Content deleted successfully");
      getRequestListing(currentPage);
      setOpenModal((prev) => !prev);
    } else {
      errorMessage(res?.message || "Failed to delete content");
    }
    setModalLoading(false);
  };

  const handleArchive = async () => {
    setModalLoading(true);
    const payload = {
      content_id: contentDetail?._id,
      status: true
    };
    const res = await archiveContentAPI(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Content archived successfully");
      getRequestListing(currentPage);
      setOpenModal((prev) => !prev);
    } else {
      errorMessage(res?.message || "Failed to archive content");
    }
    setModalLoading(false);
  };

  const handleConfirm = () => {
    if (modalName === "delete") handleDelete();
    if (modalName === "archive") handleArchive();
  };

  const columns = [
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
        <Image src={record?.thumbnail} height="50px" width="auto" alt="" />
      )
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150,
      render: (_, record) => (
        <span
          onClick={() => navigateDetailSection(record)}
          className="cursor-pointer text-white hover:underline"
        >
          {record.title}
        </span>
      )
    },
    {
      title: "Created By",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      width: 120,
      render: (_, record) => <span className="text-white">{record?.user_account?.user_name}</span>
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      align: "center",
      width: 120,
      render: (_, record) => <span className="text-white">{record?.genre}</span>
    },
    {
      title: "Date Posted",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 100,
      render: (_, record) => (
        <span className="text-white">{moment(record?.createdAt).format("DD-MMM-YY")}</span>
      )
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "time",
      align: "center",
      width: 100,
      render: (_, record) => (
        <span className="text-white">{moment(record?.createdAt).format("hh:mm a")}</span>
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 160,
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2 border-b border-[rgba(255,255,255,0.1)] w-fit mx-auto">
          <span
            onClick={() => navigateDetailSection(record)}
            className="cursor-pointer text-white hover:underline"
          >
            View
          </span>
          <span className="h-4 w-px bg-[rgba(255,255,255,0.1)]" />
          <span
            className="cursor-pointer text-white hover:underline"
            onClick={() => handleParticularModal("delete", record)}
          >
            Delete
          </span>
          <span className="h-4 w-px bg-[rgba(255,255,255,0.1)]" />
          <span
            className="cursor-pointer text-white hover:underline"
            onClick={() => handleParticularModal("archive", record)}
          >
            Archive
          </span>
        </div>
      )
    }
  ];

  return {
    userListing,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    modalName,
    modalLoading,
    handleConfirm,
    navigateAudioRequest,
    columns,
    modalIcons: modalIcons[modalName],
    modalSubheading: modalSubheading[modalName]
  };
};

export default useAudioListing;

