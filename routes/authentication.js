module.exports = (router) => {

    const User = require('../models/user');

    router.use(function(req, res, next) {
        // do logging
        console.log('something is happening.');
        next(); // make sure we go to our next route and don't stop here
    });

    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });

    router.post('/register', (req,res) => {
        /*req.body.email;
        req.body.username;
        req.body.password;*/
        if(!req.body.email){
            res.json({success:false, message:'No proveyo un email'})
        }
        else{
            if(!req.body.username){
                res.json({success:false, message:'No proveyo un username'})
            }
            else{
                if(!req.body.password){
                    res.json({success:false, message:'No proveyo un password'})
                }
                else{
                    res.send('Bienvenido ' +req.body.username);
                    console.log(req.body.username);
                    console.log(req.body.password);
                    console.log(req.body.email);
                    let user = new User({
                        username: req.body.username.toLowerCase(),
                        password:req.body.password.toLowerCase(),
                        email:req.body.email
                    });
                    user.save((err)=>{
                        if(err){
                            res.json({sucess:false, message:'No se grabó el usuario. Error: ', err});
                            res.send();
                        }
                        else{
                            res.json({sucess:true, message:'Se grabó el usuario '});
                            res.send();
                        }
                    });
                    
                }
            }
        }
        
    });
    return router;
}