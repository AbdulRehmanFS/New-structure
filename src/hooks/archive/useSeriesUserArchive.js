import Message from "component/messages";
import moment from "moment";
import { EllipseText, Text, ViewerAction } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { archiveSeriesContentAPI } from "service/api/archive";
import { getSeriesRequestApi } from "service/api/contentApproval";
import { errorMessage } from "util/commonSection";
import { defaultPageNo, pageLimit } from "util/constant";

const useSeriesUserArchive=(userId)=>{
    const [contentDetail, setContentDetail] = useState(null);
    const [viewAllListing, setViewAllListing] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(defaultPageNo);
    const [openModal, setOpenModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [tableLoader,setTableLoader]=useState()
    const getListing = useCallback(async (page) => {
        setTableLoader(true);
        const params = new URLSearchParams();
        params.append("user_id", userId);
        params.append("page", page);
        params.append("is_archive", true);
        params.append("limit", pageLimit);
        const res = await getSeriesRequestApi(params);
        if (res?.status === 200) {
          setViewAllListing(res?.data);
          setTotalPage(res?.count);
        } else errorMessage(res?.message || "Something went wrong");
        setTableLoader(false);
      },[userId]);

      const modalName="unarchive"

      
        const handleUnarchive = async () => {
            setModalLoading(true);
            const payload = {
              series_id: contentDetail?._id,
              status: false
            };
            const res = await archiveSeriesContentAPI(payload);
            if (res?.status === 200) {
              Message.success(res);
              getListing(currentPage);
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
    getListing(pageNumber);
  };



  useEffect(() => {
    getListing(defaultPageNo);
  }, [getListing]);

    const seriesColumns = [
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
          title: "Created By",
          dataIndex: "key",
          key: "key",
          align: "center",
          width: 120,
          render: (_, record) => (
            <Link to="/creator/content-listing" state={{ contentId: record?._id, type: "series" }}>
              <Text>{record?.user_name}</Text>
            </Link>
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

      return{
        currentPage,
         totalPage,
         viewAllListing,
         openModal,
         modalLoading,
         modalName,
         seriesColumns,
         tableLoader,
         handleUnarchive,
         handleParticularModal,
         handlePageChange
      }

}

export default useSeriesUserArchive