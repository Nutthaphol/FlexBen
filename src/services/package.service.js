import { httpClient } from "./httpClient";

const getAllPackage = () => {
  const res = httpClient.get("package");
  console.log("service ", res);
  return res;
};

const getDetailPackage = (id) => {
  const res = httpClient.get("package/" + id);
  console.log("service ", res);
  return res;
};

export default {
  getAllPackage,
  getDetailPackage,
};
