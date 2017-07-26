const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt= require('bcrypt-nodejs');

let emailLengthChecker = (email)=>{
  if(!email){
    return false;
  }  else{
    if(email.length < 5 || email.length>30 ){
      return false;
    } else{
      return true;
    }
  }
};

let validEmailChecker = (email)=>{
  if(!email){
    return false;
  }else{
   const regExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/);
   return regExp.test(email);
  }
};

const emailValidators=[
  {
    validator : emailLengthChecker,
    message:'Email debe ser mayor a 5 o menor a 30 caracteres'
  }
  /*{
    validator : validEmailChecker,
    message:'Email invalido'
  }*/
];

let validUsername = (username)=>{
  if(!username){
     return false;
  }else{
   const regExp = new RegExp(/^\(a-zA-Z0-9]+$/);
   return regExp.test(username);
  }
};

let userNameLengthChecker = (username)=>{
  if(!username){
    return false;
  }  else{
    if(username.length < 5 || username.length>15 ){
      return false;
    } else{
      return true;
    }
  }
};

const userNameValidators=[
  {
    validator : userNameLengthChecker,
    message:'usuario debe tener mas de 3 o menor de 15 caracteres'
  }/*,
  {
    validator : validUsername,
    message:'Username invalido'
  }*/
];

const userSchema = new Schema({
  email:{ type: String, required:true, unique: true, lowercase:true, validate:emailValidators},
  username:{ type: String, required:true, unique: true, lowercase:true, validate:userNameValidators},
  password:{ type: String, required:true},
});

userSchema.pre('save', function(next){
  if(!this.isModified('password'))
    return next();
  bcrypt.hash(this.password, null,null, (err,hash)=>{
    if(err)
      return next(err);
    this.password = hash;
    //console.log('contraseña : '+hash);
    return next();
  });
});

module.exports = mongoose.model('User', userSchema);
