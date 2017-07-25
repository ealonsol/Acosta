const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req,res) => {
        /*req.body.email;
        req.body.username;
        req.body.password;*/
        if(!req.body.email){
            res.json({success:false, message:'No proveyo un email'})
        }
        else{
            res.send('hello word');
        }
        
    });
    return router;
}