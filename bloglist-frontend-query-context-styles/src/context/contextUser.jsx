import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET": {
      return action.user;
    }
    default:
      return state;
  }
};
const initialState = null;

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};
export const useDispatchUser = () => {
  const { dispatch } = useContext(UserContext);
  return dispatch;
};
