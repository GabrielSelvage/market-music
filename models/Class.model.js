const { Schema, model } = require("mongoose");

const classSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String
  },
  price: {
    type: Number,
  },
  //  video: {
  //    type: String,
  //  },
  imageUrl: {
    type: String,
  },
  about: {
    type: String,
  },
  level: {
    type: String,
  }
});

const Class = model("Class", classSchema);

module.exports = Class;
