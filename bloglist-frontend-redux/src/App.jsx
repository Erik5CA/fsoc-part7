import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import { setToken } from "./services/blogs";
import { FormLogin } from "./components/FormLogin";
import { FormCreateBlog } from "./components/FormCreateBlog";
import "./index.css";
import Toggeable from "./components/Toggeable";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initBlogs } from "./store/blogReducer";
import { setUser } from "./store/userReducer";

const App = () => {
  const blogFormRef = useRef();

  const { notification, error } = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userLog = JSON.parse(loggedUserJSON);
      dispatch(setUser(userLog));
      setToken(userLog.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
  };

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        {error && <p className="error">{error}</p>}
        <FormLogin />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      {notification && <p className="message">{notification}</p>}

      <form>
        {user.username} logged in{" "}
        <button id="logout" onClick={handleLogout}>
          logout
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <Toggeable buttonLabel="create new blog" ref={blogFormRef}>
        <FormCreateBlog createBlog={addBlog} />
      </Toggeable>

      <div className="blogs">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
