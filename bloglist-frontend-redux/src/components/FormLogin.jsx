import { useState } from "react";
import { login } from "../services/login";
import { setToken } from "../services/blogs";
import { useDispatch } from "react-redux";
import { updateNotification } from "../store/notificationReducer";
import { setUser } from "../store/userReducer";

export const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      dispatch(setUser(user));
      setPassword("");
      setUsername("");
    } catch (exepction) {
      dispatch(
        updateNotification({
          type: "error",
          message: exepction.response.data.error,
        })
      );
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />

      <br />
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};
