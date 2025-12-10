import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import moment from "moment";
import { EllipseText } from "page/style";
import { errorMessage } from "util/commonSection";
import { defaultPageNo, pageLimit } from "util/constant";
import styled from "styled-components";
import { getContentListingApi, getEventListingApi } from "service/api/eventContent";
import { archiveEventContentAPI } from "service/api/archive";

const useEventContentArchive = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [archiveData, setArchiveData] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [modalName, setModalName] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const { type } = useLocation()?.state ?? null;
  const navigate = useNavigate();

  const handleSearchData = (e) => {
    setCurrentPage(1);
    setSearchText(e);
  };

  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setContentDetail(detail);
    setOpenModal((pre) => !pre);
  };

  const handleModalOpen = () => setOpenModal((pre) => !pre);

  const getData = useCallback(async (page) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (type === "Events") params.append("listing_type", 1);
    else params.append("listing_type", 1);
    params.append("page", page);
    params.append("limit", pageLimit);
    params.append("is_archive", true);
     
    if (type === "Events") {
      params.append("type",1) //. 1=> event, 2=> content
      const res = await getEventListingApi(params);
      if (res.status === 200) {
        setArchiveData(res.data);
        setTotalPage(res.count);
      } else errorMessage(res.message);
    } else {
      params.append("type",2) //. 1=> event, 2=> content
      const res = await getContentListingApi(params);
      if (res.status === 200) {
        setArchiveData(res.data);
        setTotalPage(res.count);
      } else errorMessage(res.message);
    }
    setLoading(false);
  },[type]);

  const handleConfirm = async () => {
    setModalLoading(true);
    const payload = {
      content_id: contentDetail?._id,
      status: false
    };
  
    const res = await archiveEventContentAPI(payload);
    if (res.status === 200) {
      message.success(res.message);
      getData(currentPage);
      setOpenModal((pre) => !pre);
    } else errorMessage(res.message);
    setModalLoading(false);
  };

  const navigateDetailView = (record) =>
    navigate("/creator/content-detail", {
      state: { contentId: record?._id, showGraph: false }
    });

  const handlePageChange = (pageNumber) => {
    getData(pageNumber);
    setCurrentPage(pageNumber);
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
      title: <> {type === "Events" ? " Event Title" : "Content Title"} </>,
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150,
      render: (_, record) => <EllipseText className="title">{record.title}</EllipseText>
    },
    {
      title: "Created By",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 120,
      render: (_, record) => (
        <div className="creator-name" onClick={() => navigateDetailView(record)} aria-hidden>
          { record?.user_account?.user_name }
        </div>
      )
    },
    {
      title: <> {type === "Events" ? "Date Posted" : "Event Date"} </>,
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
    ...(type === "Events"
      ? [
          {
            title: "Venue",
            dataIndex: "venue",
            key: "venue",
            align: "center",
            width: 120
          }
        ]
      : []),
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

  useEffect(() => {
    getData(defaultPageNo);
  }, [searchText,getData]);
  return {
    modalLoading,
    modalName,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    handleConfirm,
    columns,
    archiveData,
    type,
    handleSearchData
  };
};

export default useEventContentArchive;

const ViewerAction = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid;
  .action-icon {
    cursor: pointer;
  }
`;
