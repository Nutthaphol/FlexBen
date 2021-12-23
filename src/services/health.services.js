import { httpClient } from "./httpClient";

const getHealthProfile = (id) => {
  const res = httpClient.get("healthProfile/" + id).then((response) => {
    return response.data;
  });
  return res;
};

export default {
  getHealthProfile,
};
