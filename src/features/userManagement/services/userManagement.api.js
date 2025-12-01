import { deleteApi, getApi, patchApi } from "@services/api/methods";

const apiList = {
  user_listing: "admin/user/user-listing?",
  update_user_status: "admin/user/update-status",
  user_detail: "admin/user/user-detail?user_id=",
  delete_creator_user: "admin/user/delete-user?",
  creator_events: "admin/user/creator-events?",
  creator_contents: "admin/user/creator-content?",
  set_commision: "admin/user/set-commission",
  creator_request: "admin/user/creator-request-listing?",
  update_creator_requst: "admin/user/update-creator-request",
  creator_request_detail: "admin/user/creator-request-detail?user_id=",
  age_verification: "admin/user/age-verification-listing?",
  enableUser: "admin/user/enable-underage-user",
  user_stats: "admin/user/user-stats",
};

export const userListingApi = (payload) => {
  const queryString = payload instanceof URLSearchParams 
    ? payload.toString() 
    : new URLSearchParams(payload).toString();
  return getApi(apiList.user_listing + queryString);
};

export const updateUserStatusApi = (payload) => patchApi(apiList.update_user_status, payload);

export const userDetailApi = (userId, filter) =>
  getApi(apiList.user_detail + userId, { filter: JSON.stringify(filter) });

export const userStatsApi = (userId, filter) =>
  getApi(apiList.user_stats, { userId, filter: JSON.stringify(filter) });

export const deleteCreatorUserApi = (payload) => deleteApi(apiList.delete_creator_user + payload);

export const getCreatorEventsApi = (payload) => {
  const queryString = payload instanceof URLSearchParams ? payload.toString() : new URLSearchParams(payload).toString();
  return getApi(apiList.creator_events + queryString);
};

export const getCreatorPodcastsApi = (payload) => {
  const queryString = payload instanceof URLSearchParams ? payload.toString() : new URLSearchParams(payload).toString();
  return getApi(apiList.creator_contents + queryString);
};

export const setCreatorCommisionApi = (payload) => patchApi(apiList.set_commision, payload);

export const creatorRequestApi = (payload) => {
  const queryString = payload instanceof URLSearchParams ? payload.toString() : new URLSearchParams(payload).toString();
  return getApi(apiList.creator_request + queryString);
};

export const updateCreatorRequestApi = (payload) =>
  patchApi(apiList.update_creator_requst, payload);

export const getCreatorRequestDetails = (creatorId) =>
  getApi(apiList.creator_request_detail + creatorId);

export const getAgeVerificationListing = (payload) => {
  const queryString = payload instanceof URLSearchParams ? payload.toString() : new URLSearchParams(payload).toString();
  return getApi(apiList.age_verification + queryString);
};

export const enableUnderAgeUser = (payload) => patchApi(apiList.enableUser, payload);
