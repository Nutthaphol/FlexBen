import { httpClient } from "./httpClient";

const getDetail = (id) => {
  return httpClient.get("detail/" + id);
};

export default {
  getDetail,
};
