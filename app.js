require("dotenv/config");
const express = require("express");
const app = express();
const port = 8000;

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const moduleFormatError = require("./formatError");
const formatError = moduleFormatError.formatError;
const errorName = moduleFormatError.errorName;

app.use(bodyParser.json());
app.use(cors());

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
      console.log("connect to port http://localhost/", port);

      require("./services/socket.io")(app, server);
    });

    app.use("/graphql", (req, res) => {
      graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
        context: { errorName },
        customFormatErrorFn: err => {
          return formatError.getError(err);
        }
      })(req, res);
    });
  })
  .catch(err => {
    console.log(err);
  });
