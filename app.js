require("dotenv/config");
const express = require("express");
const connect = require("./helpers/connection");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const FormatError = require("easygraphql-format-error");
const cors = require("cors");
var app = express();
const port = 8000;
const socketIO = require("socket.io");

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

app.use(bodyParser.json());
app.use(cors());

const formatError = new FormatError([
  {
    name: "TELEPHONE_HAS_EXISTS",
    message: "The email is not valid",
    statusCode: "400"
  }
]);
// pass the errorName on the context
const errorName = formatError.errorName;

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
    const server = app.listen(port, () => {
      console.log("running in port http://localhost:" + port);
    });

    const io = socketIO.listen(server);

    io.on("connection", client => {
      console.log("user connected");

      client.on("disconnect", () => {
        console.log("user disconnected");
      });

      io.sockets.emit("new-message", "ss");
    });

    app.use(
      "/graphql",
      graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
      })
    );
  })
  .catch(err => {
    console.log(err);
  });
