import { httpClient } from "./httpClient";

const getTreatmentType = () => {
  const res = httpClient.get("treatmentType").then((response) => {
    return response.data;
  });
  return res;
};

export default {
  getTreatmentType,
};
