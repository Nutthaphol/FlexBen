import { httpClient } from "./httpClient";

const getHealthCheckCategory = async (id) => {
  const res = await httpClient.get("HealthCheckCategory").then((response) => {
    return response.data;
  });
  return res;
};

export default {
  getHealthCheckCategory,
};
