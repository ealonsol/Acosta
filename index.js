const express = require('express');
const app = express();
const mongoose= require('mongoose');
const config = require('./config/database');

const path = require('path');

mongoose.Promise = global.Promise;

mongoose.connect(config.uri, (err)=>{
  if(err){
    console.log('No conectado a la base de datos ' + config.db, err);
  }
  else{
    console.log('Conectado a la base de datos'+ config.db );
  }
});

app.use(express.static(__dirname+'/client/dist'));

app.get('*', (req, res)=>{
  //res.send('<h1>hello world</h1>');
  res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

app.listen(3000,()=>{
  console.log('Listeing en el puerto 3000');
});