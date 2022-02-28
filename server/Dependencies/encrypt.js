const bcrypt = require("bcrypt");

const hash = (data) => {
  return bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hashSync(data, salt);
    })
    .catch((err) => Promise.reject(err));
};

const compareHash = (currentData, dbData) => {
  return bcrypt.compareSync(currentData, dbData);
};

module.exports = Object.freeze({
  hash,
  compareHash,
});
