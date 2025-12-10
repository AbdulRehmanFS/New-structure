import {  patchApi } from "../methods";

const route={
    archive_creator_content: "/admin/content/archive-creator-content",
    archive_creator_series: "/admin/content/archive-creator-series",
    // archive_creator_events: "/admin/events/archive-creator-events", old 
    archive_creator_events: "/admin/events/archive-scheduled-content", //new

   
}

export const archiveContentAPI = (payload) => patchApi(route.archive_creator_content, payload);

export const archiveSeriesContentAPI = (payload) => patchApi(route.archive_creator_series, payload);

export const archiveEventContentAPI = (payload) => patchApi(route.archive_creator_events, payload);

