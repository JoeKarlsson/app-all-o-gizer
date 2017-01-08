const express = require('express');
const nodemailer = require("nodemailer");
const messages = require('../messages');
const router = express.Router();

/*
  Here we are configuring our SMTP Server details.
  STMP is mail server which is responsible for sending and recieving email.
*/
const smtpTransport = nodemailer.createTransport("SMTP",{
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.email,
        pass: process.env.pass,
    },
    tls: {rejectUnauthorized: false},
    debug: true,
});

const randomMessage = (messagesArr) => {
  return messagesArr[Math.floor(Math.random()*messagesArr.length)];
}

router.route('/')
  .get(function(req,res){
    let mailOptions={
      to : req.query.to,
      subject : messages[0].subject,
      text : randomMessage(messages).body,
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
        res.end("error");
      } else {
        console.log("Message sent: " + response.message);
        res.end("sent");
      }
  });
});

module.exports = router;