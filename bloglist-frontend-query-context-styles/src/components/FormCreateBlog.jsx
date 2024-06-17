import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { create } from "../services/blogs";
import { useNotification } from "../context/contextNotification";

export const FormCreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const { notification } = useNotification();

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleCreate = async (event) => {
    event.preventDefault();
    createBlog();
    newAnecdoteMutation.mutate(
      { title, author, url },
      {
        onSuccess: () => {
          notification("MESSAGE", `a new blog ${title} by ${author} added`);
        },
        onError: (error) => {
          notification("ERROR", error.message);
        },
      }
    );
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <form className="form-create" onSubmit={handleCreate}>
      <h1>Create new</h1>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />

      <label htmlFor="author">Author</label>
      <input
        id="author"
        type="text"
        name="author"
        placeholder="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />

      <label htmlFor="url">Url</label>
      <input
        id="url"
        type="text"
        name="url"
        placeholder="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />

      <button id="create">Create</button>
    </form>
  );
};
