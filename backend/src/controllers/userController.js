const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.send({ status: "OK", data: allUsers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneUser = async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':userId' can not be empty" },
    });
  }
  try {
    const user = await userService.getOneUser(userId);
    if (user != "") res.send({ status: "OK", data: user });
    else
      res.status(400).send({
        status: "FAILED",
        data: { error: "No exist user with that user_id" },
      });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;

  if (
    !body.email ||
    !body.user_name ||
    !body.password
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'email', 'user_name', 'password'",
      },
    });
    return;
  }

  const newUser = {
    email: body.email,
    user_name: body.user_name,
    password: body.password,
    google_id: 'N/A',
    github_id: 'N/A',
  };

  try {
    const createdUser = await userService.createNewUser(newUser);
    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const loginUser = async (req, res) => {
  const { body } = req;

  if (!body.email || !body.password) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'email', 'password'",
      },
    });
    return;
  }
  const data = {
    email: body.email,
    password: body.password,
  };

  try {
    const loggedUser = await userService.loginUser(data);
    res.status(201).send({ status: "OK", data: loggedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneUser = async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;
  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':userId' can not be empty" },
    });
  }

  try {
    const updatedUser = await userService.updateOneUser(userId, body);
    res.send({ status: "OK", data: updatedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneUser = async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (!userId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':userId' can not be empty" },
      });
  }

  try {
    await userService.deleteOneUser(userId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  loginUser,
  updateOneUser,
  deleteOneUser,
};
