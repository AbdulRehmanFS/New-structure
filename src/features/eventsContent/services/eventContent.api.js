import { deleteApi, getApi, patchApi, postApi } from "@services/api/methods";

const route = {
  availability: "/live/check-schedule-availability?",
  event_listing: "admin/events/scheduled-listing?",
  delete_schedule_content: "admin/events/remove-creator-scheduled-content?",
  update_event_request: "admin/events/update-schedule-content",
  content_event_detail: "/admin/events/scheduled-detail?event_id=",
  event_start_stop: "/admin/events/start-stop-schedule-content",
  update_Stream_time: "/admin/events/update-stream-time",
  recorded_schedule_content: "/admin/events/recorded-scheduled-content?",
  content_listing: "admin/events/scheduled-content-listing?",
  update_content_request: "admin/events/update-schedule-content",
  content_detail: "admin/content/content-detail?content_id=",
};

export const getEventListingApi = (params) => {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return getApi(`${route.event_listing}${queryString}`);
};

export const deleteScheduleContentAPI = (params) => {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return deleteApi(`${route.delete_schedule_content}${queryString}`);
};

export const updateEventRequestApi = (payload) => patchApi(route.update_event_request, payload);

export const getEventDetailApi = (eventId) => getApi(route.content_event_detail + eventId);

export const getContentListingApi = (params) => {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return getApi(`${route.event_listing}${queryString}`);
};

export const updateContentRequestApi = (payload) => patchApi(route.update_content_request, payload);

export const getContentDetailApi = (contentId) => getApi(route.content_detail + contentId);

export const eventStartStopApi = (payload) => postApi(route.event_start_stop, payload);

export const recordScheduleContentApi = (params) => {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return getApi(`${route.recorded_schedule_content}${queryString}`);
};

export const checkAvailabilityApi = (params) => {
  const queryString = params instanceof URLSearchParams ? params.toString() : params;
  return getApi(`${route.availability}${queryString}`);
};

export const updateStreamTime = (payload) => patchApi(route.update_Stream_time, payload);

