const User = require("../models/UserModel");
const UserDB = require("./dbUtils")(User);

module.exports = UserDB;
