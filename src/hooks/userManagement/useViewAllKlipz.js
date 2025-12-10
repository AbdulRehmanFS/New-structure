import Message from "component/messages";
import moment from "moment";
import { EllipseText, Line, ViewerAction } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { archiveContentAPI } from "service/api/archive";
import { deleteContentAPI } from "service/api/contentApproval";
import { getCreatorPodcastsApi } from "service/api/usermanagement";
import { errorMessage } from "util/commonSection";
import { defaultPageNo, pageLimit } from "util/constant";
import { theme } from "util/theme";

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
    params.append("type", 2); // type 1 => event, type 2 => scheduled content
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
      render: (_, record) => <EllipseText className="title">{record?.title}</EllipseText>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 140,
      render: (_, record) => <EllipseText className="title">{record?.description}</EllipseText>
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <ViewerAction className="action">
          <Link
            to="/user-management/content-detail"
            state={{ contentId: record?._id, showExtraInfo: true }}
            className="view">
            View
          </Link>
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
