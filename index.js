const express = require('express');
const app = express();
const mongoose= require('mongoose');
const config = require('./config/database');


console.log('la base de datos es : ' + config.db);
console.log('la ruta es : '+ config.uri);
mongoose.Promise = global.Promise;

mongoose.connect(config.uri, (err)=>{
//mongoose.connect('mongodb://localhost:27017/test', (err)=>{
  if(err){
    console.log('No conectado a la base de datos ' + config.db, err);
  }
  else{
    console.log('Conectado a la base de datos'+ config.db );
  }
});

app.get('*', (req, res)=>{
  res.send('<h1>hello world</h1>');
});

app.listen(3000,()=>{
  console.log('Listeing en el puerto 3000');
});