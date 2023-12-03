const DB = require("./db.js");

const getAllUsers = () => {
  const sql = "SELECT * FROM users;";

  return new Promise((resolve, reject) => {
    DB.query(sql, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};

const createNewUser = (newUser) => {
  const sql = "INSERT INTO users SET ?";

  return new Promise((resolve, reject) => {
    DB.query(sql, newUser, (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(newUser);
    });
  });
};

const getOneUser = (userId) => {
  const sql = "SELECT * FROM users WHERE user_id =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, userId, (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.length <= 0) {
        reject({
          status: 400,
          message: `Can't find user with the id '${userId}'`,
        });
      } else {
        resolve(result);
      }
    });
  });
};

const getUserByName = (username) => {
  const sql = "SELECT * FROM users WHERE user_name =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, username, (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.length <= 0) {
        reject({
          status: 400,
          message: `Can't find user with the name '${username}'`,
        });
      } else {
        resolve(result);
      }
    });
  });
};

const getGoogleUser = (googleId) => {
  const sql = "SELECT * FROM users WHERE google_id =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, googleId, (error, result) => {
      if (error) {
        return reject(error);
      }
      
        resolve(result);
      
    });
  });
};

const getGithubUser = (githubId) => {
  const sql = "SELECT * FROM users WHERE github_id =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, githubId, (error, result) => {
      if (error) {
        return reject(error);
      }
      
        resolve(result);
      
    });
  });
};

const loginUser = (data) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  return new Promise((resolve, reject) => {
    DB.query(sql, [data.email, data.password], (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};



const updateOneUser = (userId, changes) => {
  const sql = "SELECT * FROM users WHERE user_id =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, userId, (error, rows, fields) => {
      if (error) {
        return reject(error);
      }

      if (rows.length <= 0) {
        reject({
          status: 400,
          message: `Can't find user with the id '${userId}'`,
        });
      } else {
        const updatedUser = {
          ...rows[0],
          ...changes,
        };

        DB.query(
          "UPDATE users SET ? WHERE user_id =?",
          [updatedUser, userId],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(updatedUser);
          }
        );
      }
    });
  });
};

const deleteOneUser = (userId) => {
  const sql = "SELECT * FROM users WHERE user_id =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, userId, (error, rows, fields) => {
      if (error) {
        return reject(error);
      }

      if (rows.length <= 0) {
        reject({
          status: 400,
          message: `Can't find user with the user_id '${userId}'`,
        });
      } else {
        DB.query(
          "DELETE FROM users WHERE user_id = ?",
          userId,
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
      }
    });
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  getOneUser,
  getGoogleUser,
  getGithubUser,
  getUserByName,
  loginUser,
  updateOneUser,
  deleteOneUser,
};
