let modPost = require('../models/post');
let modUser = require('../models/user');

exports.getHomePage = function(req,res,next){
    let post = modPost.getRecentPostRe();
    //TO:DO MAKE READ FROM COOKIE 
    let prof = modUser.getUserByID(1);
    Promise.all([post,prof]).then((data)=>{
        let list = parsePosts(data[0].rows);

        res.render('homepage', {pageTitle:'HomePage',
        profile: data[1].rows[0],
        signedIn:true,
        postList: data[0].rows});
    });
}

function parsePosts(rows){
    let obj 
    rows.forEach(element => {
        
    });
}