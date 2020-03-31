let db = require('../util/database');

// get conversation list
function getConversations(id) {
    let sql = `SELECT * FROM conversation WHERE senderID=${id} OR receiverID=${id}
        ORDER BY timedate desc`;
    return db.qeury(sql);
}

// get count of incomming message
function getMessageCount(id) {
    let sql = `SELECT count(*) as cnt FROM message WHERE receiverID=${id}`;
    return db.qeury(sql)
}

// update conversation timestamp
function renewConversationTimestamp(id) {
    let sql = `UPDATE conversation SET timeDate = now() WHERE conversationID=${id}`;
    return db.qeury(sql)
}

// get messages
function getMessage(id) {
    let sql = `SELECT * FROM message WHERE conversationID=${id} ORDER BY timeDate`;
    return db.qeury(sql);
}

// start conversation
function startConversation(data) {
    let sql = `INSERT INTO conversation (senderid, receiverid, subject) values (${data.senderID}, ${data.receiverID}, '${data.subject}')`;
    return db.qeury(sql);
}

// send message
function addMessage(data) {
    let sql = `INSERT INTO message (conversationid, senderid, receiverid, "text") values (${data.conversationID}, ${data.senderID}, ${data.receiverID}, '${data.subject}')`;
    return db.qeury(sql);
}

module.exports = {
    getConversation: getConversations,
    getMsgCount: getMessageCount,
    renewConversation: renewConversationTimestamp,
    getMsg: getMessage,
    startConversation: startConversation,
    sendMsg: addMessage
}