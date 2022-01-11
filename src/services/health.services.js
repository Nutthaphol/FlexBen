import { httpClient } from "./httpClient";

const getHealthProfile = async (id) => {
  const res = await httpClient
    .get("health/getHealthProfile/" + id)
    .then((response) => {
      return response.data;
    });
  return res;
};

const getAllHealth = async () => {
  const res = await httpClient
    .get("/health/getAllhealthInfo")
    .then((response) => {
      return response.data;
    });

  return res;
};

export default {
  getHealthProfile,
  getAllHealth,
};
