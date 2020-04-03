let mod = require('../models/post');
let modUser = require('../models/user');

exports.addPost = function(req,res,next) {

    let uid = 1;//req.body.userID;
    let top = req.body.topic;
    let titl = req.body.title;
    let txt = req.body.text;
    
    if(top === "" || titl === "" || txt === "")
        return;

    let newPost = {
       userID: uid,
       topic: top,
       title: titl,
       text: txt
    }
 
    mod.add(newPost);
    res.redirect(301, '/homepage');
}

exports.getPost = function(req,res,next) {
    let id = req.params.id;
    let post = mod.getpost(id);
    post.then((data) => {
        res.render('posts', {postList: data.rows});
    });
}
exports.getRecentPosts = function(req,res,next){
    let post = mod.getRecentPostRe();
    let prof = mod.tempProf();

    Promise.all([post,prof]).then((data)=>{
        res.render('homepage', {pageTitle:'HomePage',
        profile: data[1].rows[0],
        signedIn:true,
        postList: data[0].rows});
    });
}
