import { httpClient } from "./httpClient";

const getAllItem = () => {
  const res = httpClient.get("getAllItem");
  console.log(`service ${res}`);
  return res;
};

export default {
  getAllItem,
};
