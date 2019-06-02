const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  _id: Schema.Types.ObjectId,
  locker: {
    type: Number,
    unique: true
  },
  size: {
    type: Schema.Types.ObjectId,
    ref: "Sizes"
  },
  income: {
    type: Number
  },
  timeout: {
    type: String
  },
  status: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  }
});

module.exports = mongoose.model("Lockers", schema);
