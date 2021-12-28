import { httpClient } from "./httpClient";

const getHealthCheck = async (id) => {
  const res = await httpClient
    .get("healthCheck/getHealthCheck/" + id)
    .then((response) => {
      if (response.data) {
        return response.data.time.at(-1);
      }
      return false;
    });
};

const getLastHealthCheck = async (id) => {
  const res = await httpClient
    .get("healthCheck/getHealthCheckUser/" + id)
    .then((response) => {
      if (response.data) {
        return response.data.time.at(-1);
      }
      return false;
    });

  const data = res;
  return data;
};

export default {
  getLastHealthCheck,
};
