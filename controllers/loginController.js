let modUser = require('../models/user');
let modHome = require('../models/user');

exports.validateLogin = function(req,res,next) {
    let email = req.body.email;
    let pass = req.body.password;

    let log = modUser.userExists(email,pass);
    
    log.then((data) => {
        if(data.rows[0].cnt === "1"){
            sessionStorage.setItem('signedIn',data.rows[0]);
            let home = modHome
        }
    });
}