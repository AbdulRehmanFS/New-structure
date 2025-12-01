import { deleteApi } from "@services/api/methods";

const route = {
  delete_schedule_content: "admin/events/remove-creator-scheduled-content?",
};

export const deleteScheduleContentAPI = (params) =>
  deleteApi(route.delete_schedule_content + params);

