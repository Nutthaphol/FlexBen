import { httpClient } from "./httpClient";

const getAllTravel = () => {
  const res = httpClient.get("getAllTravel");
  console.log(`service ${res}`);
  return res;
};

const getDetailTravel = (id) => {
  console.log("id", id);
  const res = httpClient.get("travel/" + id);
  return res;
};

export default {
  getAllTravel,
  getDetailTravel,
};
