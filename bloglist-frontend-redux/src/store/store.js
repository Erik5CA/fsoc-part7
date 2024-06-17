import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import blogsReducer from "./blogReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
    notification: notificationReducer,
  },
});

export default store;
