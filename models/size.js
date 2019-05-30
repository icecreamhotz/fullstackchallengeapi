const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  _id: Schema.Types.ObjectId,
  size: {
    type: String,
    required: true
  },
  perhour: {
    type: Number
  },
  nextminute: {
    type: Number
  }
});

module.exports = mongoose.model("Sizes", schema);
