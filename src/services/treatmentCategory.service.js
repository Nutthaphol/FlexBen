import { httpClient } from "./httpClient";

const getTreatmentCategory = () => {
  const res = httpClient.get("treatmentCategory").then((response) => {
    return response.data;
  });
  return res;
};

export default {
  getTreatmentCategory,
};
