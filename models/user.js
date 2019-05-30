const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  _id: Schema.Types.ObjectId,
  telephone: { type: String, required: true }
});

module.exports = mongoose.model("Users", schema);
