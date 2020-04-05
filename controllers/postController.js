let mod = require('../models/post');
let modUser = require('../models/user');

exports.addPost = function(req,res,next) {
    
    let uid = req.cookies.userid;
    let top = req.body.topic;
    let titl = req.body.title;
    let txt = req.body.text;
    
    if(top === "" || titl === "" || txt === "") {
        res.redirect(301, '/homepage?postNotComplete=666');
        return;
    } else {
        let newPost = {
            userID: uid,
            topic: top,
            title: titl,
            text: txt
         }
         mod.add(newPost);
         res.redirect(301, '/homepage');
    }


}

exports.getPost = function(req,res,next) {

    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }
    
    let id = req.params.id;
    let post = mod.getpost(id);
    post.then((data) => {
        res.render('posts', {postList: data.rows});
    });
}
exports.getRecentPosts = function(req,res,next){

    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }
    let post = mod.getRecentPostRe();
    let prof = mod.tempProf();

    Promise.all([post,prof]).then((data)=>{
        res.render('homepage', {pageTitle:'HomePage',
        profile: data[1].rows[0],
        signedIn:true,
        postList: data[0].rows});
    });
}

exports.addReply = function(req,res,next){
    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }
    if(req.body.replyText === "")
        return;

    let data = {
        postID: req.body.postID,
        userID: req.cookies.userid,
        text: req.body.replyText
    }
    let post = mod.addReply(data);
    post.then((data)=>{
        if (req.headers.referer.includes('homepage')){
            res.redirect(301, '/homepage');
        } else if (req.headers.referer.includes('search')){
            res.redirect(301, '/search');
        }
    })
}
