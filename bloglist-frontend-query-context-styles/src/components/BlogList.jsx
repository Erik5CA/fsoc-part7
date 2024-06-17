import { useRef } from "react";
import { useNotification } from "../context/contextNotification";
import Toggeable from "../components/Toggeable";
import { FormCreateBlog } from "../components/FormCreateBlog";
import Blog from "../components/Blog";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/blogs";
import { Link } from "react-router-dom";

export const BlogList = () => {
  const blogFormRef = useRef();

  const {
    state: { error, message },
  } = useNotification();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
    retry: 1,
  });

  const addBlog = () => {
    blogFormRef.current.toggleVisibility();
  };

  if (result.isLoading) {
    return (
      <div className="container">
        {" "}
        <p>loading data...</p>
      </div>
    );
  }
  const blogs = result.data.sort((a, b) => b.likes - a.likes);
  return (
    <div className="container">
      <div className="blog-list">
        {message && <p className="message">{message}</p>}

        {error && <p className="error">{error}</p>}

        <Toggeable buttonLabel="Create new blog" ref={blogFormRef}>
          <FormCreateBlog createBlog={addBlog} />
        </Toggeable>

        <div className="blogs">
          {blogs.map((blog) => (
            <div className="blog" key={blog.id}>
              <Link className="blog-link" to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
