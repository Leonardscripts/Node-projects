const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Static Folder
app.use(express.static(`${__dirname}/dist`));

// Index Route
app.get("/", (req, res) => {
  res.render("contact");
});

const port = process.env.PORT || 5000;

app.listen(5000, () => console.log("Server started..."));
