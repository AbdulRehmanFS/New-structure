import { getApi } from "@services/api/methods";

const route = {
  report_listing: "/admin/report-listing",
  report_comment: "/admin/comment-listing",
  downloadReport: "/admin/download-report"
};

export const getReportListingApi = (payload) => {
  // If payload is a URLSearchParams or string, extract query params
  let queryParams = {};
  if (payload instanceof URLSearchParams) {
    payload.forEach((value, key) => {
      queryParams[key] = value;
    });
  } else if (typeof payload === 'string') {
    // Parse query string if it's a string
    const params = new URLSearchParams(payload);
    params.forEach((value, key) => {
      queryParams[key] = value;
    });
  } else {
    queryParams = payload || {};
  }
  return getApi(route.report_listing, queryParams);
};

export const getReportCommentListApi = (payload) => {
  const queryString = payload instanceof URLSearchParams ? payload.toString() : payload;
  return getApi(route.report_comment + "?" + queryString);
};

export const downloadReportApi = (payload) => {
  const queryString = payload instanceof URLSearchParams ? payload.toString() : payload;
  return getApi(route.downloadReport + "?" + queryString);
};
