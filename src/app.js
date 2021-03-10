/**
 * App
 */
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const api = require("./api");
const { notFound, errorHandler } = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "PORTAL/AGNSuporte ...Loading!",
  });
});

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
