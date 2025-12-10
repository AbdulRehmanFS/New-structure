import { useCallback, useEffect, useState} from "react";
import { Image, message } from "antd";
import moment from "moment";
import Message from "component/messages";
import { contentRequestType, defaultPageNo, pageLimit } from "util/constant";
import { theme } from "util/theme";
import { EllipseText, Line, Text, ViewerAction } from "page/style";
import { deleteContentAPI, getContentRequestApi } from "service/api/contentApproval";
import { useNavigate } from "react-router-dom";
import { archiveContentAPI } from "service/api/archive";


const useKlipzListing=({searchText =""})=>{
  const [userListing, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [contentDetail, setContentDetail] = useState(null);
  const navigate = useNavigate();
    const navigateRequest = (value) => {
        if (value === 1) navigate("/creator/archive",{ state: { type: contentRequestType.klipz }});
        else
          navigate("/creator/request-list", {
            state: { type: contentRequestType.klipz }
          });
      };
    
      const getRequestListing = useCallback(
        async (page) => {
          setLoading(true);
          const params = new URLSearchParams();
          params.append("type", contentRequestType.klipz);
          params.append("listing_type", "approved");
          params.append("page", page);
          params.append("limit", pageLimit);
          if (searchText) {
            params.append("search", searchText);
          }
          const res = await getContentRequestApi(params);
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
    
      const navigateDetailSection = (record) =>
        navigate("/creator/content-detail", { state: { contentId: record?._id } });
    
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
          setOpenModal((pre) => !pre);
        } else Message.error(res);
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
          render: (_, record) => (
          
             
              <EllipseText onClick={()=>navigateDetailSection(record)} cursor={"pointer"} className="title">{record.title}</EllipseText>
           
          )
        },
        {
          title: "Created By",
          dataIndex: "user_name",
          key: "key",
          align: "center",
          width: 120,
          render: (_, record) => (
      
              <Text>{record?.user_account?.user_name}</Text>
           
          )
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
    
      return {
        userListing,
        loading,
        totalPage,
        currentPage,
        handlePageChange,
        openModal,
        handleModalOpen,
        modalName,
        modalLoading,
        handleConfirm,
        navigateRequest,
        columns
      };
}

export default useKlipzListing