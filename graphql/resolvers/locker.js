const Locker = require("../../models/locker");

module.exports = {
  lockers: async () => {
    try {
      return Locker.find({})
        .populate("size")
        .sort({ locker: "asc" });
    } catch (err) {
      return err;
    }
  }
};
