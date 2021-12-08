import { httpClient } from "./httpClient";

const getAllDelivery = () => {
  return httpClient.get("getAllDelivery");
};

export default {
  getAllDelivery,
};
