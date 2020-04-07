let mod = require('../models/post');
let modUser = require('../models/user');
let modPost = require('../models/post');
let parse= require('./parse');

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
         mod.then()
         .catch(function(error){
            res.redirect(301,'/homepage');
            console.log(error);
        });
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
    }).catch(function(error){
        res.redirect(301,'/homepage');
        console.log(error);
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
    }).catch(function(error){
        res.redirect(301,'/homepage');
        console.log(error);
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
        } else if (req.headers.referer.includes('search') || req.headers.referer.includes('addReply')){
            let page = req.cookies.pageNum

            if(req.body.postkey !== ""){
                
                let post = modPost.searchPostRe(req.body.postkey,page);
                post.then((data) => {
                    parse.parsePosts(data.rows,req.body.postkey);
                    res.render('search', {
                        postList: data.rows, 
                        pageNum: req.cookies.pageNum,
                        pageTitle: 'Search', 
                        signedIn:true});
                    return;
                });


            } else if (req.body.posttopic !== ""){

                let post = modPost.searchPostReByTopic(req.body.posttopic,page);
                post.then((data) => {
        
                parse.parsePosts(data.rows,"",req.body.posttopic.toLowerCase());
                res.render('search', {
                postList: data.rows, 
                pageNum: page,
                signedIn:true});
                });

            } else{
                
                let post  = modPost.searchPostReByUID(req.body.postuserid,page);
                post.then((data)=>{
                parse.parsePosts(data.rows,"","",req.body.postuserid);
                res.render('search', {
                postList: data.rows, 
                pageNum: page,
                signedIn:true});
                })

            }
        } else if (req.headers.referer.includes('profile')){
            res.redirect(301,'/profile/' + req.cookies.visitorID)
        }
    }).catch(function(error){
        res.redirect(301,'/homepage');
        console.log(error);
    });
}
