const bcryptjs = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password)
    return response.status(400).send({ error: "Password is required" });
  if (password.length < 3)
    return response
      .status(400)
      .send({ error: "Password must be at least 3 characters" });

  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const id = request.params.id;

  const user = await User.findById(id).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(user);
});

module.exports = usersRouter;
