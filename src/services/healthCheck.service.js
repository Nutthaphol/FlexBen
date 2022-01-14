import { httpClient } from "./httpClient";

const getHealthCheck = async (id) => {
  const res = await httpClient
    .get("healthCheck/getHealthCheckUser/" + id)
    .then((response) => {
      return response.data;
    });
  return res;
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

const getAllHealthCheck = async () => {
  const res = await httpClient
    .get("healthCheck/getAllHealthCheck")
    .then((response) => {
      return response.data;
    });

  return res;
};

export default {
  getLastHealthCheck,
  getHealthCheck,
  getAllHealthCheck,
};
