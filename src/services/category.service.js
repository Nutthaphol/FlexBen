import { httpClient } from "./httpClient";

const getCategory = () => {
  return httpClient.get("category");
};

export default {
  getCategory,
};
