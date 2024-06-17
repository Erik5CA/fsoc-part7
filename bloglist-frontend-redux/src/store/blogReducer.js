import { createSlice } from "@reduxjs/toolkit";
import { create, deleteBlog, getAll, updateLikes } from "../services/blogs";
import { updateNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addNewBlog(state, action) {
      return [...state, action.payload];
    },
    updateBlog(state, action) {
      const newBlogs = state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
      const sorted = newBlogs.sort((a, b) => b.likes - a.likes);
      return sorted;
    },
    deleteBlogById(state, action) {
      const newBlogs = state.filter((blog) => blog.id !== action.payload);
      return newBlogs;
    },
  },
});

export const { setBlogs, addNewBlog, updateBlog, deleteBlogById } =
  blogSlice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const response = await getAll();
    const sorted = response.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sorted));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const response = await create(newBlog);
      dispatch(addNewBlog(response));
      dispatch(
        updateNotification({
          type: "message",
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        })
      );
    } catch (error) {
      dispatch(
        updateNotification({
          type: "error",
          message: error.response.data.error,
        })
      );
    }
  };
};

export const updateLikesFor = (blogId, blog) => {
  return async (dispatch) => {
    const response = await updateLikes(blogId, blog);
    dispatch(updateBlog(response));
  };
};

export const deleteBlogBy = (blogId) => {
  return async (dispatch) => {
    await deleteBlog(blogId);
    dispatch(deleteBlogById(blogId));
  };
};

export default blogSlice.reducer;
