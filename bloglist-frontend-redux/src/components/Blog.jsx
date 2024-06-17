import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogBy, updateLikesFor } from "../store/blogReducer";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLikes = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    };
    dispatch(updateLikesFor(blog.id, newBlog));
  };

  const handleDelete = () => {
    const response = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (response) {
      dispatch(deleteBlogBy(blog.id));
    }
  };

  return (
    <div className="blog">
      <div className="title">
        {blog.title} {blog.author}
        <button id="view" onClick={() => setView(!view)}>
          {view ? "hide" : "view"}
        </button>
      </div>
      {view && (
        <div className="otherFields">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{" "}
            <button id="like" onClick={handleLikes}>
              like
            </button>
          </p>
          <p>{blog.user.username}</p>
          {user?.username === blog.user.username && (
            <button id="remove" onClick={handleDelete}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
