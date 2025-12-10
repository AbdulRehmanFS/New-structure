import { message } from "antd";
import { Line, ViewerAction } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { creatorRequestApi,
   updateCreatorRequestApi 
  } from "service/api/usermanagement";
import { defaultPageNo, pageLimit } from "util/constant";
import { GreenOkIcon, RedCrossIcon } from "util/svgFile";
import { theme } from "util/theme";

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

  // const updateCreatorRequest = async () => {
  //   const userId = requestModal?.id;
  //   setRequestLoader(true);
  //   const actionType = requestModal?.type === "approve" ? "accepted" : "declined";
  //   const payload = {
  //     user_id: userId,
  //     action: actionType
  //   };
  //   const res = await updateCreatorRequestApi(payload);
  //   if (res?.status === 200) {
  //     message.success(res?.message);
  //     if (currentPage !== 1 && totalCount <= (currentPage - 1) * pageLimit + 1) {
  //       setCurrentPage(1);
  //       getCreatorRequestList(defaultPageNo);
  //     } else getCreatorRequestList(currentPage);
  //   } else message.error(res?.message);
  //   setRequestLoader(false);
  //   handleRequestModal();
  // };

  //   const updateCreatorRequest = async (selectedReasons = []) => {
  //   const userId = requestModal?.id;
  //   setRequestLoader(true);

  //   const actionType = requestModal?.type === "approve" ? "accepted" : "declined";

  //   // ✅ Validate rejection reasons
  //   if (actionType === "declined" && selectedReasons.length === 0) {
  //     message.error("Please select at least one rejection reason.");
  //     setRequestLoader(false);
  //     return;
  //   }

  //   // ✅ If "Other" was selected, extract custom reason from last item
  //   const formattedReasons = selectedReasons.map((reason) =>
  //     typeof reason === "string" ? reason : reason.custom
  //   );

  //   const payload = {
  //     user_id: userId,
  //     action: actionType,
  //     reasons: actionType === "declined" ? formattedReasons : undefined, // send only for declined
  //   };
  // console.log("👽",payload)
  //   // const res = await updateCreatorRequestApi(payload);

  //   if (res?.status === 200) {
  //     message.success(res?.message);
  //     if (currentPage !== 1 && totalCount <= (currentPage - 1) * pageLimit + 1) {
  //       setCurrentPage(1);
  //       getCreatorRequestList(defaultPageNo);
  //     } else {
  //       getCreatorRequestList(currentPage);
  //     }
  //   } else {
  //     message.error(res?.message);
  //   }

  //   setRequestLoader(false);
  //   handleRequestModal();
  // };
  const updateCreatorRequest = async (selectedReasons, tempRequestModal, setShowRejectReason) => {
    const userId = tempRequestModal?.id || requestModal?.id;

    setRequestLoader(true);

    // const actionType = requestModal?.type === "approve" ? "accepted" : "declined";

    const actionType =
      (tempRequestModal?.type || requestModal?.type) === "approve" ? "accepted" : "declined";

    // Normalize selectedReasons
    const reasonsArray = Array.isArray(selectedReasons)
      ? selectedReasons
      : selectedReasons?.reasons || [];

    // ✅ Validate rejection reasons
    if (actionType === "declined" && reasonsArray.length === 0) {
      message.error("Please select at least one rejection reason.");
      setRequestLoader(false);
      return;
    }

    // ✅ If "Other" was selected, extract custom reason
    const formattedReasons = reasonsArray.map((reason) =>
      typeof reason === "string" ? reason : reason.custom
    );

    const reasonToSend = formattedReasons.length > 0 ? formattedReasons[0] : null;


    const payload = {
      user_id: userId,
      action: actionType,
      reason: actionType === "declined" ? reasonToSend : null
    };

    // console.log("👽 User Management", payload);

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
