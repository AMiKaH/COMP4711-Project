let mod = require('../models/login');

exports.validateLogin = function(req,res,next) {
    let email = req.params.email;
    let pass = req.params.password;

    let log = mod.valid(id,pass);
    
    log.then((data) => {
        return data == 'TRUE';
    });
}