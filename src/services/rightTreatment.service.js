import { httpClient } from "./httpClient";

const getAllRightTreatment = () => {
  const res = httpClient
    .get("RightTreatmen/getAllRightTreatment")
    .then((response) => {
      return response.data;
    });
  return res;
};

export default {
  getAllRightTreatment,
};
