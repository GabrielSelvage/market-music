const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  occupation: {
    type: String,
  },
  dateBorn: {
    type: Date,
  },
  role: String //Student //Teacher
});

const User = model("User", userSchema);

module.exports = User;
