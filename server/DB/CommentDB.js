const Comment = require("../models/CommentModel");
const CommentDB = require("./dbUtils")(Comment);

module.exports = CommentDB;
