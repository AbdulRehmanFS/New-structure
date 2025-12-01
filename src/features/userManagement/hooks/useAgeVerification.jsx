import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAgeVerificationListing } from "../services/userManagement.api";
import { errorMessage } from "@utils/commonSection";
import { defaultPageNo, pageLimit } from "@utils/constant";

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
      setUserList(data);
    } else errorMessage(res?.message);
    setLoading(false);
  }, [searchContent]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getListing(pageNumber);
  };

  const handleClick = (record) => {
    navigate("/user-management/age-details", { state: record });
  };

  useEffect(() => {
    setCurrentPage(defaultPageNo);
    getListing(defaultPageNo);
  }, [getListing]);

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
        <div className="flex justify-center">
          <div onClick={() => handleClick(record)} className="cursor-pointer" aria-hidden>
            View
          </div>
        </div>
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

