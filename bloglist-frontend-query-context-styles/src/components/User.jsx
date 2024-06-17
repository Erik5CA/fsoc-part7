import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/users";

export const User = () => {
  const { id } = useParams();
  const result = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(id),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  if (result.isLoading) {
    <div className="container">
      {" "}
      <p>loading data...</p>
    </div>;
  }
  if (result.isFetching) return;

  const user = result.data;
  console.log(user);

  return (
    <div className="container">
      <div className="user-container">
        <h1>{user.username}</h1>
        <h3>Added Blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
