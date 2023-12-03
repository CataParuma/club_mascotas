const { v4: uuid } = require("uuid");
const userModel = require("../database/userModel");

const getAllUsers = async () => {
  try {
    const allUsers = await userModel.getAllUsers();

    return allUsers;
  } catch (error) {
    throw error;
  }
};

const getOneUser = async (userId) => {
  try {
    const user = await userModel.getOneUser(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByName = async (username) => {
  try {
    const user = await userModel.getUserByName(username);
    return user;
  } catch (error) {
    throw error;
  }
};


const getGoogleUser = async (googleId) => {
  try {
    const user = await userModel.getGoogleUser(googleId);
    return user;
  } catch (error) {
    throw error;
  }
};

const getGithubUser = async (githubId) => {
  try {
    const user = await userModel.getGithubUser(githubId);
    return user;
  } catch (error) {
    throw error;
  }
};

const createNewUser = async (newUser) => {
  const userToInsert = {
    ...newUser,
    user_id: uuid(),
    pet_name: 'N/A',
    pet_type: 'N/A',
    pet_age:'N/A',
    pet_gender:'N/A',
    join_date: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdUser = await userModel.createNewUser(userToInsert);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (data) => {
  try {
    const loggedUser = await userModel.loginUser(data);
    return loggedUser;
  } catch (error) {
    throw error;
  }
};

const updateOneUser = async (userId, changes) => {
  try {
    const updatedUser = await userModel.updateOneUser(userId, changes);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteOneUser = async (userId) => {
  try {
    await userModel.deleteOneUser(userId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getGoogleUser,
  getGithubUser,
  getUserByName,
  createNewUser,
  loginUser,
  updateOneUser,
  deleteOneUser,
};
