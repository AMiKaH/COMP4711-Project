let modPost = require('../models/post');
let modUser = require('../models/user');

exports.getHomePage = function(req,res,next){
    if(req.cookies.signedIn !== "true"){
        res.redirect(301,'/');
        return
    }

    let post = modPost.getRecentPostRe();
    //TO:DO MAKE READ FROM COOKIE 
    let prof = modUser.getUserByID(req.cookies.userid);
    Promise.all([post,prof]).then((data)=>{
        let list = parsePosts(data[0].rows);

        res.render('homepage', {pageTitle:'HomePage',
        profile: data[1].rows[0],
        signedIn:true,
        postList: data[0].rows});
    });
}

function parsePosts(rows){
    let postList = rows;
    postList.forEach(element => {
<<<<<<< HEAD
        var replies = [];
        if(element.r_text[0] != null){
            for(let i = element.r_text.length - 1; i >= 0; i--){

                let obj = {
                        postid: element.postid,
                        imgUrl : element.r_imgurl[i],
                        replyText : element.r_text[i]

=======
        if(element.reply_text[0] != null){
            for(let i = element.reply_text.length - 1; i >= 0; i--){
                let id = element.reply_userid[i].trim();
                let imgUrl = modUser.getUserImgByID(id);

                imgUrl.then((data)=>{
                    let obj = {
                        imgUrl : imgUrl.imgurl,
                        replyText : element.reply_text[i]
>>>>>>> parent of 31a68f2... fixed issue with parsing posts
                    }                
                replies.push(obj);
                })
                
            }
            element.replies = replies;
        }
    });
}