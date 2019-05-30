require("dotenv/config");
const Sizes = require("../models/size");
const mongoose = require("mongoose");

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
    const sizes = [
      new Sizes({
        _id: new mongoose.Types.ObjectId(),
        size: "S",
        perhour: 50,
        nextminute: 25
      }),
      new Sizes({
        _id: new mongoose.Types.ObjectId(),
        size: "M",
        perhour: 100,
        nextminute: 50
      }),
      new Sizes({
        _id: new mongoose.Types.ObjectId(),
        size: "L",
        perhour: 200,
        nextminute: 100
      })
    ];

    for (let i = 0; i < sizes.length; i++) {
      sizes[i].save((err, result) => {
        if (i + 1 === sizes.length) {
          mongoose.disconnect();
        }
      });
    }
  });
