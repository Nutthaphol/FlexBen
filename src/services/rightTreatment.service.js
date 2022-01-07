import { httpClient } from "./httpClient";

const getAllRightTreatment = () => {
  const res = httpClient
    .get("RightTreatmen/getAllRightTreatment")
    .then((response) => {
      return response.data;
    });
  return res;
};

const getRightTreatmentByUserId = (id) => {
  const res = httpClient
    .get("RightTreatmen/getRightTreatment/" + id)
    .then((response) => {
      return response.data;
    });
  return res;
};

export default {
  getAllRightTreatment,
  getRightTreatmentByUserId,
};
