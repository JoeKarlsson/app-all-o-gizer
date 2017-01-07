const express = require('express');
const send = require('./routes/send');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use('/send', send);

// app.get('/',function(req,res){
// 	res.sendfile('index.html');
// });


app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});
