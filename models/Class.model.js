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
  tags: [
    {
      tag1: String,
      tag2: String,
      tag3: String,
      tag4: String,
      tag5: String,
      tag6: String,
      tag7: String,
      tag8: String,
      tag9: String,
      tag10: String,
    }
  ],
});

const Class = model("Class", classSchema);

module.exports = Class;
