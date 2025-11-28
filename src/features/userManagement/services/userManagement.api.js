import { getApi, postApi } from "@services/api/methods";

export const userListingApi = (params) => getApi("admin/user/user-listing", params);
export const updateUserStatusApi = (data) => postApi("admin/user/update-status", data);

