const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
// const CONFIG = require('../config');

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

router.route('/')
  .get(function(req,res){
    console.log(process.env.email)
    console.log(process.env)
    console.log(process.env.pass)
    let mailOptions={
      to : req.query.to,
      subject : req.query.subject,
      text : req.query.text,
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