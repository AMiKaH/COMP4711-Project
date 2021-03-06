let db = require('../util/database');

// insert a single post to the database
function addPost(data) {
    let sql = `INSERT INTO post (userid, topic, title, "text") VALUES (${data.userID}, (SELECT topicid FROM topic where topicname LIKE '%${data.topic}%'), '${data.title}', '${data.text}')`;
    db.query(sql);
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
function getRecentPostWithReplies(page) {
    let offset = 5 * page;
    let sql = `SELECT '` + page + `' AS page, * FROM v_post_r ORDER BY timeDATE desc LIMIT 5 offset `  + offset
    return db.query(sql)
}

// get recent posts with its replies by specified limit parament
function getRecentPostWithRepliesBySpecificUser(id, page) {
    let offset = 5 * page;
    // let sql = `SELECT '` + page + `' AS page, * FROM v_post_r ORDER BY timeDATE desc LIMIT 5 offset `  + offset + `WHERE userID = ${id}`;
    let sql = `SELECT '` + page + `' AS page, * FROM v_post_r Where userID = ${id} ORDER BY timeDATE desc LIMIT 5 offset `  + offset
    // let sql = `SELECT *, to_char(timedate, 'DD mon YYYY') f_timedate FROM v_post_r vpr WHERE userID = ${id}limit 5` + offset;
    return db.query(sql)
}

// insert a single post to the database
function addReply(data) {
    let sql = `INSERT INTO reply (postid, userid, "text") VALUES (${data.postID}, ${data.userID}, '${data.text}')`;
    return db.query(sql);
}

// search post with replies using keyword 
function searchPostWithReplies(keyword,page) {
    let offset = 5 * page;
    let condition = `(LOWER(title) LIKE '%${keyword}%')`;
    let sql = `SELECT '` + page + `' AS page,* FROM v_post_r WHERE ${condition}LIMIT 5 offset `  + offset;
    return db.query(sql)
}
function searchPostWithRepliesByUserID(keyword,page) {
    let offset = 5 * page;
    let condition = `(userid = ${keyword})`;
    let sql = `SELECT '` + page + `' AS page,* FROM v_post_r WHERE ${condition}LIMIT 5 offset `  + offset;
    return db.query(sql)
}

// search post with replies by topicID
function searchPostWithRepliesByTopic(topicID,page) {
    let offset = 5 * page;
    let sql = `SELECT '` + page + `' AS page, * FROM v_post_r WHERE topic = ` + 
    `(SELECT topicid FROM topic where topicname LIKE '%${topicID}%') LIMIT 5 offset `  + offset;
    return db.query(sql)
}

// get post counts written by specifc user
function getPostCounts(id){
    let sql = `SELECT count(postID) as cnt From post Where userID = ${id}`;
    return db.query(sql)
}

// get all the posts written by specific user
function getPosts(id) {
    let sql = `SELECT * FROM v_post WHERE userID = ${id}`;
    return db.query(sql);
}

module.exports = {
    add: addPost,
    getAllRe: getAllWithReplies,
    getRecentPost: getRecentPost,
    getRecentPostRe: getRecentPostWithReplies,
    addReply: addReply,
    getPosts: getPosts,
    searchPostRe: searchPostWithReplies,
    searchPostReByUID : searchPostWithRepliesByUserID,
    searchPostReByTopic: searchPostWithRepliesByTopic,
    getPostCounts: getPostCounts,
    getRecentPostWithRepliesBySpecificUser : getRecentPostWithRepliesBySpecificUser
}