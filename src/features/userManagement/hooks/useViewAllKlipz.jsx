import Message from "@components/Message";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { archiveContentAPI } from "../services/archive.api";
import { deleteContentAPI } from "../services/contentApproval.api";
import { getCreatorPodcastsApi } from "../services/userManagement.api";
import { errorMessage } from "@utils/commonSection";
import { defaultPageNo, pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";

const useViewAllKlipz = (userId) => {
  const [searchContent, setSearchContent] = useState("");
  const [viewAllListing, setViewAllListing] = useState([]);
  const [tableLoader, setTableLoader] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [modalName, setModalName] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const handleSearchData = (e) => setSearchContent(e);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const getKlipz = useCallback(
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
      params.append("type", 3);
      params.append("search", searchContent);
      const res = await getCreatorPodcastsApi(params);
      if (res?.status === 200) {
        setViewAllListing(res?.data);
        setTotalPage(res?.count);
      } else errorMessage(res?.message);
      setTableLoader(false);
    },
    [userId, searchContent]
  );
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getKlipz(pageNumber);
  };

  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setContentDetail(detail);
    setOpenModal((pre) => !pre);
  };
  const handleArchive = async () => {
    setModalLoading(true);
    const payload = {
      content_id: contentDetail?._id,
      status: true
    };
    const res = await archiveContentAPI(payload);
    if (res?.status === 200) {
      Message.success(res);
      getKlipz(currentPage);
      setOpenModal((pre) => !pre);
    } else Message.error(res);
    setModalLoading(false);
  };
  const handleConfirm = () => {
    if (modalName === "delete") handleDelete();
    if (modalName === "archive") handleArchive();
  };

  const navigateEventRequest = () => {
    navigate("/user-management/klipz-archive", {
      state: {
        userId
      }
    });
  };
  const handleDelete = async () => {
    setModalLoading(true);
    const params = new URLSearchParams();
    params.append("content_id", contentDetail?._id);
    params.append("type", 2);
    const res = await deleteContentAPI(params);
    if (res?.status === 200) {
      Message.success(res);
      getKlipz(currentPage);
    } else Message.error(res);
    setOpenModal((pre) => !pre);
    setModalLoading(false);
  };
  const handleModalOpen = () => setOpenModal((pre) => !pre);

  const klipzContent = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 60,
      render: (_, record, index) => `${index + 1}`
    },
    {
      title: "Thumbnail",
      key: "img",
      align: "center",
      width: 90,
      render: (_, record) => <img src={record?.thumbnail} height="50px" width="auto" alt="" />
    },
    {
      title: "created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 90,
      render: (_, record) => moment(record?.createdAt).format("hh:mm a")
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "event_title",
      align: "center",
      width: 140,
      render: (_, record) => (
        <div className="max-w-[160px] overflow-hidden text-center mx-auto" style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
          {record?.title}
        </div>
      )
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 140,
      render: (_, record) => (
        <div className="max-w-[160px] overflow-hidden text-center mx-auto" style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
          {record?.description}
        </div>
      )
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="flex min-w-[84px] justify-between items-center">
            <Link
              to="/user-management/content-detail"
              state={{ contentId: record?._id, showExtraInfo: true }}
              className="underline underline-offset-[3px] text-[#9E9E9E]">
              View
            </Link>
            <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
            <div
              className="cursor-pointer"
              onClick={() => handleParticularModal("delete", record)}
              aria-hidden>
              Delete
            </div>
            <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
            <div
              className="cursor-pointer"
              onClick={() => handleParticularModal("archive", record)}
              aria-hidden>
              Archive
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    getKlipz(defaultPageNo);
  }, [getKlipz]);

  return {
    viewAllListing,
    currentPage,
    tableLoader,
    totalPage,
    handleSearchData,
    handlePageChange,
    klipzContent,
    openModal,
    modalLoading,
    handleConfirm,
    modalName,
    handleModalOpen,
    navigateEventRequest
  };
};

export default useViewAllKlipz;

