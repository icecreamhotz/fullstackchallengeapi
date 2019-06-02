const Locker = require("../../models/locker");

const allLockers = async () => {
  try {
    return Locker.find({})
      .populate("size")
      .populate("user")
      .sort({ locker: "asc" });
  } catch (err) {
    throw new Error(err);
  }
};  

module.exports = {
  lockers: async () => {
    return allLockers();
  },
  rentLocker: args => {
    return new Promise(async (resolve, reject) => {
      const result = await Locker.findById({ _id: args._id }, (err, locker) => {
        if (err) reject(err);
        locker.income = args.income + locker.income;
        locker.timeout = args.timeout;
        locker.status = args.status;
        locker.user = args.user;
        locker
          .save()
          .then(async lockerItem => {
            const lockers = await allLockers();
            resolve(lockers);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }
};
