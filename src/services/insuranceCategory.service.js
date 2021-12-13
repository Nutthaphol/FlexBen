import { httpClient } from "./httpClient";

const getAllInsuranceCategory = () => {
  return httpClient.get("insuranceCategory");
};

export default {
  getAllInsuranceCategory,
};
