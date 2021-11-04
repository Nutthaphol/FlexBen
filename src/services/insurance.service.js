import { httpClient } from "./httpClient";

const getInsurance = () => {
  const res = httpClient.get("insurance");
  console.log(`service ${res}`);
  return res;
};

export default {
  getInsurance,
};
