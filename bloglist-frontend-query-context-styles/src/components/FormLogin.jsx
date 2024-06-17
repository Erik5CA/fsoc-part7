import { useState } from "react";
import { login } from "../services/login";
import { setToken } from "../services/blogs";
import { useDispatchUser } from "../context/contextUser";
import { useNotification } from "../context/contextNotification";
import { useNavigate } from "react-router-dom";

export const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { notification } = useNotification();
  const dispatchUser = useDispatchUser();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      dispatchUser({ type: "SET", user });
      setPassword("");
      setUsername("");
      navigate("/");
    } catch (exepction) {
      notification("ERROR", exepction.response.data.error);
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
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
        Login
      </button>
    </form>
  );
};
