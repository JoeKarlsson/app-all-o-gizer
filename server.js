const express = require('express');
const send = require('./routes/send');

const app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const host = isDeveloping ? 'localhost' :  '0.0.0.0';

app.use(express.static(`${__dirname}/public`));
app.use('/send', send);

app.listen(port,function(){
  console.log("Express Started on Port 3000");
});
