import Message from "@components/Message";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { archiveSeriesContentAPI } from "../services/archive.api";
import { deleteSeriesAPI, getSeriesRequestApi } from "../services/contentApproval.api";
import { errorMessage } from "@utils/commonSection";
import { defaultPageNo, pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";

const useSeriesViewListing = (userId) => {
  const [tableLoader, setTableLoader] = useState(true);
  const [viewSeriesListing, setviewSeriesListing] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const [searchContent, setSearchContent] = useState("");
  const [openSeriesModal, setopenSeriesModal] = useState(false);
  const [seriesModalLoading, setseriesModalLoading] = useState(false);
  const [seriesModalName, setseriesModalName] = useState(null);
  const [seriesDetail, setSeriesDetail] = useState(null);
  const navigate = useNavigate();

  const handleSearchData = (e) => setSearchContent(e);

  const getListing = useCallback(async (page) => {
    if (!userId) {
      setTableLoader(false);
      return;
    }
    setTableLoader(true);
    const params = new URLSearchParams();
    params.append("user_id", userId);
    params.append("page", page);
    params.append("limit", pageLimit);
    params.append("search", searchContent);
    const res = await getSeriesRequestApi(params);
    if (res?.status === 200) {
      setviewSeriesListing(res?.data);
      setTotalPage(res?.count);
    } else errorMessage(res?.message || "Something went wrong");
    setTableLoader(false);
  }, [searchContent, userId]);

  const handleDelete = async () => {
    setseriesModalLoading(true);
    const params = new URLSearchParams();
    params.append("series_id", seriesDetail?._id);
    const res = await deleteSeriesAPI(params);
    if (res?.status === 200) {
      Message.success(res);
      getListing(currentPage);
    } else Message.error(res);
    setopenSeriesModal((pre) => !pre);
    setseriesModalLoading(false);
  };

  const handleSeriesConfirm = () => {
    if (seriesModalName === "delete") handleDelete();
    if (seriesModalName === "archive") handleArchive();
  };

  const handleArchive = async () => {
    setseriesModalLoading(true);
    const payload = {
      series_id: seriesDetail?._id,
      status: true
    };
    const res = await archiveSeriesContentAPI(payload);
    if (res?.status === 200) {
      Message.success(res);
      getListing(currentPage);
      setopenSeriesModal((pre) => !pre);
    } else Message.error(res);
    setseriesModalLoading(false);
  };

  const handleSeriesModalOpen = () => setopenSeriesModal((pre) => !pre);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getListing(pageNumber);
  };

  const handleParticularModal = (name, detail) => {
    setseriesModalName(name);
    setSeriesDetail(detail);
    setopenSeriesModal((pre) => !pre);
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
          <div className="text-[#F5F5F5] text-[13px]">{record?.user_name}</div>
        </Link>
      )
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150,
      render: (_, record) => (
        <div className="max-w-[160px] overflow-hidden text-center mx-auto" style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
          {record.title}
        </div>
      )
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 80,
      render: (_, record) => {
        if (!record.approved_by_admin && record.approved_date === null) {
          return "Under Review";
        } else if (record.approved_by_admin && record.approved_date !== null) {
          return "Approved";
        } else if (!record.approved_by_admin && record.approved_date !== null) {
          return "Denied";
        }
      }
    },
    {
      title: "Action",
      dataIndex: "content_url",
      key: "content_url",
      align: "center",
      width: 180,
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="flex min-w-[84px] justify-between items-center">
            <div
              onClick={() =>
                navigate("/creator/content-listing", {
                  state: { contentId: record?._id, type: "series" }
                })
              }
              className="cursor-pointer"
              aria-hidden>
              View
            </div>
            <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
            <div
              className="cursor-pointer"
              onClick={() => handleParticularModal("delete", record)}
              aria-hidden>
              Delete
            </div>
            <div className="h-4 border-r-2 my-0 mx-2" style={{ borderColor: theme.grey2 }} />
            <div
              className="cursor-pointer"
              onClick={() => handleParticularModal("archive", record)}
              aria-hidden>
              Archive
            </div>
          </div>
        </div>
      )
    }
  ];
  return {
    tableLoader,
    viewSeriesListing,
    totalPage,
    handlePageChange,
    currentPage,
    handleSearchData,
    handleSeriesConfirm,
    handleSeriesModalOpen,
    openSeriesModal,
    seriesModalLoading,
    seriesModalName,
    seriesColumns
  };
};

export default useSeriesViewListing;

