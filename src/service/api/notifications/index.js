import { postApi } from "../methods";

const route = {
  send_notification: "admin/send-notification"
};

export const sendNotificationApi = (payload) => postApi(route.send_notification, payload);
