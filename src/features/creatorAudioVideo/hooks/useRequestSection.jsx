import { useCallback, useEffect, useState } from "react";
import { Image, message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { defaultPageNo, pageLimit } from "@utils/constant";
import { getContentRequestApi, updateContentRequestApi } from "../services/contentApproval.api";
import { GreenOkIcon, RedCrossIcon } from "@utils/svgFile";
import { theme } from "@utils/theme";
import { errorMessage } from "@utils/helpers";

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
    const update = {
      status: false,
      type: requestType ?? requestModal?.type
    };
    setRequestModal((prev) => ({ ...prev, ...update }));
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
      reason: selectedValue === "Other" ? otherReason : selectedValue
    };
    const res = await updateContentRequestApi(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Request updated successfully");
      if (currentPage !== 1 && totalCount <= (currentPage - 1) * pageLimit + 1) {
        setCurrentPage(1);
        getContentRequestList(defaultPageNo);
      } else {
        getContentRequestList(currentPage);
      }
    } else {
      errorMessage(res?.message || "Failed to update request");
    }
    setRequestLoader(false);
    handleclose();
    handleRequestModal();
  };

  const getContentRequestList = useCallback(
    async (pageNo) => {
      setLoading(true);
      const param = new URLSearchParams();
      param.append("type", type);
      param.append("listing_type", "request");
      param.append("page", pageNo);
      param.append("limit", pageLimit);
      if (searchText) param.append("search", searchText);

      const res = await getContentRequestApi(param);
      if (res?.status === 200) {
        const { data = [], count = 0 } = res;
        setCreatorRequest(data);
        setTotalCount(count);
      } else {
        errorMessage(res?.message || "Failed to fetch requests");
      }
      setLoading(false);
    },
    [searchText, type]
  );

  const updateContentRequest = async () => {
    if (requestModal.type === "approve") {
      rejected();
    } else {
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
        <span
          onClick={() => navigateDetailView(record)}
          className="cursor-pointer text-white hover:underline"
        >
          {record.title}
        </span>
      )
    },
    {
      title: "Created By",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      width: 120,
      render: (_, record) => (
        <span className="text-white">{record?.user_account?.user_name}</span>
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
            className="cursor-pointer"
            onClick={() => handleRequestButton("decline", record?._id)}
          >
            <RedCrossIcon height="16px" width="16px" />
          </span>
          <span className="h-6 w-px bg-[rgba(255,255,255,0.1)]" />
          <span
            className="cursor-pointer"
            onClick={() => handleRequestButton("approve", record?._id)}
          >
            <GreenOkIcon height="16px" width="16px" />
          </span>
        </div>
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

