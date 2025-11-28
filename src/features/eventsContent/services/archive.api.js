import { patchApi } from "@services/api/methods";

const route = {
  archive_creator_events: "/admin/events/archive-scheduled-content",
};

export const archiveEventContentAPI = (payload) => patchApi(route.archive_creator_events, payload);

