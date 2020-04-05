let messageContainer = require('../models/message');
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: 'put_your_username_here',
       pass: 'put_your_password_here'
    }
});

exports.getMessages = function(req,res,next) {

    // Doesn't exist
    let AllMessages = messageContainer.getConversations();

    AllMessages.then((data) => {
        // what goes in place of peoples here?
        res.render('conversationView', { people: data.rows, peoplesCSS: true });
    });
}
 
exports.getMessages = function(req,res,next, conversationID) {

    let specificConversation = messageContainer.getMessage(conversationID);

    specificConversation.then((data) => {
        res.render('conversationView', { people: data.rows, peoplesCSS: true });
    });
}

exports.sendMessage = function(req,res,next) {

    
    //  let m_CID =
    //  let m_ID = 
    //  let s_ID = 
    //  let r_ID =
    //  let time_Date =
    //  let text = req.body.

    let mObject = {
        messageCID = m_CID,
        messageID = m_ID,
        senderID = s_ID,
        receiverID = r_ID,
        timeDate = time_Date,
        text = text
    }

    //Incomplete.
    messageContainer.add(mObject);
    res.redirect(301, 'conversationView');

}

