import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserStatusApi, userListingApi } from "../services/userManagement.api";
import { errorMessage } from "@utils/helpers";
import { defaultPageNo } from "@utils/constant";

const useUserListing = (searchContent, pageLimit, userRole) => {
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [userListing, setUserList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const usersStatus = selectedStatus === "active" ? 1 : 0;

  const getUserListing = useCallback(
    async (pageNo, userStatus) => {
      setLoading(true);
      const params = {
        user_role: userRole,
        status: userStatus,
        page: pageNo,
        limit: pageLimit
      };
      if (searchContent && searchContent !== "undefined") {
        params.search = searchContent;
      }
      const res = await userListingApi(params);

      if (res?.status === 200) {
        const { data = [], count } = res || {};
        setTotalPage(count);
        setUserList(data);
      } else errorMessage(res?.message);

      setLoading(false);
    },
    [pageLimit, searchContent, userRole]
  );

  const handleStatusChange = async (record, status) => {
    const payload = {
      user_id: record?._id,
      status: status ? "active" : "inactive"
    };
    const res = await updateUserStatusApi(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Status updated successfully.");
      getUserListing(defaultPageNo, usersStatus);
      setCurrentPage(1);
    } else message.error(res?.message || "Something went wrong in updating status");
  };

  const ageNavigate = () => {
    navigate("/user-management/age-verification");
  };

  const handleStatusSelection = async (e) => {
    const status = e === "active" ? 1 : 0;
    setSelectedStatus(e);
    if (currentPage !== 1) setCurrentPage(1);
    getUserListing(defaultPageNo, status);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getUserListing(pageNumber, usersStatus);
  };

  useEffect(() => {
    setCurrentPage(1);
    getUserListing(defaultPageNo, usersStatus);
  }, [getUserListing, selectedStatus, usersStatus]);

  return [
    userListing,
    loading,
    totalPage,
    currentPage,
    selectedStatus,
    handleStatusSelection,
    handlePageChange,
    handleStatusChange,
    ageNavigate
  ];
};

export default useUserListing;

