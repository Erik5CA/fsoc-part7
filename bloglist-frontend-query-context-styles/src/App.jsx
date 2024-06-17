import { useEffect } from "react";
import { setToken } from "./services/blogs";
import { FormLogin } from "./components/FormLogin";
import "./index.css";
import { useNotification } from "./context/contextNotification";
import { useDispatchUser, useUser } from "./context/contextUser";
import { Router } from "./router/router";
import { Navbar } from "./components/Navbar";

const App = () => {
  const user = useUser();
  const dispatchUser = useDispatchUser();

  const {
    state: { error },
  } = useNotification();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userLog = JSON.parse(loggedUserJSON);
      dispatchUser({ type: "SET", user: userLog });
      setToken(userLog.token);
    }
  }, []);

  if (user === null) {
    return (
      <div className="container">
        <div className="login-container">
          <h1>Log in to application</h1>
          {error && <p className="error">{error}</p>}
          <FormLogin />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h2 className="main-title">Blog App</h2>

      <Router />
    </div>
  );
};

export default App;
