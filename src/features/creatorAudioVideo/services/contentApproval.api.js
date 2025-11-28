import { deleteApi, getApi, patchApi } from "@services/api/methods";

const route = {
  delete_content: "admin/content/remove-creator-content",
  content_listing: "admin/content/content-listing",
  delete_series: "admin/content/remove-creator-series",
  series_listing: "admin/content/creator-series-listing",
  update_content_request: "admin/content/update-content-request",
};

export const deleteContentAPI = (params) => {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return deleteApi(`${route.delete_content}?${queryString}`);
};

export const getContentRequestApi = (params) => {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return getApi(`${route.content_listing}?${queryString}`);
};

export const deleteSeriesAPI = (params) => {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return deleteApi(`${route.delete_series}?${queryString}`);
};

export const getSeriesRequestApi = (params) => {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return getApi(`${route.series_listing}?${queryString}`);
};

export const updateContentRequestApi = (payload) => patchApi(route.update_content_request, payload);

