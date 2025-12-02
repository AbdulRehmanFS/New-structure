import { ButtonComponent } from "@components/index";
import { message } from "antd";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { downloadReportApi, getReportListingApi } from "../services/report.api";
import { updateUserStatusApi } from "@features/userManagement/services/userManagement.api";
import { errorMessage } from "@utils/commonSection";
import { pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";

const useReport = () => {
  const [reportListing, setReportListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [userInfoId, setuserInfoId] = useState();
  const navigate = useNavigate();
  const hasMounted = useRef(false);
  const prevFromDateRef = useRef(fromDate);
  const prevEndDateRef = useRef(endDate);

  const getReports = useCallback(
    async (page) => {
      setLoading(true);
      try {
      const params = new URLSearchParams();
      const pageToUse = page !== undefined ? page : currentPage;
      params.append("page", pageToUse);
      params.append("limit", pageLimit);
      
      // Only add date filters if both dates are provided
      if (fromDate && endDate) {
        // Backend uses $gt (greater than) and $lt (less than) which EXCLUDE the boundary dates
        // $gt: createdAt > startDay (excludes startDay)
        // $lt: createdAt < endOfDay (excludes endOfDay)
        // To include the selected dates:
        // - For start date: subtract 1 day so $gt includes the selected start date
        // - For end date: add 1 day so $lt includes the selected end date
        const startDateMinusOne = moment(fromDate, "YYYY-MM-DD").subtract(1, 'day').format("YYYY-MM-DD");
        const endDatePlusOne = moment(endDate, "YYYY-MM-DD").add(1, 'day').format("YYYY-MM-DD");
        params.append("from", startDateMinusOne);
        params.append("to", endDatePlusOne);
      }

        const res = await getReportListingApi(params);

        // Backend returns: { status: 200, message: "...", data: [...], count: ... }
        if (res?.status === 200) {
          const responseData = res?.data || [];
          const responseCount = res?.count || 0;
          
          setReportListing(Array.isArray(responseData) ? responseData : []);
          setTotalPage(Number(responseCount) || 0);
          
          // Debug log (remove in production)
          if (process.env.NODE_ENV === 'development') {
            console.log('Reports fetched:', {
              count: responseCount,
              dataLength: responseData.length,
              page: pageToUse,
              fromDate,
              endDate
            });
          }
        } else {
          const errorMsg = res?.message || res?.data?.message || "Something went wrong";
          message.error(errorMsg);
          setReportListing([]);
          setTotalPage(0);
          
          // Debug log (remove in production)
          if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching reports:', res);
          }
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        message.error("Failed to fetch reports. Please try again.");
        setReportListing([]);
        setTotalPage(0);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, endDate, fromDate]
  );

  const handleDateChange = (e, type = "") => {
    // DateSelector returns date in "YYYY-MM-DD" format or empty string
    const val = e === "Invalid Date" || !e ? "" : e;
    if (type === "from") {
      setFromDate(val);
    } else {
      setEndDate(val);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getReports(pageNumber);
  };

  // Load data on initial mount
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      getReports(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reload data when dates change (skip initial mount and unchanged dates)
  useEffect(() => {
    // Skip on initial mount
    if (!hasMounted.current) {
      prevFromDateRef.current = fromDate;
      prevEndDateRef.current = endDate;
      return;
    }
    
    // Check if dates actually changed
    const datesChanged = prevFromDateRef.current !== fromDate || prevEndDateRef.current !== endDate;
    if (!datesChanged) {
      return;
    }
    
    // Update refs
    prevFromDateRef.current = fromDate;
    prevEndDateRef.current = endDate;
    
    // Dates changed after initial mount
    if (fromDate && endDate) {
      // Both dates provided - fetch with date filter
      setCurrentPage(1);
      getReports(1);
    } else if (!fromDate && !endDate) {
      // Dates cleared - fetch without filters
      setCurrentPage(1);
      getReports(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, endDate]);

  const handleDownload = async (e) => {
    const payload = new URLSearchParams();
    payload.append("report_id", e?._id);
    const req = await downloadReportApi(payload.toString());
    if (req?.status == 200) {
      window.open(req.data);
    } else {
      errorMessage(req);
    }
  };

  const handleOnChange = async (e, value) => {
    if (e?.reported_user?.status == "inactive") {
      const payload = {
        user_id: e?.reported_user?._id,
        status: "active"
      };
      const req = await updateUserStatusApi(payload);
      if (req?.status === 200) {
        message.success("Successfully Updated");
        getReports(currentPage);
      } else {
        errorMessage(req);
      }
    } else {
      setOpenModal((prev) => !prev);
      if (value) {
        setuserInfoId(e?.reported_user?._id);
      }
    }
  };

  const changeStatus = () => {
    getReports(currentPage);
  };

  const reportTypeMap = {
    1: "User Report",
    2: "Comment Report",
    3: "Group Report",
    4: "Copyright Report",
    5: "Content Report"
  };

  const columns = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      render: (_, record, index) => (currentPage - 1) * pageLimit + index + 1,
      width: 60
    },
    {
      title: "Reported Person",
      dataIndex: "reported_person",
      key: "reported_person",
      align: "center",
      width: 130,
      render: (_, record) => (
        <div
          data-col="reported_person"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/report-details", { state: record })}
        >
          {record?.reported_user?.full_name}
        </div>
      ),
    },
    {
      title: "Email Id",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (_, record) => record?.reported_user?.email,
      width: 210
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      render: (_, record) => record?.reported_user?.user_name,
      width: 120
    },
    {
      title: "Reported by",
      dataIndex: "reported_by",
      key: "reported_by",
      align: "center",
      render: (_, record) => record?.reported_by_user?.user_name,
      width: 130
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 90,
      render: (_, record) => moment(record?.updatedAt).format("DD-MMM-YY")
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
      width: 95,
      render: (_, record) => moment(record?.updatedAt).format("hh:mm a")
    },
    {
      title: "Report Type",
      dataIndex: "report_type",
      key: "report_type",
      align: "center",
      width: 180,
      render: (_, record) => <>{reportTypeMap[record?.type]}</>
    },
    {
      title: "Report Reason",
      dataIndex: "report_reason",
      key: "report_reason",
      align: "center",
      width: 180,
      render: (_, record) => <>{record?.reason}</>
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              background: theme.lightGreen,
              color: "white",
              padding: "4px 18px",
              cursor: "pointer",
              borderRadius: "5px",
              fontWeight: 300
            }}
            onClick={() => handleOnChange(record, true)}
          >
            {record?.reported_user?.status == "inactive" ? "Enable User" : "Disable User"}
          </div>
          <div>
            <ButtonComponent
              bg={theme.primaryColor}
              text="Download"
              height="30px"
              width="100px"
              onClick={() => handleDownload(record)}
            />
          </div>
        </div>
      ),
      width: 250
    }
  ];

  return {
    reportListing,
    loading,
    totalPage,
    currentPage,
    handleDateChange,
    handlePageChange,
    columns,
    openModal,
    handleOnChange,
    userInfoId,
    changeStatus
  };
};

export default useReport;

