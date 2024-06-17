import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
export const getBlogById = (blogId) => {
  const request = axios.get(`${baseUrl}/${blogId}`);
  return request.then((response) => response.data);
};

export const addComment = (blogId, comment) => {
  const request = axios.post(`${baseUrl}/${blogId}/comments`, { comment });
  return request.then((response) => response.data);
};

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateLikes = async (blogId, newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${blogId}`, newBlog, config);
  return response.data;
};

export const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
};
