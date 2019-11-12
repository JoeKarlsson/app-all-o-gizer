const express = require("express");
const nodemailer = require("nodemailer");
const messages = require("../messages");
const router = express.Router();

/*
  Here we are configuring our SMTP Server details.
  STMP is mail server which is responsible for sending and recieving email.
*/

const smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.email,
    pass: process.env.pass
  },
  debug: true
});

const randomMessage = messagesArr => {
  return messagesArr[Math.floor(Math.random() * messagesArr.length)];
};

router.route("/").get(function(req, res) {
  let randMsg = randomMessage(messages);

  let mailOptions = {
    to: req.query.to,
    subject: randMsg.subject,
    text: randMsg.body
  };
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

module.exports = router;
