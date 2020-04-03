let mod = require('../models/post');

exports.addPost = function(req,res,next) {

    let uid = req.body.userID;
    let top = req.body.topic;
    let titl = req.body.title;
    let txt = req.body.text;

    let newPost = {
       userID: uid,
       topic: top,
       title: titl,
       text: txt
    }
 
    mod.add(newPost);

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
    post.then((data) => {
        res.render('homepage', {posts: data.rows});
    });
}

exports.getPosts = function(req,res,next) {
    let post = mod.getposts();
    post.then((data) => {
        res.render('posts', {});
    });
}

exports.getPostReplies = function(req,res,next) {
    let id = req.params.id;
    let post = mod.getpostreplies(id);
    post.then((data) => {
        res.render('posts', {});
    });
}
exports.getPostCount = function(req,res,next) {
    let id = req.params.id;
    let post = mod.getpostcount(id);
    post.then((data) => {
        return data;
    });
}
exports.getPostsByUser = function(req,res,next) {
    let id = req.params.id;
    let post = mod.getpostsbyuser(id);
    post.then((data) => {
        res.render('posts', {});
    });
    
}
exports.getPostsByTopic = function(req,res,next) {
    let id = req.params.id;
    let post = mod.getpostbytopic(id);
    post.then((data) => {
        res.render('posts', {});
    });
}
exports.getPostsByTitle = function(req,res,next) {
    let str = req.params.string;
    let post = mod.getpostbytitle(id);
    post.then((data) => {
        res.render('posts', {});
    });
}