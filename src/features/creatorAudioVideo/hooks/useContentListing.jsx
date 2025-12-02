import { useCallback, useEffect, useState } from "react";
import { Image, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { defaultPageNo, pageLimit, modalIcons, modalSubheading } from "@utils/constant";
import { theme } from "@utils/theme";
import { deleteContentAPI, getContentRequestApi } from "../services/contentApproval.api";
import { archiveContentAPI } from "../services/archive.api";
import { errorMessage } from "@utils/helpers";
import { EllipseText, Line, Text } from "@features/userManagement/utils/style";

const useContentListing = () => {
  const [userListing, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const { contentId = null, type = "" } = useLocation()?.state || {};
  const navigate = useNavigate();

  const getRequestListing = useCallback(
    async (page) => {
      const params = new URLSearchParams();
      params.append("series_id", contentId);
      params.append("type", type);
      params.append("listing_type", "approved");
      params.append("limit", pageLimit);
      params.append("page", page);
      if (searchText) {
        params.append("search", searchText);
      }
      setLoading(true);
      const res = await getContentRequestApi(params);
      if (res?.status === 200) {
        const { data = [], count = 0 } = res;
        setUserList(data);
        setTotalPage(count);
      } else {
        errorMessage(res?.message || "Something went wrong");
      }
      setLoading(false);
    },
    [searchText, contentId, type]
  );

  const handlePageChange = (pageNumber) => {
    getRequestListing(pageNumber);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getRequestListing(defaultPageNo);
    setCurrentPage(1);
  }, [getRequestListing]);

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

  const navigateDetailSection = (record) =>
    navigate("/creator/content-detail", { state: { contentId: record?._id } });

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
      render: (_, record) => <Image src={record?.thumbnail} height="50px" width="auto" alt="" />
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150,
      render: (_, record) => (
        <EllipseText className="title" onClick={() => navigateDetailSection(record)} cursor="pointer">
          {record.title}
        </EllipseText>
      )
    },
    {
      title: "Created By",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 120,
      render: (_, record) => (
        <Link to="/creator/content-detail" state={{ contentId: record?._id }}>
          <Text>{record?.user_account?.user_name}</Text>
        </Link>
      )
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 50
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      align: "center",
      width: 120
    },
    {
      title: "Date Posted",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 100,
      render: (_, record) => moment(record?.createdAt).format("DD-MMM-YY")
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdTime",
      align: "center",
      width: 100,
      render: (_, record) => moment(record?.createdAt).format("hh:mm a")
    },
    {
      title: "Action",
      dataIndex: "content_url",
      key: "content_url",
      align: "center",
      width: 160,
      render: (_, record) => (
        <div className="flex justify-center items-center border-b-2 w-fit mx-auto" style={{ borderColor: theme.grey2 }}>
          <div
            className="cursor-pointer"
            onClick={() => navigateDetailSection(record)}
            aria-hidden>
            View
          </div>
          <Line height="16px" borderColor={theme.grey2} />
          <div
            className="cursor-pointer"
            onClick={() => handleParticularModal("delete", record)}
            aria-hidden>
            Delete
          </div>
          <Line height="16px" borderColor={theme.grey2} />
          <div
            className="cursor-pointer"
            onClick={() => handleParticularModal("archive", record)}
            aria-hidden>
            Archive
          </div>
        </div>
      )
    }
  ];

  const handleSearchData = (e) => setSearchText(e);

  return {
    handleSearchData,
    navigate,
    contentId,
    columns,
    userListing,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    handleConfirm,
    modalName,
    modalLoading
  };
};

export default useContentListing;

