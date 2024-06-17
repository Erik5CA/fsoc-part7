import { Link } from "react-router-dom";
import { useUser } from "../context/contextUser";

export const Navbar = () => {
  const user = useUser();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
  };
  return (
    <nav className="nav">
      <ul className="nav-container">
        <li className="nav-link">
          <Link to={"/"}>Blogs</Link>
        </li>
        <li className="nav-link">
          <Link to={"/users"}>Users</Link>
        </li>
      </ul>
      <form>
        {user.username} logged in{" "}
        <button id="logout" onClick={handleLogout}>
          Logout
        </button>
      </form>
    </nav>
  );
};
