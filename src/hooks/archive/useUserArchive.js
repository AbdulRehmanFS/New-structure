import Message from "component/messages";
import moment from "moment";
import { EllipseText, ViewerAction } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { archiveContentAPI, archiveEventContentAPI } from "service/api/archive";
import { getCreatorEventsApi, getCreatorPodcastsApi } from "service/api/usermanagement";
import { errorMessage } from "util/commonSection";
import { defaultPageNo, pageLimit } from "util/constant";

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
    if(type=="podcast"){

      res = await archiveContentAPI(payload);
    }
    else if(type=="event"){
      res=await archiveEventContentAPI(payload)
    }
    else{
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
      }
      else if (type === "event") {
        res = await getCreatorEventsApi(params);
      }
      else{
        res = await getCreatorPodcastsApi(params);
      }

      if (res?.status === 200) {
        setarchiveContent(res?.data);
        setTotalPage(res?.count);
      } else errorMessage(res?.message);

      setLoading(false);
    },
    [userId,type]
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
          <div
            className="action-icon"
            onClick={() => handleParticularModal("archive", record)}
            aria-hidden>
            Unarchive
          </div>
        </ViewerAction>
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
