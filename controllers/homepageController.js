let modPost = require('../models/post');
let modUser = require('../models/user');

exports.getHomePage = function(req,res,next){
    let post = modPost.getRecentPostRe();
    let prof = modUser.getUserByID(1);

    Promise.all([post,prof]).then((data)=>{
        res.render('homepage', {pageTitle:'HomePage',
        profile: data[1].rows[0],
        signedIn:true,
        postList: data[0].rows});
    });
}