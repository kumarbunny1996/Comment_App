const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../utils/env");

let accessSecretKey = ACCESS_TOKEN_SECRET_KEY;

const generateAuthToken = (payload = null, options = {}) => {
  let token = jwt.sign(payload, accessSecretKey, options);
  return `@CommentApp ${token}`;
};

const verifyToken = (token = undefined, options = {}) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessSecretKey, options, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(data);
      }
    });
  });
};

module.exports = Object.freeze({
  generateAuthToken,
  verifyToken,
});
