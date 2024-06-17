import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ERROR": {
      return {
        ...state,
        error: action.message,
      };
    }
    case "MESSAGE": {
      return {
        ...state,
        message: action.message,
      };
    }
    case "CLEAR": {
      return {
        error: null,
        message: null,
      };
    }
    default:
      return state;
  }
};

const initialState = {
  error: null,
  message: null,
};

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const { state, dispatch } = useContext(NotificationContext);
  const notification = (type, message) => {
    dispatch({ type, message });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
  };
  return { state, notification };
};

export const useDispatchNotification = () => {
  const { dispatch } = useContext(NotificationContext);
  return dispatch;
};
