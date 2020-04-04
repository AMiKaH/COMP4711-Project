let modPost = require('../models/post');

exports.searchByKeyword = function(req,res,next) {
    let page = req.cookies.pageNum;
    if (req.headers.referer.includes('homepage')){
        res.cookie('pageNum',0);
        page = 0;
    }

    let keyword = req.body.search.toLowerCase();
    let post = modPost.searchPostRe(keyword,page);
    post.then((data) => {
        res.render('search', {
            postList: data.rows, 
            pageNum: page,
            signedIn:true});
    });
}

exports.searchByTopic = function(req,res,next) {
    let page = req.cookies.pageNum;
    if (req.headers.referer.includes('homepage')){
        res.cookie('pageNum',0);
        page = 0;
    }
    let topic = req.body.topic;
    let post = modPost.searchPostReByTopic(topic,page);
    post.then((data) => {
        res.render('search', {
            postList: data.rows, 
            pageNum: page,
            signedIn:true});
    });
}