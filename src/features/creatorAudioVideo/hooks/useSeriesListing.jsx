import { useCallback, useEffect, useState } from "react";
import { Image, message, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { contentRequestType, defaultPageNo, pageLimit, modalIcons, modalSubheading } from "@utils/constant";
import { theme } from "@utils/theme";
import { deleteSeriesAPI, getSeriesRequestApi } from "../services/contentApproval.api";
import { archiveSeriesContentAPI } from "../services/archive.api";
import { errorMessage } from "@utils/helpers";

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
      const param = new URLSearchParams();
      param.append("page", page);
      param.append("limit", pageLimit);
      if (searchText) {
        param.append("search", searchText);
      }
      setLoading(true);
      const res = await getSeriesRequestApi(param);
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

  const handleModalOpen = () => setOpenModal((prev) => !prev);

  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setSeriesDetail(detail);
    setOpenModal((prev) => !prev);
  };

  const handleDelete = async () => {
    setModalLoading(true);
    const params = new URLSearchParams();
    params.append("series_id", seriesDetail?._id);
    const res = await deleteSeriesAPI(params);
    if (res?.status === 200) {
      message.success(res?.message || "Series deleted successfully");
      getRequestListing(currentPage);
      setOpenModal((prev) => !prev);
    } else {
      errorMessage(res?.message || "Failed to delete series");
    }
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
      message.success(res?.message || "Series archived successfully");
      getRequestListing(currentPage);
      setOpenModal((prev) => !prev);
    } else {
      errorMessage(res?.message || "Failed to archive series");
    }
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
        <Tooltip title={record?.title}>
          <span
            onClick={() => navigateDetailSection(record)}
            className="cursor-pointer text-white hover:underline truncate block"
          >
            {record?.title}
          </span>
        </Tooltip>
      )
    },
    {
      title: "Created By",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      width: 120,
      render: (_, record) => <span className="text-white">{record?.user_name}</span>
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 50,
      render: (_, record) => <span className="text-white">{record?.type}</span>
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
      title: "Episode",
      dataIndex: "episodeCount",
      key: "episodeCount",
      align: "center",
      width: 100,
      render: (_, record) => <span className="text-white">{record?.episodeCount}</span>
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 180,
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
    modalLoading,
    modalIcons: modalIcons[modalName],
    modalSubheading: modalSubheading[modalName]
  };
};

export default useSeriesListing;

