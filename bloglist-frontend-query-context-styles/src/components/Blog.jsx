import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  addComment,
  deleteBlog,
  getBlogById,
  updateLikes,
} from "../services/blogs";
import { useParams } from "react-router-dom";

const Blog = () => {
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const result = useQuery({
    queryKey: ["blog"],
    queryFn: () => getBlogById(id),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const blogUpdateMutation = useMutation({
    mutationFn: ({ blogId, newBlog }) => updateLikes(blogId, newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const blogDeleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const blogAddCommentMutation = useMutation({
    mutationFn: ({ blogId, comment }) => addComment(blogId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const handleLikes = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    blogUpdateMutation.mutate({ blogId: blog.id, newBlog });
  };

  const handleDelete = async () => {
    const response = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (response) {
      blogDeleteMutation.mutate(blog.id);
    }
  };

  const handleAddComent = (event) => {
    event.preventDefault();
    blogAddCommentMutation.mutate({ blogId: blog.id, comment });
    setComment("");
  };

  if (result.isLoading) {
    <div className="container">
      {" "}
      <p>loading data...</p>
    </div>;
  }

  const blog = result.data;
  console.log(blog);
  if (!blog) return;

  return (
    <div className="container">
      <div className="blog-container">
        <h1>{blog.title}</h1>
        <a className="blog-link blog-color" href={blog.url}>
          {blog.url}
        </a>
        <p>
          {blog.likes} likes <button onClick={handleLikes}>Like</button>{" "}
        </p>
        <p>
          Added by <span className="user-tag">{blog.user.username}</span>
        </p>
        <h2>Comments</h2>
        <form onSubmit={handleAddComent}>
          <input
            type="text"
            placeholder="Write your comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>Add Comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
