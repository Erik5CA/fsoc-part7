import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users";
import { Link } from "react-router-dom";

export const Users = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    retry: 1,
  });
  if (result.isLoading) {
    <div className="container">
      {" "}
      <p>loading data...</p>
    </div>;
  }
  const users = result.data;
  console.log(users);
  if (!users) return;
  return (
    <div className="container">
      <div>
        <h1>Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>{" "}
                </th>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
