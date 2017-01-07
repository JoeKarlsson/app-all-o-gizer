const express = require('express');
const nodemailer = require("nodemailer");

const app = express();

app.use(express.static(`${__dirname}/public`));

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/

const smtpTransport = nodemailer.createTransport("SMTP",{
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'app.all.o.gizer@gmail.com',
        pass: '^08gG5ssrVFqqIz*'
    },
    tls: {rejectUnauthorized: false},
    debug:true
});


/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
	res.sendfile('index.html');
});
app.get('/send',function(req,res){
	var mailOptions={
		to : req.query.to,
		subject : req.query.subject,
		text : req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
        	console.log("Message sent: " + response.message);
		res.end("sent");
    	 }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});
