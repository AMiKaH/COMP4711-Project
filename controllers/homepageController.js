let modPost = require('../models/post');
let modUser = require('../models/user');


exports.getHomePage =  function(req,res,next, pageNumber = 0){

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
    
    Promise.all([post,prof]).then((data)=>{
        parsePosts(data[0].rows)
        
        res.render('homepage', {pageTitle:'Home Page',
        pageNum: req.cookies.pageNum,
        profile: data[1].rows[0],
        signedIn:true,
        postList: data[0].rows,
        postNotComplete: req.query.postNotComplete,
        cache: false}, (err, html) => {
            res.set('content-type', 'text/html')
            res.send(html)
        })
    });
}

function parsePosts(rows){
    let postList = rows;
    postList.forEach(element => {
        var replies = [];
        if(element.r_text[0] != null){
            for(let i = element.r_text.length - 1; i >= 0; i--){

                let obj = {
                        postid: element.postid,
                        imgUrl : element.r_imgurl[i],
                        replyText : element.r_text[i]

                    }                
                replies.push(obj);
            }
            element.replies = replies;
        }
    });
}