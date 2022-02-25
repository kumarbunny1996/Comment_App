require("dotenv/config");

let { DB_CONNECTION_URL } = process.env;

module.exports = {
  DB_CONNECTION_URL,
};
