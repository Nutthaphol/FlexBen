import { httpClient } from "./httpClient";

const getAllMainCategory = () => {
  const res = httpClient.get("mainCategory");
  console.log(`service ${res}`);
  return res;
};

export default {
  getAllMainCategory,
};
