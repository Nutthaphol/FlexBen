import { httpClient } from "./httpClient";

const getDepartment = () => {
  return httpClient.get("departments");
};

export default {
    getDepartment,
};
