const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 256,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  secret: {
    type: String,
    required: true,
    max: 256,
  },
  comments: {
    type: Array,
    default: () => [],
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
