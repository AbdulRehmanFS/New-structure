import Message from "component/messages";
import moment from "moment";
import { EllipseText, Line, Text, ViewerAction } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { archiveContentAPI } from "service/api/archive";
import { deleteContentAPI } from "service/api/contentApproval";

import { recordScheduleContentApi }  from "service/api/eventContent";
import { errorMessage } from "util/commonSection";
import { defaultPageNo, pageLimit } from "util/constant";
import { theme } from "util/theme";
const useContentEpisodes=()=>{
const [recordedContent,setRecordedContent]=useState();
const [loading, setLoading] = useState(false);
const [totalPage, setTotalPage] = useState(0);
const [modalLoading, setModalLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(defaultPageNo);
const navigate = useNavigate();
const [modalName, setModalName] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [contentDetail, setContentDetail] = useState(null);
const { id,time } = useLocation()?.state || {};


const handleBack=()=>{
  navigate(-1)
}

const navigateDetailSection = (record) =>{
    navigate("/events-contents/record-content-details", {
        state: { contentId: record?._id, }
      });
}


    const getContantLisitng = useCallback(
        async (pageNo) => {
          setLoading(true);
          const params = new URLSearchParams();
          params.append("scheduled_id", id);
          params.append("page", pageNo);
          params.append("limit", pageLimit);  
          const res = await recordScheduleContentApi(params);
          if (res?.status === 200) {
            const { count = 0, data = [] } = res;
            setTotalPage(count);
            setRecordedContent(data)
          } else errorMessage(res?.message);
          setLoading(false);
        },
        []
      );
      const navigateArchive=()=>{
       
        navigate("/events-contents/archive-episdoes",{
          state:{
            id:id
          }
        })

      }

      const handleModalOpen = () => setOpenModal((pre) => !pre);
      const handleParticularModal = (name, detail) => {
        setModalName(name);
        setContentDetail(detail);
        setOpenModal((pre) => !pre);
      };

      const handleConfirm = () => {
        if (modalName === "delete") handleDelete();
        if (modalName === "archive") handleArchive();
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
        getContantLisitng(currentPage);
          setOpenModal((pre) => !pre);
        } else Message.error(res);
        setModalLoading(false);
      };
    

      const handleDelete = async () => {
        setModalLoading(true);
        const params = new URLSearchParams();
        params.append("content_id", contentDetail?._id);
        const res = await deleteContentAPI(params);
        if (res?.status === 200) {
          Message.success(res);
          getContantLisitng(currentPage);
          setOpenModal((pre) => !pre);
        } else errorMessage(res);
        setModalLoading(false);
      };

     

      const column = [
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
          render: (_, record) => <img src={record?.thumbnail} height="50px" width="auto" alt="" />
        },
        {
          title: "Content Title",
          dataIndex: "title",
          key: "podcast_title",
          align: "center",
          width: 160,
          render: (_, record) => (
            <EllipseText onClick={() => navigateDetailSection(record)} style={{ cursor: "pointer" }}>
              {record?.title}
            </EllipseText>
          )
        },
        {
          title: "Created By",
          dataIndex: "user_name",
          key: "created_by",
          align: "center",
          width: 120,
          render: (_, record) => (
            <Link
              to="/events-contents/contents-detail"
              state={{ podcastId: record?._id, showGraph: true }}
              className="view">
              <Text color={theme.fieldBg}>{record?.user_account?.user_name}</Text>
            </Link>
          )
        },
        {
          title: "Content Type",
          dataIndex: "content_type ",
          key: "content_type ",
          align: "center",
          width: 120,
          render: (_, record) => <div>{record?.content_type ?? "---"}</div>
        },
        {
          title: "Content Date",
          dataIndex: "createdAt",
          key: "createdAt",
          align: "center",
          width: 100,
          render: (_, record) => moment(record?.createdAt.split("T")[0]).format("DD-MMM-YY")
        },
        {
          title: "Time",
          dataIndex: "event_time",
          key: "time",
          align: "center",
          width: 80,
          render: (_, record) => record?.createdAt &&moment.unix(time).format("hh:mm a")
        },
       
 
        {
          title: "Action",
          key: "action",
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

      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        getContantLisitng(pageNumber);
      };

      useEffect(() => {
        setCurrentPage(1);
        getContantLisitng(defaultPageNo);
      }, [getContantLisitng]);

      return{
        recordedContent,
        column,
        loading,
        totalPage,
        currentPage,
        handlePageChange,
        handleBack,
        modalLoading,
        modalName,
        openModal,
        handleConfirm,
        handleModalOpen,
        navigateArchive
       
      }
    
}

export default useContentEpisodes;