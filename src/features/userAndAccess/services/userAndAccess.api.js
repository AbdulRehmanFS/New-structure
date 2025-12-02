import { getApi, postApi, deleteApi } from "@services/api/methods";

const route = {
  user_list: "/admin/user-access-list",
  add_user: "/admin/add-user-access",
  delete_users: "/admin/delete-user-access",
};

export const getUserAccessListApi = (params) => {
  return getApi(route.user_list, params);
};

export const addUserAccessApi = (payload) => {
  return postApi(route.add_user, payload);
};

export const deleteUserAccessApi = (payload) => {
  return deleteApi(route.delete_users, payload);
};

