import { ViewerAction } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAgeVerificationListing } from "service/api/usermanagement";
import { errorMessage } from "util/commonSection";
import { defaultPageNo, pageLimit } from "util/constant";

const useAgeVerification = (searchContent) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [userListing, setUserList] = useState();
  
  const getListing = useCallback(async (pageNo) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("page", pageNo);
    params.append("limit", pageLimit);
    params.append("search", searchContent);
    const res = await getAgeVerificationListing(params);
    if (res?.status == 200) {
      const { data = [], count } = res || {};
      setTotalPage(count);
      setUserList(data)
    } else errorMessage(res?.message);
    setLoading(false);
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getListing(pageNumber);
  };

  const handleClick=(record)=>{
    navigate("/user-management/age-details",{state:record})
  }

  useEffect(() => {
    getListing(defaultPageNo);
  }, [searchContent]);

  const ageColumns = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 60,
      render: (_, record, index) => (currentPage - 1) * pageLimit + index + 1
    },

    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      width: 120
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 150
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
            onClick={() =>handleClick(record)}
            className="action-icon"
            aria-hidden>
            View
          </div>
        </ViewerAction>
      )
    }
  ];

  return {
    ageColumns,
    loading,
    totalPage,
    handlePageChange,
    userListing,
    currentPage,
    pageLimit
  };
};

export default useAgeVerification;
