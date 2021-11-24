import { httpClient } from "./httpClient";

const getAllItem = () => {
  const res = httpClient.get("getAllItem");
  console.log(`service ${res}`);
  return res;
};

const getDetailItem = (id) => {
  const res = httpClient.get("item/" + id);
  return res;
};

export default {
  getAllItem,
  getDetailItem,
};
