const User = require("../../models/user");
const mongoose = require("mongoose");
const locker = require("./locker");
const Locker = require("../../models/locker");

module.exports = {
  createUserAndRentLocker: async ({ ...args }, { errorName }) => {
    return new Promise(async (resolve, reject) => {
      await Locker.findOne({ _id: args.locker._id }, (err, locker) => {
        if (locker.status === "1") {
          reject(new Error(errorName.UNAVAILABLE_LOCKER));
        }
      })
        .then(async () => {
          let socketIO = global.socketIO;
          await User.findOne({ telephone: args.locker.telephone }).then(
            async user => {
              const data = {
                _id: args.locker._id,
                income: args.locker.income,
                timeout: args.locker.timeout,
                status: args.locker.status,
                user: user._id
              };
              if (user) {
                const lockers = await locker.rentLocker(data);
                socketIO.sockets.emit("lockers", lockers);
                resolve(lockers);
              }
              const createUser = new User({
                _id: new mongoose.Types.ObjectId(),
                telephone: args.user.telephone
              });
              createUser
                .save()
                .then(async () => {
                  const lockers = await locker.rentLocker(data);
                  socketIO.sockets.emit("lockers", lockers);
                  resolve(lockers);
                })
                .catch(err => {
                  reject(new Error(err));
                });
            }
          );
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }
};
