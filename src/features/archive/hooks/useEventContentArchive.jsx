import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import moment from "moment";
import { errorMessage } from "@utils/commonSection";
import { defaultPageNo, pageLimit } from "@utils/constant";
import { getContentListingApi, getEventListingApi } from "@services/api/eventContent";
import { archiveEventContentAPI } from "@services/api/archive";

const useEventContentArchive = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [archiveData, setArchiveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [modalName, setModalName] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const { type } = useLocation()?.state ?? { type: "Events" };
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

  const getData = useCallback(
    async (page) => {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("listing_type", 1);
      params.append("page", page);
      params.append("limit", pageLimit);
      params.append("is_archive", true);
      if (searchText) {
        params.append("search", searchText);
      }

      if (type === "Events") {
        params.append("type", 1);
        const res = await getEventListingApi(params);
        if (res.status === 200) {
          setArchiveData(res.data);
          setTotalPage(res.count);
        } else errorMessage(res.message);
      } else {
        params.append("type", 2);
        const res = await getContentListingApi(params);
        if (res.status === 200) {
          setArchiveData(res.data);
          setTotalPage(res.count);
        } else errorMessage(res.message);
      }
      setLoading(false);
    },
    [type, searchText]
  );

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
      title: type === "Events" ? " Event Title" : "Content Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150,
      render: (_, record) => (
        <div className="text-white truncate max-w-[150px]" title={record.title}>
          {record.title}
        </div>
      )
    },
    {
      title: "Created By",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 120,
      render: (_, record) => (
        <div
          className="text-white cursor-pointer hover:underline"
          onClick={() => navigateDetailView(record)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigateDetailView(record);
            }
          }}
        >
          {record?.user_account?.user_name}
        </div>
      )
    },
    {
      title: type === "Events" ? "Date Posted" : "Event Date",
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
        <div className="flex justify-center items-center border-b border-[rgba(255,255,255,0.1)] w-fit mx-auto">
          <div
            className="text-white cursor-pointer hover:underline px-2"
            onClick={(e) => {
              e.stopPropagation();
              handleParticularModal("unarchive", record);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                handleParticularModal("unarchive", record);
              }
            }}
            role="button"
            tabIndex={0}
          >
            Unarchive
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    getData(defaultPageNo);
  }, [getData]);
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

