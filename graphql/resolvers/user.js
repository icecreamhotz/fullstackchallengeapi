const User = require("../../models/user");
const mongoose = require("mongoose");

module.exports = {
  createUser: async args => {
    return await User.findOne({ telephone: args.user.telephone }).then(user => {
      if (user) {
        console.log("sss");
        return JSON.stringify({ _id: null, telephone: null, status: true });
      }
      const createUser = new User({
        _id: new mongoose.Types.ObjectId(),
        telephone: args.user.telephone
      });
      return createUser.save();
    });
  }
};
