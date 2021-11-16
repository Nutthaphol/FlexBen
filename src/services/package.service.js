import { httpClient } from "./httpClient";

const getAllPackage = () => {
  const res = httpClient.get("package");
  console.log("service ", res);
  return res;
};

export default {
  getAllPackage,
};
