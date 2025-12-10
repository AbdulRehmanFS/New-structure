import ConfirmModal from "component/modal/confirmModal";
import { CustomePagination, ModalComponent, TableComponent } from "component/index";
import moment from "moment";
import { PodcastListingWrapper } from "page/eventsContent/contentListing";
import { EllipseText,  HeaderSection,  Text, ViewerAction } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { recordScheduleContentApi } from "service/api/eventContent";
import { errorMessage } from "util/commonSection";
import { defaultPageNo, modalIcons, modalSubheading, pageLimit } from "util/constant";
import { BackIcon } from "util/svgFile";
import { theme } from "util/theme";
import Message from "component/messages";
import { archiveContentAPI } from "service/api/archive";
const ContentEpisodeArchive = () => {
  const [openModal, setOpenModal] = useState(false);
  const [recordedContent, setRecordedContent] = useState();
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [contentDetail, setContentDetail] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPageNo);
  const handleBack=()=>{
    navigate(-1)
  }
  const modalName="unarchive"
  const { id } = useLocation()?.state || {};
  const navigate=useNavigate();
  const navigateDetailSection = () =>{
    navigate("/events-contents/contents-detail", {
        state: { podcastId: id, showGraph: true }
      });
}


const handleParticularModal = (detail) => {
  setOpenModal((pre) => !pre);
  setContentDetail(detail);
};
  const getContantLisitng = useCallback(async (pageNo) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("is_archive",true)
    params.append("scheduled_id", id);
    params.append("page", pageNo);
    params.append("limit", pageLimit);
    const res = await recordScheduleContentApi(params);
    if (res?.status === 200) {
      const { count = 0, data = [] } = res;
      setTotalPage(count);
      setRecordedContent(data);
    } else errorMessage(res?.message);
    setLoading(false);
  }, []);
  useEffect(() => {
    setCurrentPage(1);
    getContantLisitng(defaultPageNo);
  }, [getContantLisitng]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getContantLisitng(pageNumber);
  };

  const handleConfirm=async()=>{
    setModalLoading(true)
    const payload = {
      content_id: contentDetail?._id,
      status: false
    };
    const res = await archiveContentAPI(payload);
    if (res?.status === 200) {
      Message.success(res);
      getContantLisitng(currentPage);
      setOpenModal((pre) => !pre);
    } else Message.error(res);
    setModalLoading(false)

  }

  const column = [
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
      title: "Content Title",
      dataIndex: "title",
      key: "podcast_title",
      align: "center",
      width: 160,
      render: (_, record) => (
        <EllipseText onClick={() => navigateDetailSection(record)} style={{ cursor: "pointer" }}>
          {record?.title}
        </EllipseText>
      )
    },
    {
      title: "Created By",
      dataIndex: "user_name",
      key: "created_by",
      align: "center",
      width: 120,
      render: (_, record) => (
        <Link
          to="/events-contents/contents-detail"
          state={{ podcastId: record?._id, showGraph: true }}
          className="view">
          <Text color={theme.fieldBg}>{record?.user_account?.user_name}</Text>
        </Link>
      )
    },
    {
      title: "Content Type",
      dataIndex: "content_type ",
      key: "content_type ",
      align: "center",
      width: 120,
      render: (_, record) => <div>{record?.content_type ?? "---"}</div>
    },
    {
      title: "Content Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 100,
      render: (_, record) => moment(record?.createdAt.split("T")[0]).format("DD-MMM-YY")
    },
    {
      title: "Time",
      dataIndex: "event_time",
      key: "time",
      align: "center",
      width: 80,
      render: (_, record) => record?.createdAt && moment(record?.createdAt).format("hh:mm a")
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      width: 180,
      render: (_,record) => (
        <ViewerAction>
          <div
            className="action-icon"
            onClick={() => handleParticularModal(record)}
            aria-hidden>
            unArchive
          </div>
        </ViewerAction>
      )
    }
  ];
  return (
    <PodcastListingWrapper>
      <HeaderSection className="heading">
        <div className="back-navigate" onClick={handleBack}>
          <BackIcon />
          Archive Listings{" "}
        </div>
      </HeaderSection>
      <TableComponent data={recordedContent} columns={column} loading={loading} />
      <CustomePagination
        total={totalPage}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
          {openModal && (
          <ModalComponent openModal={openModal} setOpenModal={handleParticularModal}>
            <ConfirmModal
              handleCancel={handleParticularModal}
              handleConfirm={handleConfirm}
              icon={modalIcons[modalName]}
              confirmButtonText="Confirm"
              loading={modalLoading}
              subheading={modalSubheading[modalName]}
            />
          </ModalComponent>
        )}
    </PodcastListingWrapper>
  );
};

export default ContentEpisodeArchive;
