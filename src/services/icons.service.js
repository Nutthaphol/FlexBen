import { httpClient } from "./httpClient";

const getIconsPackageClass = () => {
  return httpClient.get("getIconsPackageClass");
};

export default {
  getIconsPackageClass,
};
