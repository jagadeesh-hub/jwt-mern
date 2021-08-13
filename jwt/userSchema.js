const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
    type: "string",
    required: true,
    lowercase: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});
module.exports = mongoose.model("User", UserSchema);
