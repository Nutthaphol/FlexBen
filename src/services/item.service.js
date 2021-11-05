import { httpClient } from "./httpClient";

const getItem = () => {
  const res = httpClient.get("item");
  console.log(`service ${res}`);
  return res;
};

export default {
  getItem,
};
