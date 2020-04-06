let modPost = require('../models/post');
let parse= require('./parse');

exports.searchByKeyword = function(req,res,next) {
    let page = req.cookies.pageNum;
    
    if (req.headers.referer.includes('homepage')){
        res.cookie('pageNum',0);
        page = 0;
    }
    
    let keyword = req.body.search.toLowerCase();

    if(keyword === ""){
        res.render('search', {
            pageNum: 0,
            signedIn:true,
            pageTitle: 'Search', 
            searchError: true});
        return;
    } else {
    
    let post = modPost.searchPostRe(keyword,page);
    post.then((data) => {
        
        parse.parsePosts(data.rows);
        res.render('search', {
            postList: data.rows, 
            pageNum: page,
            signedIn:true});
    });
    }
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
        
        parse.parsePosts(data.rows);
        res.render('search', {
            postList: data.rows, 
            pageNum: page,
            signedIn:true});
    });
}

exports.searchByUserID = function(req,res,next) {
    let page = req.cookies.pageNum;
    let id = req.query.userid;
    if (req.headers.referer.includes('homepage')){
        res.cookie('pageNum',0);
        page = 0;
    }
    let post  = modPost.searchPostReByUID(id,page);
    post.then((data)=>{
        parse.parsePosts(data.rows);
        res.render('search', {
            postList: data.rows, 
            pageNum: page,
            signedIn:true});
    })
}