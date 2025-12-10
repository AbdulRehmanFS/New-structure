import { EllipseText } from "page/style";
import Message from "component/messages";
import { archiveContentAPI, archiveSeriesContentAPI } from "service/api/archive";
import { getContentRequestApi, getSeriesRequestApi } from "service/api/contentApproval";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { errorMessage } from "util/commonSection";
import { contentRequestType, defaultPageNo, pageLimit } from "util/constant";
import styled from "styled-components";

const useArchive = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [totalPage, setTotalPage] = useState(0);
  const [archiveData, setArchiveData] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const navigate = useNavigate();
  const { type = contentRequestType.audio, seriesId } = useLocation()?.state || {};

  

  const handleSearchData = (e) => {
    setCurrentPage(1);
    setSearchText(e);
  };

  const handleModalOpen = () => setOpenModal((pre) => !pre);

  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setContentDetail(detail);
    setOpenModal((pre) => !pre);
  };

  const navigateDetailView = (record) =>
    navigate("/creator/content-detail", {
      state: { contentId: record?._id, showGraph: false }
    });

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
      width: 105,
      render: (_, record) => (
        <img src={record?.thumbnail} height="50px" width="100%" alt="" className="thumbnail" />
      )
    },
    {
      title: "Created By",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 120,
      render: (_, record) => (
        <div className="creator-name" onClick={() => navigateDetailView(record)} aria-hidden>
          {type === "series" ? record?.user_name : record?.user_account?.user_name}
        </div>
      )
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150,
      render: (_, record) => <EllipseText className="title">{record.title}</EllipseText>
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
      key: "createdAt",
      align: "center",
      width: 100,
      render: (_, record) => moment(record?.createdAt).format("hh:mm a")
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <ViewerAction>
          {" "}
          <div
            className="action-icon"
            onClick={() => handleParticularModal("unarchive", record)}
            aria-hidden>
            Unarchive
          </div>{" "}
        </ViewerAction>
      )
    }
  ];

  

  const getData = useCallback(
    async (page) => {
      setLoading(true);
      if (type === "series") {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", pageLimit);
        params.append("is_archive", true);
        const res = await getSeriesRequestApi(params);
        if (res.status === 200) {
          setArchiveData(res?.data);
          setTotalPage(res?.count);
        } else errorMessage(res.message);
      } else {
        const params = new URLSearchParams();
        if (type === "episode") params.append("series_id", seriesId);
        else params.append("type", type);
        params.append("listing_type", "approved");
        params.append("page", page);
        params.append("limit", pageLimit);
        params.append("is_archive", true);
        if (searchText) params.append("search", searchText);
        const res = await getContentRequestApi(params);
        if (res.status === 200) {
          setArchiveData(res?.data);
          setTotalPage(res?.count);
        } else errorMessage(res.message);
      }
      setLoading(false);
    },
    [searchText, seriesId, type]
  );

  const handlePageChange = (pageNumber) => {
    getData(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleConfirm = async () => {
    setModalLoading(true);
    if (type === "series") {
      const payload = {
        series_id: contentDetail?._id,
        status: false
      };
      const res = await archiveSeriesContentAPI(payload);
      if (res.status === 200) {
        Message.success(res);
        getData(currentPage);
        setOpenModal((pre) => !pre);
      } else errorMessage(res.message);
    } else {
      const payload = {
        content_id: contentDetail?._id,
        status: false
      };
      const res = await archiveContentAPI(payload);
      if (res?.status === 200) {
        Message.success(res);
        getData(currentPage);
        setOpenModal((pre) => !pre);
      } else Message.error(res);
    }
    setModalLoading(false);
  };

  useEffect(() => {
    getData(defaultPageNo);

   
  }, [searchText, getData]);

  const title = {
    audio: "Archive Audio",
    video: "Archive Video",
    series: "Archive Series",
    klipz:"Archive Klipz"
  };

  return {
    columns,
    loading,
    openModal,
    handleModalOpen,
    handleConfirm,
    modalLoading,
    totalPage,
    currentPage,
    archiveData,
    handleSearchData,
    pageLimit,
    handlePageChange,
    modalName,
    title,
    type
  };
};

export default useArchive;

const ViewerAction = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid;
  .action-icon {
    cursor: pointer;
  }
`;
