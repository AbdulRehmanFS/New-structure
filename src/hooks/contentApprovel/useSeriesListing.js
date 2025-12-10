import { Image, message, Tooltip } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

import Message from "component/messages";
import { EllipseText, Line, Text } from "page/style";
import { theme } from "util/theme";
import styled from "styled-components";
import { contentRequestType, defaultPageNo, pageLimit } from "util/constant";
import { deleteSeriesAPI, getSeriesRequestApi } from "service/api/contentApproval";
import { archiveSeriesContentAPI } from "service/api/archive";

const useSeriesListing = ({ searchText = "" }) => {
  const [userListing, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [seriesDetail, setSeriesDetail] = useState(null);
  const navigate = useNavigate();

  const navigateRequestSection = (value) => {
    if (value === 1)
      navigate("/creator/archive", {
        state: { type: contentRequestType.series }
      });
    else
      navigate("/creator/request-list", {
        state: { type: contentRequestType.series }
      });
  };

  const getRequestListing = useCallback(
    async (page) => {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", pageLimit);
      if (searchText) {
        params.append("search", searchText);
      }
      setLoading(true);
      const res = await getSeriesRequestApi(params);
      if (res?.status === 200) {
        const { data = [], count = 0 } = res;
        setUserList(data);
        setTotalPage(count);
      } else message.error(res?.message || "Something went wrong");
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

  const handleModalOpen = () => setOpenModal((pre) => !pre);

  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setSeriesDetail(detail);
    setOpenModal((pre) => !pre);
  };

  const handleDelete = async () => {
    setModalLoading(true);
    const params = new URLSearchParams();
    params.append("series_id", seriesDetail?._id);
    const res = await deleteSeriesAPI(params);
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
      series_id: seriesDetail?._id,
      status: true
    };
    const res = await archiveSeriesContentAPI(payload);
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
    navigate("/creator/content-listing", {
      state: { contentId: record?._id, type: "series" }
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
      width: 90,
      render: (_, record) => <Image src={record?.thumbnail} height="50px" width="auto" alt="" />
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150,
      render: (_, record) => <Tooltip title={record?.title}> <EllipseText className="title" onClick={()=>navigateDetailSection(record)} cursor="pointer">{record?.title}</EllipseText> </Tooltip>
    },
    {
      title: "Created By",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 120,
      render: (_, record) => (
        
          <Text>{record?.user_name}</Text>
      
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
      title: "Episode",
      dataIndex: "episodeCount",
      key: "episodeCount",
      align: "center",
      width: 100
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
      title: "Action",
      dataIndex: "content_url",
      key: "content_url",
      align: "center",
      width: 180,
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
  return {
    navigateRequestSection,
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

export default useSeriesListing;

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
