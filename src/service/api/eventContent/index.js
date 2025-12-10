
import { deleteApi, getApi, patchApi, postApi } from "../methods";

const route = {
  availability:"/live/check-schedule-availability?",
  event_listing:"admin/events/scheduled-listing?",
  // event_listing: "admin/events/event-listing?",
  // delete_schedule_content: "admin/events/remove-creator-events?", old
   delete_schedule_content: "admin/events/remove-creator-scheduled-content?", //new 
  //update_event_request: "admin/events/update-event-request",//old
  update_event_request: "admin/events/update-schedule-content",
  content_event_detail:"/admin/events/scheduled-detail?event_id=",//new 
  // event_detail: "admin/events/event-detail?event_id=",
  event_start_stop:"/admin/events/start-stop-schedule-content",
  update_Stream_time:"/admin/events/update-stream-time",
  recorded_schedule_content:"/admin/events/recorded-scheduled-content?",
  content_listing: "admin/events/scheduled-content-listing?", // "admin/podcast-listing?listing_type=",
  //update_content_request: "admin/events/update-scheduled-content-request", // "admin/update-podcast-request", old api
  update_content_request: "admin/events/update-schedule-content", // "admin/update-podcast-request", new api
  content_detail: "admin/events/scheduled-content-detail?content_id=" // "admin/podcast-detail?podcastId=",
};

export const getEventListingApi = (payload) => getApi(`${route.event_listing + payload}`);

export const deleteScheduleContentAPI = (params) =>
  deleteApi(route.delete_schedule_content + params);

export const updateEventRequestApi = (payload) => patchApi(route.update_event_request, payload);

export const getEventDetailApi = (eventId) => getApi(route.content_event_detail + eventId);

export const getContentListingApi = (payload) => getApi(`${route.event_listing + payload}`);

export const updateContentRequestApi = (payload) => patchApi(route.update_content_request, payload);

export const getContentDetailApi = (podcastId) => getApi(route.content_event_detail + podcastId);

export const eventStartStopApi=(payload)=>postApi(route.event_start_stop,payload)

export const recordScheduleContentApi=(payload)=>getApi(`${route.recorded_schedule_content+payload}`);

export const checkAvailabilityApi=(payload)=>getApi(`${route.availability}${payload}`)

export const updateStreamTime=(payload)=>patchApi(route.update_Stream_time,payload)