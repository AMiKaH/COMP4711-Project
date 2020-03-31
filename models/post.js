let db = require('../util/database');

// insert a single post to the database
function addPost(data) {
   
    let sql = `INSERT INTO post (userid, topic, title, "text") VALUES (${data.userID}, ${data.topic}, '${data.title}', '${data.text}')`;
    return db.qeury(sql);
}

// get all posts with time desc
function getAll() {
    let  sql =  `SELECT * FROM v_post ORDER BY timeDate desc`;
    return db.qeury(sql);
 }
 
// get all posts with time desc
function getAllWithReplies() {
    let  sql =  `SELECT * FROM v_post_r ORDER BY timeDate desc, reply_timedate`;
    return db.qeury(sql);
}

// get recent posts by specified limit parament
function getRecentPost(limit = 5) {
    let sql = `SELECT * FROM v_post ORDER BY timeDate desc LIMIT ` + limit;
    return db.qeury(sql)   
}

// get recent posts with its replies by specified limit parament
function getRecentPostWithReplies(limit = 5) {
    let sql = `SELECT * FROM v_post_r ORDER BY timeDate desc LIMIT ` + limit;
    return db.qeury(sql)   
}

// get replies by postID
function getReplies(postID = 0) {
    let sql = `SELECT replyid, postid, userid, timedate, "text" FROM reply WHERE postID = ` + postID;
    return db.qeury(sql);
}

// insert a single post to the database
function addReply(data) {
    let sql = `INSERT INTO post (postid, userid, "text") VALUES (${data.postID}, ${data.userID}, '${data.text}')`;
    return db.qeury(sql);
}

// search post using keyword 
function searchPost(keyword) {
    let condition = `(title LIKE '%${keyword}%' OR topicName LIKE '%${keyword}%' OR text LIKE '%${keyword}%')`;
    let sql = `SELECT * FROM v_post WHERE ${condition}`;
    return db.qeury(sql)
}

// search post with replies using keyword 
function searchPostWithReplies(keyword) {
    let condition = `(title LIKE '%${keyword}%' OR topicName LIKE '%${keyword}%' OR text LIKE '%${keyword}%' OR reply_text LIKE '%${keyword}%')`;
    let sql = `SELECT * FROM v_post_r WHERE ${condition}`;
    return db.qeury(sql)
}

// search post by topicID
function searchPostByTopic(topicID) {
    let sql = `SELECT * FROM v_post WHERE topic = ` + topicID;
    return db.qeury(sql)
}

// search post with replies by topicID
function searchPostWithRepliesByTopic(topicID) {
    let sql = `SELECT * FROM v_post_r WHERE topic = ` + topicID;
    return db.qeury(sql)
}

// get post counts written by specifc user
function getPostCounts(id){
    let sql = `SELECT count(postID) as cnt From post Where userID = ${id}`;
    return db.qeury(sql)
}

module.exports = {
    add: addPost,
    getAll: getAll,
    getAllRe: getAllWithReplies,
    getRecentPost: getRecentPost,
    getRecentPostRe: getRecentPostWithReplies,
    getReplies: getReplies,
    addReply: addReply,
    searchPost: searchPost,
    searchPostRe: searchPostWithReplies,
    searchByTopic: searchPostByTopic,
    searchPostReByTopic: searchPostWithRepliesByTopic,
    getPostCounts: getPostCounts
}