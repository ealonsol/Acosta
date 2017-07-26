module.exports = (router) => {

    const User = require('../models/user');

    router.post('/register', (req,res) => {
        if(!req.body.email){
            res.json({success:false, message:'No ingresó un email'})
        }
        else{
            if(!req.body.username){
                res.json({success:false, message:'No ingresó un username'})
            }
            else{
                if(!req.body.password){
                    res.json({success:false, message:'No ingresó un password'})
                }
                else{
                    let user = new User({
                        username: req.body.username.toLowerCase(),
                        password:req.body.password.toLowerCase(),
                        email:req.body.email
                    });
                    user.save((err)=>{
                        if(err){
                            if(err.code === 11000){
                                res.json({sucess:false, message:'Usuario o email existe'});    
                            }else{
                                if(err.errors){
                                    if(err.errors.email){
                                        res.json({sucess:false, message:err.errors.email.message});    
                                    }
                                }
                                else{
                                    res.json({sucess:false, message:'No se grabó el usuario. Error: ', err});
                                }
                            }
                        }
                        else{
                            res.json({sucess:true, message:'Se grabó el usuario '});
                        }
                    });
                }
            }
        }
    });
    return router;
}