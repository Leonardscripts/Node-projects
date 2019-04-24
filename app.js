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
 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
  host: "main.mikemedia.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'test@mike.com', // generated ethereal user
    pass: testAccount.pass // generated ethereal password
  }
});

// send mail with defined transport object
let info = await transporter.sendMail({
  from: '"Fred Foo 👻" <foo@example.com>', // sender address
  to: "bar@example.com, baz@example.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>" // html body
});

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});


app.listen(3000, () => console.log("Server started..."));
