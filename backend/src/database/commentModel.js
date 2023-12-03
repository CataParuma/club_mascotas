const DB = require("./db.js");

const getAllComments = () => {
    const sql = "SELECT * FROM comments;";
  
    return new Promise((resolve, reject) => {
      DB.query(sql, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  };

  const getOneComment = (commentId) => {
    const sql = "SELECT * FROM comments WHERE comment_id =? ";
  
    return new Promise((resolve, reject) => {
      DB.query(sql, commentId, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result.length <= 0) {
          reject({
            status: 400,
            message: `Can't find comment with the id '${commentId}'`,
          });
        } else {
          resolve(result);
        }
      });
    });
  };

  const getCommentForUser = (userName) => {
    const sql = "SELECT * FROM comments WHERE user_name =? ";
  
    return new Promise((resolve, reject) => {
      DB.query(sql, userName, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result.length <= 0) {
          reject({
            status: 400,
            message: `Can't find comment of the user '${userName}'`,
          });
        } else {
          resolve(result);
        }
      });
    });
  };

  const getCommentForPost = (postId) => {
    const sql = "SELECT * FROM comments WHERE post_id =? ";
  
    return new Promise((resolve, reject) => {
      DB.query(sql, postId, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result.length <= 0) {
          reject({
            status: 400,
            message: `Can't find comment of the post '${postId}'`,
          });
        } else {
          resolve(result);
        }
      });
    });
  };

  const createNewComment = (newComment) => {
    const sql = "INSERT INTO comments SET ?";
  
    return new Promise((resolve, reject) => {
      DB.query(sql, newComment, (error, result) => {
        if (error) {
          return reject(error);
        }
  
        resolve(newComment);
      });
    });
  };

  const updateOneComment = (commentId, changes) => {
    const sql = "SELECT * FROM comments WHERE comment_id =? ";
  
    return new Promise((resolve, reject) => {
      DB.query(sql, commentId, (error, rows, fields) => {
        if (error) {
          return reject(error);
        }
  
        if (rows.length <= 0) {
          reject({
            status: 400,
            message: `Can't find comment with the id '${commentId}'`,
          });
        } else {
          const updatedComment = {
            ...rows[0],
            ...changes,
          };
  
          DB.query(
            "UPDATE comments SET ? WHERE comment_id =?",
            [updatedComment, commentId],
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(updatedComment);
            }
          );
        }
      });
    });
  };

  const deleteOneComment = (commentId) => {
    const sql = "SELECT * FROM comments WHERE comment_id =? ";
  
    return new Promise((resolve, reject) => {
      DB.query(sql, commentId, (error, rows, fields) => {
        if (error) {
          return reject(error);
        }
  
        if (rows.length <= 0) {
          reject({
            status: 400,
            message: `Can't find comment with the comment_id '${commentId}'`,
          });
        } else {
          DB.query(
            "DELETE FROM comments WHERE comment_id = ?",
            commentId,
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

  const deleteCommentForPost = (postId) => {
    const sql = "SELECT * FROM comments WHERE post_id =? ";
  
    return new Promise((resolve, reject) => {
      DB.query(sql, postId, (error, rows, fields) => {
        if (error) {
          return reject(error);
        }
  
        if (rows.length <= 0) {
          reject({
            status: 400,
            message: `Can't find comment with the post_id '${postId}'`,
          });
        } else {
          DB.query(
            "DELETE FROM comments WHERE post_id = ?",
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

  const deleteCommentForUser = (userId) => {
    const sql = "SELECT * FROM comments WHERE user_id =? ";
  
    return new Promise((resolve, reject) => {
      DB.query(sql, userId, (error, rows, fields) => {
        if (error) {
          return reject(error);
        }
  
        if (rows.length <= 0) {
          reject({
            status: 400,
            message: `Can't find comment with the user_id '${userId}'`,
          });
        } else {
          DB.query(
            "DELETE FROM comments WHERE user_id = ?",
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
    getAllComments,
    getOneComment,
    getCommentForUser,
    getCommentForPost,
    createNewComment,
    updateOneComment,
    deleteOneComment,
    deleteCommentForPost,
    deleteCommentForUser
};