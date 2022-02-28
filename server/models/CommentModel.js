const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel;
