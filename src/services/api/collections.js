import { deleteApi, getApi, postApi, putApi } from "./methods";

const route = {
  add_category: "admin/categories/add-category",
  get_categories_list: "admin/categories/view-categories",
  update_category_status: "admin/categories/update-category-status",
  delete_category: "admin/categories/delete-category",
  creator_lists: "admin/categories/view-creator-listing",
  view_user_list: "admin/view-all-users",
  add_creator_content: "admin/add-content",
  edit_event: "admin/edit-event",
  addSeries: "/admin/add-series",
  add_series_content: "/admin/add-series-content",
  schedule_event: "admin/schedule-live-content",
  schedule_podcast: "admin/add-scheduled-content",
};

export const addCategoryApi = (payload) => {
  const res = postApi(route.add_category, payload);
  return res;
};

export const getCategoriesListApi = () => getApi(route.get_categories_list);

export const updateCategoryStatusApi = (payload) => putApi(route.update_category_status, payload);

export const deleteCategoryApi = (payload) => deleteApi(route.delete_category, payload);

export const getCreatorListing = (param) => getApi(route.creator_lists + param);

export const getUserListApi = () => getApi(route.view_user_list);

export const addCreatorContentAPI = (payload) => postApi(route.add_creator_content, payload);

export const editEventAPI = (payload) => postApi(route.edit_event, payload);

export const addSeriesAPI = (payload) => postApi(route.addSeries, payload);

export const addSeriesContentAPI = (payload) => postApi(route.add_series_content, payload);

export const scheduleEventAPI = (payload) => postApi(route.schedule_event, payload);

export const schedulePodcast = (payload) => postApi(route.schedule_podcast, payload);

