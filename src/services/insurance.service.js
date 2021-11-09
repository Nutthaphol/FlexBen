import { httpClient } from "./httpClient";

const getInsurance = () => {
  const res = httpClient.get("insurance");
  console.log(`service ${res}`);
  return res;
};

const getDetailInsurance = (id) => {
  const res = httpClient.get("insurance/" + id);
  return res;
};

export default {
  getInsurance,
  getDetailInsurance,
};
