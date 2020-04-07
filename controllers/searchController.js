let modPost = require('../models/post');
let parse= require('./parse');

exports.searchByKeyword = function(req,res,next) {
    let page = req.cookies.pageNum;
    
    if (req.headers.referer.includes('homepage')){
        res.cookie('pageNum',0);
        page = 0;
    }
    
    let keyword = req.body.search.toLowerCase();
    if(keyword == ""){
        res.render('search', {
            pageNum: 0,
            signedIn:true,
            pageTitle: 'Search', 
            searchError: true});
            return;
    } else {
        let post = modPost.searchPostRe(keyword,page);
        post.then((data) => {
            let key = req.body.search.toLowerCase()
            parse.parsePosts(data.rows,key);
            res.render('search', {
                postList: data.rows, 
                pageNum: page,
                pageTitle: 'Search', 
                signedIn:true});
            return;
        }).catch(function(error){
            res.redirect(301,'/homepage');
            console.log(error);
        });;
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
        
        parse.parsePosts(data.rows,"",req.body.topic.toLowerCase());
        res.render('search', {
            postList: data.rows, 
            pageNum: page,
            signedIn:true});
    }).catch(function(error){
        res.redirect(301,'/homepage');
        console.log(error);
    });;
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
        parse.parsePosts(data.rows,"","",req.query.userid);
        res.render('search', {
            postList: data.rows, 
            pageNum: page,
            signedIn:true});
    }).catch(function(error){
        res.redirect(301,'/homepage');
        console.log(error);
    });
}