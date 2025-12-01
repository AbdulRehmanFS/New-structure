import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { creatorRequestApi, updateCreatorRequestApi } from "../services/userManagement.api";
import { defaultPageNo, pageLimit } from "@utils/constant";
import { GreenOkIcon, RedCrossIcon } from "@utils/svgFile";
import { theme } from "@utils/theme";

const useCreatorRequestList = () => {
  const navigate = useNavigate();
  const [creatorRequest, setCreatorRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [requestModal, setRequestModal] = useState({
    type: "",
    status: false,
    id: null
  });
  const [requestLoader, setRequestLoader] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getCreatorRequestList = useCallback(
    async (pageNo, searchData = searchText) => {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", pageNo);
      params.append("limit", pageLimit);
      params.append("search", searchData);
      const res = await creatorRequestApi(params);
      if (res?.status === 200) {
        const { data = [], count = 0 } = res || {};
        setCreatorRequest(data);
        setTotalCount(count);
      } else message.error(res?.message);
      setLoading(false);
    },
    [searchText]
  );

  const handleRequestModal = (requestType = "") => {
    setRequestModal({
      status: false,
      type: requestType ?? requestModal?.type
    });
  };

  const updateCreatorRequest = async (selectedReasons, tempRequestModal, setShowRejectReason) => {
    const userId = tempRequestModal?.id || requestModal?.id;

    setRequestLoader(true);

    const actionType =
      (tempRequestModal?.type || requestModal?.type) === "approve" ? "accepted" : "declined";

    const reasonsArray = Array.isArray(selectedReasons)
      ? selectedReasons
      : selectedReasons?.reasons || [];

    if (actionType === "declined" && reasonsArray.length === 0) {
      message.error("Please select at least one rejection reason.");
      setRequestLoader(false);
      return;
    }

    const formattedReasons = reasonsArray.map((reason) =>
      typeof reason === "string" ? reason : reason.custom
    );

    const reasonToSend = formattedReasons.length > 0 ? formattedReasons[0] : null;

    const payload = {
      user_id: userId,
      action: actionType,
      reason: actionType === "declined" ? reasonToSend : null
    };

    const res = await updateCreatorRequestApi(payload);

    if (res?.status === 200) {
      message.success(res?.message);
      if (currentPage !== 1 && totalCount <= (currentPage - 1) * pageLimit + 1) {
        setCurrentPage(1);
        getCreatorRequestList(defaultPageNo);
      } else {
        getCreatorRequestList(currentPage);
      }
    } else {
      message.error(res?.message);
    }

    setRequestLoader(false);
    if (tempRequestModal?.type === "decline" || requestModal?.type === "decline") {
      setShowRejectReason(false);
    }

    handleRequestModal();
  };

  const handleRequestButton = (requestType, id) => {
    setRequestModal({
      status: true,
      type: requestType,
      id
    });
  };

  const handleSearchData = (e) => {
    setCurrentPage(1);
    setSearchText(e);
    getCreatorRequestList(defaultPageNo, e);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getCreatorRequestList(pageNumber);
  };

  useEffect(() => {
    getCreatorRequestList(defaultPageNo);
  }, [getCreatorRequestList]);

  const columns = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 70,
      render: (_, record, index) => (currentPage - 1) * pageLimit + index + 1
    },
    {
      title: "Name of Content Creator",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 180,
      render: (_, record) => (
        <div
          className="creator-name"
          onClick={() =>
            navigate("/user-management/creator-request-profile", {
              state: { userInfo: record }
            })
          }
          aria-hidden>
          {`${record?.first_name} ${record?.last_name}`}
        </div>
      )
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 200
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      width: 150
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 110,
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="flex min-w-[84px] justify-between items-center">
            <span
              className="cursor-pointer"
              onClick={() => handleRequestButton("decline", record?._id)}
              aria-hidden>
              <RedCrossIcon height="16px" width="16px" />
            </span>
            <div className="h-[26px] border-r-2 border-[rgba(0,0,0,0.26)] my-0 mx-2" style={{ borderColor: theme.grey2 }} />
            <span
              className="cursor-pointer"
              onClick={() => handleRequestButton("approve", record?._id)}
              aria-hidden>
              <GreenOkIcon height="16px" width="16px" />
            </span>
          </div>
        </div>
      )
    }
  ];

  return [
    creatorRequest,
    loading,
    currentPage,
    totalCount,
    requestLoader,
    requestModal,
    updateCreatorRequest,
    handleSearchData,
    handlePageChange,
    handleRequestModal,
    columns
  ];
};

export default useCreatorRequestList;

