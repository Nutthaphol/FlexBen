import { httpClient } from "./httpClient";

const getUserProfile = (id) => {
  return httpClient.get("users/profile/" + id);
};

const getAllUsers = () => {
  return httpClient.get("users");
};

export default {
  getUserProfile,
  getAllUsers
};
