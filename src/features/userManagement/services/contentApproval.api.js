import { deleteApi, getApi } from "@services/api/methods";

const route = {
  delete_content: "admin/content/remove-creator-content?",
  delete_series: "admin/content/remove-creator-series?",
  series_listing: "admin/content/creator-series-listing?",
};

export const deleteContentAPI = (params) => deleteApi(route.delete_content + params);

export const deleteSeriesAPI = (params) => deleteApi(route.delete_series + params);

export const getSeriesRequestApi = (params) => getApi(route.series_listing + params);

