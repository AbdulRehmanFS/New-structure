import { useCallback, useEffect, useState } from "react";
import { getContentRequestApi, updateContentRequestApi } from "service/api/contentApproval";
import { theme } from "util/theme";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { GreenOkIcon, RedCrossIcon } from "util/svgFile";
import { Image, message } from "antd";
import { EllipseText, Line, ViewerAction } from "page/style";
import { defaultPageNo, pageLimit } from "util/constant";
const useRequestSection = ({ type, selectedValue, otherReason }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [creatorRequest, setCreatorRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [searchText, setSearchText] = useState("");
  const [requestModal, setRequestModal] = useState({
    type: "",
    status: false,
    id: null
  });
  const [requestLoader, setRequestLoader] = useState(false);
  const navigate = useNavigate();

  const navigateDetailView = (record) =>
    navigate("/creator/content-detail", {
      state: { contentId: record?._id, showGraph: false }
    });

  const handleRequestModal = (requestType = "") => {
    const update={
      status: false,
      type: requestType ?? requestModal?.type,
    }
    setRequestModal(prev=>({...prev,...update}));
  };
  const handleclose = () => {
    setisModalOpen(false);
  };

  const rejected = async () => {
    
    setRequestLoader(true);
    const actionType = requestModal?.type === "approve";
    const payload = {
      content_id: requestModal?.id,
      action: actionType,
      reason:selectedValue == "Other" ? otherReason : selectedValue
    };
    // console.log("💕💕Content Approval",payload)
    const res = await updateContentRequestApi(payload);
    if (res?.status === 200) {
      message.success(res?.message);
      if (currentPage !== 1 && totalCount <= (currentPage - 1) * pageLimit + 1) {
        setCurrentPage(1);
        getContentRequestList(defaultPageNo);
      } else getContentRequestList(currentPage);
    } else message.error(res?.message);
    setRequestLoader(false);
    handleclose()
    handleRequestModal();
  };

  const getContentRequestList = useCallback(
    async (pageNo) => {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("type", type);
      params.append("listing_type", "request");
      params.append("page", pageNo);
      params.append("limit", pageLimit);
      params.append("search", searchText);

      const res = await getContentRequestApi(params);
      console.log("res in useRequestSection 🤡 ",res)
      if (res?.status === 200) {
        const { data = [], count = 0 } = res;
        setCreatorRequest(data);
        setTotalCount(count);
      } else message.error(res?.message);
      setLoading(false);
    },
    [searchText, type]
  );

  const updateContentRequest = async () => {
   
    if(requestModal.type=="approve"){
      rejected ()
    }
    else{
      setisModalOpen(true);
      handleRequestModal();
    }
  
  };

  const handleRequestButton = (requestType, id) => {
    setRequestModal({
      status: true,
      type: requestType,
      id
    });
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
        <Image src={record?.thumbnail} height="50px" width="100%" alt="" className="thumbnail" />
      )
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150,
      render: (_, record) => (
        <EllipseText className="title" onClick={() => navigateDetailView(record)} cursor="pointer">
          {record.title}
        </EllipseText>
      )
    },
    {
      title: "Created By",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 120,
      render: (_, record) => <div className="creator-name">{record?.user_account?.user_name}</div>
    },

    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      align: "center",
      width: 120
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
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <ViewerAction>
          <div className="action">
            <span
              className="action-icon"
              onClick={() => handleRequestButton("decline", record?._id)}
              aria-hidden>
              <RedCrossIcon height="16px" width="16px" />
            </span>
            <Line height="26px" borderColor={theme.grey2} />
            <span
              className="action-icon"
              onClick={() => handleRequestButton("approve", record?._id)}
              aria-hidden>
              <GreenOkIcon height="16px" width="16px" />
            </span>
          </div>
        </ViewerAction>
      )
    }
  ];

  useEffect(() => {
    getContentRequestList(defaultPageNo);
  }, [getContentRequestList]);

  const handleSearchData = (e) => {
    setCurrentPage(1);
    setSearchText(e);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getContentRequestList(pageNumber);
  };

  return {
    handlePageChange,
    handleSearchData,
    columns,
    requestModal,
    updateContentRequest,
    loading,
    creatorRequest,
    totalCount,
    currentPage,
    handleRequestModal,
    requestLoader,
    isModalOpen,
    handleclose,
    rejected
  };
};

export default useRequestSection;
