import { useCallback, useEffect, useState } from "react";
import Message from "component/messages";
import { archiveContentAPI } from "service/api/archive";
import { deleteContentAPI, getContentAllViewApi } from "service/api/contentApproval";
import { Image, message } from "antd";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { theme } from "util/theme";
import styled from "styled-components";
import { defaultPageNo, pageLimit } from "util/constant";
import { EllipseText, Line, Text } from "page/style";

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

  const getRequestListing = useCallback(async (page) => {
    const params = new URLSearchParams();
    params.append("series_id", contentId);
    params.append("type", type);
    params.append("listing_type", "approved");
    params.append("limit", pageLimit);
    params.append("page", page);
    params.append("search", searchText);
    setLoading(true);
    const ress = await getContentAllViewApi(params);
    if (ress?.status === 200) {
      const { data = [], count = 0 } = ress;
      setUserList(data);
      setTotalPage(count);
    } else message.error(ress?.message || "Something went wrong");
    setLoading(false);
  },[searchText,contentId,type]);

  const handlePageChange = (pageNumber) => {
    getRequestListing(pageNumber);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getRequestListing(defaultPageNo);
    setCurrentPage(1);
  }, [getRequestListing]);

  const handleModalOpen = () => setOpenModal((pre) => !pre);

  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setContentDetail(detail);
    setOpenModal((pre) => !pre);
  };

  const handleDelete = async () => {
    setModalLoading(true);
    const params = new URLSearchParams();
    params.append("content_id", contentDetail?._id);
    const res = await deleteContentAPI(params);
    if (res?.status === 200) {
      Message.success(res);
      getRequestListing(currentPage);
    } else Message.error(res);
    setOpenModal((pre) => !pre);
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
      Message.success(res);
      getRequestListing(currentPage);
      setOpenModal((pre) => !pre);
    } else Message.error(res);
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
      render: (_, record) => <EllipseText className="title" onClick={()=>navigateDetailSection(record)} cursor="pointer">{record.title}</EllipseText>
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
