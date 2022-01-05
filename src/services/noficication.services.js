import { httpClient } from "./httpClient";

const getNotification = (id) => {
  return httpClient.get("getNotification");
};

export default {
  getNotification,
};
