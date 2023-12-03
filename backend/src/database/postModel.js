const DB = require("./db.js");

const getAllPosts = (filterParams) => {

  if(filterParams.post_type){
    return new Promise((resolve, reject) => {
      DB.query("SELECT * FROM posts WHERE post_type =?", filterParams.post_type, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  return new Promise((resolve, reject) => {
    DB.query("SELECT * FROM posts", (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};

const getOnePost = (postId) => {
  const sql = "SELECT * FROM posts WHERE post_id =?" ;

  return new Promise((resolve, reject) => {
    DB.query(sql, postId, (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.length <= 0) {
        reject({
          status: 400,
          message: `Can't find post with the id '${postId}'`,
        });
      } else {
        resolve(result);
      }
    });
  });
};

const getPostForUser = (userId) => {
  const sql = "SELECT * FROM posts WHERE user_id =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, userId, (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.length <= 0) {
        reject({
          status: 400,
          message: `Can't find post of the user '${userId}'`,
        });
      } else {
        resolve(result);
      }
    });
  });
};

const createNewPost = (newPost) => {
  const sql = "INSERT INTO posts SET ?";

  return new Promise((resolve, reject) => {
    DB.query(sql, newPost, (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(newPost);
    });
  });
};

const updateOnePost = (postId, changes) => {
  const sql = "SELECT * FROM posts WHERE post_id =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, postId, (error, rows, fields) => {
      if (error) {
        return reject(error);
      }

      if (rows.length <= 0) {
        reject({
          status: 400,
          message: `Can't find post with the id '${postId}'`,
        });
      } else {
        const updatedPost = {
          ...rows[0],
          ...changes,
        };

        DB.query(
          "UPDATE posts SET ? WHERE post_id =?",
          [updatedPost, postId],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(updatedPost);
          }
        );
      }
    });
  });
};

const deleteOnePost = (postId) => {
  const sql = "SELECT * FROM posts WHERE post_id =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, postId, (error, rows, fields) => {
      if (error) {
        return reject(error);
      }

      if (rows.length <= 0) {
        reject({
          status: 400,
          message: `Can't find post with the post_id '${postId}'`,
        });
      } else {
        DB.query(
          "DELETE FROM posts WHERE post_id = ?",
          postId,
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

const deletePostForUser = (userId) => {
  const sql = "SELECT * FROM posts WHERE user_id =? ";

  return new Promise((resolve, reject) => {
    DB.query(sql, userId, (error, rows, fields) => {
      if (error) {
        return reject(error);
      }

      if (rows.length <= 0) {
        reject({
          status: 400,
          message: `Can't find post with the user_id '${userId}'`,
        });
      } else {
        DB.query(
          "DELETE FROM posts WHERE user_id = ?",
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
  getAllPosts,
  getOnePost,
  getPostForUser,
  createNewPost,
  updateOnePost,
  deleteOnePost,
  deletePostForUser
};
