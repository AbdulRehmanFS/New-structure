import Message from "@components/Message";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { archiveContentAPI, archiveEventContentAPI } from "@services/api/archive";
import { getCreatorEventsApi, getCreatorPodcastsApi } from "@services/api/userManagement";
import { errorMessage } from "@utils/commonSection";
import { defaultPageNo, pageLimit } from "@utils/constant";

const useUserArchive = (userId, type) => {
  const [openModal, setOpenModal] = useState(false);
  const [archiveContent, setarchiveContent] = useState();
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [contentDetail, setContentDetail] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const modalName = "unarchive";

  const handleArchive = async () => {
    setModalLoading(true);
    const payload = {
      content_id: contentDetail?._id,
      status: false
    };
    let res;
    if (type == "podcast") {
      res = await archiveContentAPI(payload);
    } else if (type == "event") {
      res = await archiveEventContentAPI(payload);
    } else {
      res = await archiveContentAPI(payload);
    }

    if (res?.status === 200) {
      Message.success(res);
      getKlipz(currentPage);
      setOpenModal((pre) => !pre);
    } else Message.error(res);
    setModalLoading(false);
  };

  const handleParticularModal = (name, detail) => {
    setContentDetail(detail);
    setOpenModal((pre) => !pre);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getKlipz(pageNumber);
  };

  const getKlipz = useCallback(
    async (page) => {
      if (!userId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const params = new URLSearchParams();
      params.append("user_id", userId);
      params.append("page", page);
      params.append("limit", pageLimit);
      if (type == "event") {
        params.append("type", 1);
      } else if (type == "podcast") {
        params.append("type", 1);
      } else {
        params.append("type", 3);
      }

      params.append("is_archive", true);
      let res;
      if (type == "podcast") {
        res = await getCreatorPodcastsApi(params);
      } else if (type === "event") {
        res = await getCreatorEventsApi(params);
      } else {
        res = await getCreatorPodcastsApi(params);
      }

      if (res?.status === 200) {
        setarchiveContent(res?.data);
        setTotalPage(res?.count);
      } else errorMessage(res?.message);

      setLoading(false);
    },
    [userId, type]
  );

  useEffect(() => {
    getKlipz(defaultPageNo);
  }, [getKlipz]);

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
      render: (_, record) => (
        <img
          src={type == "event" ? record?.cover_photo_url : record?.thumbnail}
          height="50px"
          width="auto"
          alt=""
        />
      )
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
        <div className="max-w-[160px] mx-auto overflow-hidden text-center" style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
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
        <div className="max-w-[160px] mx-auto overflow-hidden text-center" style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
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
            <div
              className="cursor-pointer"
              onClick={() => handleParticularModal("archive", record)}
              aria-hidden>
              Unarchive
            </div>
          </div>
        </div>
      )
    }
  ];

  return {
    openModal,
    archiveContent,
    klipzContent,
    modalLoading,
    loading,
    totalPage,
    currentPage,
    modalName,
    handleArchive,
    handlePageChange,
    handleParticularModal
  };
};

export default useUserArchive;

