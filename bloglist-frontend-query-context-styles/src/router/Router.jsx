import { Routes, Route } from "react-router-dom";
import { BlogList } from "../components/BlogList";
import { Users } from "../components/Users";
import { User } from "../components/User";
import Blog from "../components/Blog";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </>
  );
};
