
function parsePosts(rows,key = "",topic ="",userid=""){
    let postList = rows;
    postList.forEach(element => {
        var replies = [];
        if(element.r_text[0] != null){

            for(let i = element.r_text.length - 1; i >= 0; i--){
                let obj = {
                        postid: element.postid,
                        replyid: Number(element.r_replyid[i].trim()),
                        postkeyword: key,
                        posttopic: topic,
                        postuserid: userid,
                        imgUrl : element.r_imgurl[i].trim(),
                        replyText : element.r_text[i].trim(),
                        r_userid: element.r_userid[i].trim()

                    }                
                replies.push(obj);
            }
            replies.sort((a,b)=>{
                return (a.replyid > b.replyid) ? 1 : -1;
            })
            element.replies = replies;
            element.postkeyword = key;
            element.posttopic = topic;
            element.postuserid = userid;
        }
    });
}

function visitProfParser(rows){
    let postList = rows;
    postList.forEach(element => {
        if(element.text[0] != null){
            for(let i = element.text.length - 1; i >= 0; i--){

                let obj = {
                        postid: element.postid,

                    }                
                replies.push(obj);
            }
            element.replies = replies;
        }
    });
}

module.exports = {
    parsePosts :parsePosts
}