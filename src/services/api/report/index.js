import { getApi } from "../methods";

const route = {
  report_listing: "/admin/report-listing?",
  report_comment:"/admin/comment-listing?",
  downloadReport:"/admin/download-report?"
};

export const getReportListingApi = (payload) => getApi(route.report_listing + payload);

export const getReportCommentListApi=(payload)=>getApi(route.report_comment+payload);

export const  downloadReportApi=(payload)=>getApi(route.downloadReport+payload)

