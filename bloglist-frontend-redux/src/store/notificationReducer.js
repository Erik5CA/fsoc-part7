import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    error: null,
    notification: null,
  },
  reducers: {
    setNotification(state, action) {
      if (action.payload.type === "error") {
        return {
          ...state,
          error: action.payload.message,
        };
      } else {
        return {
          ...state,
          notification: action.payload.message,
        };
      }
    },
    clearNotification(state, action) {
      return {
        error: null,
        notification: null,
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const updateNotification = (content) => {
  return (dispatch) => {
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
