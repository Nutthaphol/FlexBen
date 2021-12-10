import { httpClient } from "./httpClient";

const getAllFacilities = () => {
  const res = httpClient.get("getAllFacilities/");
  return res;
};

export default {
  getAllFacilities,
};
