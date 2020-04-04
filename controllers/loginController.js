let modUser = require('../models/user');

exports.validateLogin = function(req,res,next) {

    let email = req.body.email;
    let pass = req.body.password;
    console.log(req.headers.referer)
    let log = modUser.userExists(email,pass);
    
    
    log.then((data) => {

        if (data.rows.length <= 0){
            res.render('home', { pageTitle: 'KB Login/Signup', loginError: true, heading: 'Welcome to People App'});
            return;
        }
        let id = parseInt(data.rows[0].userid);
        if(id > 0){
            res.cookie('pageNum',0);
            res.cookie('signedIn','true');
            res.cookie('userid',id)
            .redirect('/homepage');
        } else {
            return;
        }
    });
}

exports.logout = function(req,res,next){
    res.clearCookie('signedIn');
    res.clearCookie('userid');
    res.redirect(301,'/');
}
