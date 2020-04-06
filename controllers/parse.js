
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