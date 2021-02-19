// Required defintions
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan"); // Require morgan for logging
const cors = require("cors"); // Require cors to introduce extra headers for CORS
const helmet = require("helmet"); // Require helmet for secu

// Require knex for database
const options = require("./database/knex.js");
const knex = require("knex")(options);

// Define router links
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var stocksRouter = require("./routes/stocks");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("common")); // Use logging in common mode
app.use(helmet());
app.use(cors()); // Additional headers for Cross-Origin Resource Sharing

// Requesting database requires the use of knex
app.use((req, res, next) => {
  req.db = knex;
  next();
});

// URL links and their assigned router
app.use("/", indexRouter);
app.use("/stocks", stocksRouter);
app.use("/user", usersRouter);

// 404 Not Found handling for all routes
app.use(function (req, res, next) {
  res.status(404).json({
    error: true,
    message: "Not Found",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
