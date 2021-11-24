import { httpClient } from "./httpClient";

const getAllTravelCategory = () => {
  return httpClient.get("travelCategory");
};

export default {
  getAllTravelCategory,
};
