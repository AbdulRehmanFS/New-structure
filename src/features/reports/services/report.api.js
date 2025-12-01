import { getApi } from "@services/api/methods";

const route = {
  report_listing: "/admin/report-listing",
  report_comment: "/admin/comment-listing",
  downloadReport: "/admin/download-report"
};

export const getReportListingApi = (payload) => {
  const queryString = payload instanceof URLSearchParams ? payload.toString() : payload;
  return getApi(route.report_listing + "?" + queryString);
};

export const getReportCommentListApi = (payload) => {
  const queryString = payload instanceof URLSearchParams ? payload.toString() : payload;
  return getApi(route.report_comment + "?" + queryString);
};

export const downloadReportApi = (payload) => {
  const queryString = payload instanceof URLSearchParams ? payload.toString() : payload;
  return getApi(route.downloadReport + "?" + queryString);
};
