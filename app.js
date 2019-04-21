const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

// View engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Static folder
app.use("/dist", express.static(path.join(__dirname, "dist")));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  const output = `
 <p>You have a new contact request</p>
 <h3>Contact Details</h3>
 <ul>
 <li>Name: ${req.body.name}</li>
 <li>Name: ${req.body.company}</li>
 <li>Name: ${req.body.email}</li>
 <li>Name: ${req.body.phone}</li>
 </ul>
 <h3>Message</h3>
 <p>${req.body.message}</p>
 `;
});

app.listen(3000, () => console.log("Server started..."));
