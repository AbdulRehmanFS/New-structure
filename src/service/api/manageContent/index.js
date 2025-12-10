import { deleteApi, getApi, patchApi, postApi } from "../methods";

const route = {
  get_all_content: "admin/manage-content/get-content/",
  update_policies: "admin/manage-content/update-policies",
  add_update_faq: "admin/manage-content/add-faq",
  delete_faq:"admin/manage-content/remove-faq?"
};

export const getContentApi = (type) => getApi(route.get_all_content + type);

export const updatePoliciesApi = (payload) => patchApi(route.update_policies, payload);

export const addUpdateFaqApi = (payload) => postApi(route.add_update_faq, payload);

export const removeFaqApi=(payload)=>deleteApi(`${route.delete_faq}${payload}`)
