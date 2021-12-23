import { httpClient } from "./httpClient";

const getHealthCheck = async (id) => {
  const res = await httpClient.get("getHealthCheck/" + id).then((response) => {
    if (response.data) {
      return response.data.time.at(-1);
    }
    return false;
  });
};

const getLastHealthCheck = async (id) => {
  const res = await httpClient
    .get("getHealthCheckUser/" + id)
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
