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
    host: "smtp.gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mikey12349876@gmail.com", // generated ethereal user
      pass: "survivor1" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" <test@mike.com>', // sender address
    to: "mikey12349876@gmail.com", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.render("contact", { msg: "Email has been sent" });
  });
});

app.listen(5000, () => console.log("Server started..."));
