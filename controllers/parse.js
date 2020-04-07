
function parsePosts(rows,key = "",topic ="",userid=""){
    let postList = rows;
    postList.forEach(element => {
        var replies = [];
        //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        //console.log(element)
        if(element.r_text[0] != null){

            for(let i = element.r_text.length - 1; i >= 0; i--){
                let obj = {
                        postid: element.postid,
                        postkeyword: key,
                        posttopic: topic,
                        postuserid: userid,
                        imgUrl : element.r_imgurl[i],
                        replyText : element.r_text[i],
                        r_userid: element.r_userid[i]

                    }                
                replies.push(obj);
            }
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