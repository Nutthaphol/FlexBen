import { httpClient } from "./httpClient";

const getBillHistoryById = (id) => {
  return httpClient.get("bill/getBillHistoryByid/" + id);
};

export default {
  getBillHistoryById,
};
