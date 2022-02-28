const UserDB = require("../DB/UserDB");

const saveUserToDB = (userObj) => {
  return UserDB.insertOne(userObj)
    .then((user) => user)
    .catch((err) => {
      return Promise.reject(err);
    });
};
const getUser = (query = {}, requirement = {}) => {
  return UserDB.findOne(query, requirement)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = {
  saveUserToDB,
  getUser,
};
