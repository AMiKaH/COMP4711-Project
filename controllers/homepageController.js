let modPost = require('../models/post');
let modUser = require('../models/user');
let modUserMsg = require('../models/message');
let parse = require('./parse')


exports.getHomePage = function(req,res,next, pageNumber = 0){
    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }
    if (req.headers.referer == undefined || req.headers.referer.includes('search'))
        res.cookie('pageNum',0);

    let pageNum = req.cookies.pageNum

    if(pageNum ==="undefined")
        pageNum = 0;
        
    let post = modPost.getRecentPostRe(req.cookies.pageNum);
    let prof = modUser.getUserByID(req.cookies.userid);
    const getUserMsgCount = modUserMsg.getMsgCount(req.cookies.userid);

    Promise.all([post,prof, getUserMsgCount]).then((data)=>{
        parse.parsePosts(data[0].rows);
        res.render('homepage', {pageTitle:'Home Page',
        pageNum: req.cookies.pageNum,
        profile: data[1].rows[0],
        msgCount: data[2].rows[0].cnt,
        signedIn:true,
        postList: data[0].rows,
        postNotComplete: req.query.postNotComplete});
    }).catch(function(error){
        res.redirect(301,'/homepage');
        console.log(error);
    });
}
