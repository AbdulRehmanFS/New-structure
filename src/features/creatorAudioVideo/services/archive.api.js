import { patchApi } from "@services/api/methods";

const route = {
  archive_creator_content: "admin/content/archive-creator-content",
  archive_creator_series: "admin/content/archive-creator-series",
};

export const archiveContentAPI = (payload) => patchApi(route.archive_creator_content, payload);
export const archiveSeriesContentAPI = (payload) => patchApi(route.archive_creator_series, payload);

