import { httpClient } from "./httpClient";

const getHistoryProfile = (id) => {
  const res = httpClient.get("historyProfile/" + id);
  return res;
};

export default {
  getHistoryProfile,
};
