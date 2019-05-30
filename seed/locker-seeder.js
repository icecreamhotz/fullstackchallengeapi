require("dotenv/config");
const Lockers = require("../models/locker");
const Sizes = require("../models/size");
const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@igeargeekchallenge-ja4o1.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    Sizes.find(async (err, result) => {
      const data = result.map(size => size._id);
      let index = 1;

      for (let i = 1; i <= 12; i++) {
        await addLockerSeeder(i, data[index - 1]);
        if (index === 1) {
          index++;
        } else if (index === 2) {
          index++;
        } else {
          index = 1;
        }
      }
    });

    addLockerSeeder = (lockerNumber, sizeId) => {
      const locker = new Lockers({
        _id: new mongoose.Types.ObjectId(),
        locker: lockerNumber,
        size: sizeId,
        income: 0,
        status: 0
      });
      locker.save((err, result) => {
        if (err) return console.log(err);
        if (lockerNumber === 12) {
          mongoose.disconnect();
        }
      });
    };
  });
