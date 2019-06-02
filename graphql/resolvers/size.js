const Size = require("../../models/size");

module.exports = {
  sizes: async () => {
    try {
      const size = await Size.find();
      return size;
    } catch (err) {
      return err;
    }
  },
  createSize: async args => {
    const size = new Size({
      _id: new mongoose.Types.ObjectId(),
      size: "S",
      perhour: 50,
      nextminute: 25
    });
  }
};
