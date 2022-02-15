import { httpClient } from "./httpClient";

const getAllHospital = () => {
  const res = httpClient.get("hospital/getAllHospitalList");
  console.log(`service ${res}`);
  return res;
};

const getHospitalById = (id) => {
  const res = httpClient.get("hospital/getHospital/" + id);
  return res;
};

export default {
  getAllHospital,
  getHospitalById,
};
