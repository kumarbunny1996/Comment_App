const CommentDB = require("../DB/CommentDB");

const saveCommentToDB = (userObj) => {
  return CommentDB.insertOne(userObj)
    .then((user) => user)
    .catch((err) => {
      return Promise.reject(err);
    });
};
const getCommentsFromDB = (query = {}, requirement = {}) => {
  return CommentDB.findMany(query, requirement)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = {
  saveCommentToDB,
  getCommentsFromDB,
};
