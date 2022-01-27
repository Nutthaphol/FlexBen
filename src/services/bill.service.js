import { httpClient } from "./httpClient";

const getBillHistoryById = (id) => {
  return httpClient.get("bill/getBillHistoryByid/" + id);
};

const getBillHistory = () => {
  return httpClient.get("bill/getBillHistory");
};

export default {
  getBillHistoryById,
  getBillHistory,
};
