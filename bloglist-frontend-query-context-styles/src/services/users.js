import axios from "axios";
const baseUrl = "/api/users";

export const getUsers = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const getUserById = (userId) => {
  const request = axios.get(`${baseUrl}/${userId}`);
  return request.then((response) => response.data);
};
