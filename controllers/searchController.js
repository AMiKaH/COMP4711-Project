let modPost = require('../models/post');

exports.searchByKeyword = function(req,res,next) {
    
    let keyword = req.body.search;
    let post = modPost.searchPostRe(keyword);
    post.then((data) => {
        res.render('search', {postList: data.rows, signedIn:true});
    });
}

exports.searchByTopic = function(req,res,next) {
    let topic = req.body.topic;
    let post = modPost.searchPostReByTopic(topic);
    post.then((data) => {
        res.render('search', {postList: data.rows, signedIn:true});
    });
}