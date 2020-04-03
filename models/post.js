let db = require('../util/database');

// insert a single post to the database
function addPost(data) {
   
    let sql = `INSERT INTO post (userid, topic, title, "text") VALUES (${data.userID}, ${data.topic}, '${data.title}', '${data.text}')`;
    return db.query(sql);
}

 
// get all posts with time desc
function getAllWithReplies() {
    let  sql =  `SELECT * FROM v_post_r ORDER BY timeDate desc, reply_timedate`;
    return db.query(sql);
}

// get recent posts by specified limit parament
function getRecentPost(limit = 5) {
    let sql = `SELECT * FROM v_post ORDER BY timeDate desc LIMIT ` + limit;
    return db.query(sql)   
}

// get recent posts with its replies by specified limit parament
function getRecentPostWithReplies(limit = 5) {
    let sql = `SELECT * FROM v_post_r ORDER BY timeDate desc LIMIT ` + limit;
    return db.query(sql)   
}

// insert a single post to the database
function addReply(data) {
    let sql = `INSERT INTO post (postid, userid, "text") VALUES (${data.postID}, ${data.userID}, '${data.text}')`;
    return db.query(sql);
}

// search post with replies using keyword 
function searchPostWithReplies(keyword) {
    let condition = `(title LIKE '%${keyword}%' OR topicName LIKE '%${keyword}%' OR text LIKE '%${keyword}%' OR reply_text LIKE '%${keyword}%')`;
    let sql = `SELECT * FROM v_post_r WHERE ${condition}`;
    return db.query(sql)
}

// search post with replies by topicID
function searchPostWithRepliesByTopic(topicID) {
    let sql = `SELECT * FROM v_post_r WHERE topic = ` + topicID;
    return db.query(sql)
}

// get post counts written by specifc user
function getPostCounts(id){
    let sql = `SELECT count(postID) as cnt From post Where userID = ${id}`;
    return db.query(sql)
}

// get all the posts written by specific user
function getPosts(id) {
    let sql = "SELECT * FROM post WHERE userID = " + id;
    return db.qeury(sql);
}

module.exports = {
    add: addPost,
    getAllRe: getAllWithReplies,
    getRecentPost: getRecentPost,
    getRecentPostRe: getRecentPostWithReplies,
    addReply: addReply,
    getPosts: getPosts,
    searchPostRe: searchPostWithReplies,
    searchPostReByTopic: searchPostWithRepliesByTopic,
    getPostCounts: getPostCounts,
}