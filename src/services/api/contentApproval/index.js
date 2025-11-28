import { deleteApi, getApi, patchApi } from "../methods";

const route={
    delete_content: "admin/content/remove-creator-content?",
    content_listing: "admin/content/content-listing?",
    delete_series: "admin/content/remove-creator-series?",
    series_listing: "admin/content/creator-series-listing?",
    content_all_view: "admin/content/content-listing?",
    update_content_request: "admin/content/update-content-request",
    content_detail: "admin/content/content-detail?",
    content_graph_info: "admin/content/views-stats?content_id=",
}

export const deleteContentAPI = (params) => deleteApi(route.delete_content + params);

export const getContentRequestApi = (params) => getApi(route.content_listing + params);

export const deleteSeriesAPI = (params) => deleteApi(route.delete_series + params);

export const getSeriesRequestApi = (params) => getApi(route.series_listing + params);

export const getContentAllViewApi = (contentId) => getApi(route.content_all_view + contentId);

export const updateContentRequestApi = (payload) => patchApi(route.update_content_request, payload);

export const getContentRequestDetailApi = (contentId) => getApi(route.content_detail + contentId);

export const getContentGraphDataApi = (contentId, contentType) =>
    getApi(`${route.content_graph_info + contentId}&type=${contentType}`);

