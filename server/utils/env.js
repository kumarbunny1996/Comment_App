require("dotenv/config");

let { DB_CONNECTION_URL, ACCESS_TOKEN_SECRET_KEY } = process.env;

module.exports = {
  DB_CONNECTION_URL,
  ACCESS_TOKEN_SECRET_KEY,
};
