import { useCallback, useEffect, useState } from "react";
import { Image, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { contentRequestType, defaultPageNo, pageLimit, modalIcons, modalSubheading } from "@utils/constant";
import { archiveContentAPI, archiveSeriesContentAPI } from "../services/archive.api";
import { getContentRequestApi, getSeriesRequestApi } from "../services/contentApproval.api";
import { errorMessage } from "@utils/helpers";

const useArchive = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [totalPage, setTotalPage] = useState(0);
  const [archiveData, setArchiveData] = useState([]);
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

  const handleModalOpen = () => setOpenModal((prev) => !prev);

  const handleParticularModal = (name, detail) => {
    setModalName(name);
    setContentDetail(detail);
    setOpenModal((prev) => !prev);
  };

  const navigateDetailView = (record) =>
    navigate("/creator/content-detail", {
      state: { contentId: record?._id, showGraph: false }
    });

  const getData = useCallback(
    async (page) => {
      setLoading(true);
      if (type === "series") {
        const param = new URLSearchParams();
        param.append("page", page);
        param.append("limit", pageLimit);
        param.append("is_archive", true);
        if (searchText) param.append("search", searchText);
        const res = await getSeriesRequestApi(param);
        if (res?.status === 200) {
          setArchiveData(res?.data || []);
          setTotalPage(res?.count || 0);
        } else {
          errorMessage(res?.message || "Failed to fetch archive data");
        }
      } else {
        const param = new URLSearchParams();
        if (type === "episode") param.append("series_id", seriesId);
        else param.append("type", type);
        param.append("listing_type", "approved");
        param.append("page", page);
        param.append("limit", pageLimit);
        param.append("is_archive", true);
        if (searchText) param.append("search", searchText);
        const res = await getContentRequestApi(param);
        if (res?.status === 200) {
          setArchiveData(res?.data || []);
          setTotalPage(res?.count || 0);
        } else {
          errorMessage(res?.message || "Failed to fetch archive data");
        }
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
      if (res?.status === 200) {
        message.success(res?.message || "Series unarchived successfully");
        getData(currentPage);
        setOpenModal((prev) => !prev);
      } else {
        errorMessage(res?.message || "Failed to unarchive series");
      }
    } else {
      const payload = {
        content_id: contentDetail?._id,
        status: false
      };
      const res = await archiveContentAPI(payload);
      if (res?.status === 200) {
        message.success(res?.message || "Content unarchived successfully");
        getData(currentPage);
        setOpenModal((prev) => !prev);
      } else {
        errorMessage(res?.message || "Failed to unarchive content");
      }
    }
    setModalLoading(false);
  };

  useEffect(() => {
    getData(defaultPageNo);
  }, [getData]);

  const title = {
    audio: "Archive Audio",
    video: "Archive Video",
    series: "Archive Series",
    klipz: "Archive Klipz"
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
      width: 105,
      render: (_, record) => (
        <Image src={record?.thumbnail} height="50px" width="auto" alt="" />
      )
    },
    {
      title: "Created By",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      width: 120,
      render: (_, record) => (
        <span
          onClick={() => navigateDetailView(record)}
          className="cursor-pointer text-white hover:underline"
        >
          {type === "series" ? record?.user_name : record?.user_account?.user_name}
        </span>
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
          onClick={() => navigateDetailView(record)}
          className="cursor-pointer text-white hover:underline truncate block"
        >
          {record.title}
        </span>
      )
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
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center items-center gap-2 border-b border-[rgba(255,255,255,0.1)] w-fit mx-auto">
          <span
            className="cursor-pointer text-white hover:underline"
            onClick={() => handleParticularModal("unarchive", record)}
          >
            Unarchive
          </span>
        </div>
      )
    }
  ];

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
    handlePageChange,
    modalName,
    title: title[type] || "Archive",
    type,
    modalIcons: modalIcons[modalName],
    modalSubheading: modalSubheading[modalName]
  };
};

export default useArchive;

