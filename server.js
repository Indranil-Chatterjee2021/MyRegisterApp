const express = require('express');
const port = 5000;
var app=express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');

app.use('/', require('./routes/pages')); 

app.listen(process.env.PORT || port , (err) => {
    if(err)
    console.log("Unable to start Server..")
    else
    console.log("Server Started Successfully at Port : " + port)
  });