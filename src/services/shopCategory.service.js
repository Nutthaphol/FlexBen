import { httpClient } from "./httpClient";

const getAllShopCategory = () => {
  return httpClient.get("shopCategory");
};

export default {
  getAllShopCategory,
};
