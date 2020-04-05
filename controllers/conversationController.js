let modConvo = require('../models/message');
let modUser = require('../models/user');

// GET
// Render the initial start message page
exports.getMessagePage = function(req,res,next) {
    res.render('messageUser');
} 

// POST
// Send a message from that message page
exports.postMessagePage = function(req,res,next) {

    // startConversation requires senderid receiverid subject
    const mSubject = req.body["message-subject"];
    const mDetails = req.body["message-details"];
    const mUserSending = req.cookies.userid;
    const mUserToSendTo = req.cookies.visitorID;

    console.log(mUserToSendTo);
    console.log(mSubject);
    console.log(mDetails);
    console.log(mUserSending);

    // Start the conversation
    const startConversationWithUser = modConvo.startConversation({
        senderID : mUserSending,
        receiverID : mUserToSendTo,
        subject : mSubject
    }).then();

    const getConversationWithUser = modConvo.getConversation(mUserSending);

    const getReceivingUser = modUser.getUserByID(mUserSending);

    Promise.all([getReceivingUser, getConversationWithUser]).then((data) => {

        console.log(data[0].rows[0].fname);
        
        res.render('messages', {

            sender : data[0].rows[0],
            conversation : data[1].rows
            
        });

    }).catch((error) => {

        console.log("Error Starting Conversation. ")
        console.log(error);

    });

    // Send the message using the saved conversation ID

}
// Redirect to conversation page

// GET
exports.getMessages = function(req,res,next) {

    // Doesn't exist
    let AllMessages = modConvo.getConversation(req.cookies.userid);

    AllMessages.then((data) => {
        // what goes in place of peoples here?
        res.render('messages');
    });
}
 
// exports.getMessages = function(req,res,next, conversationID) {

//     let specificConversation = messageContainer.getMessage(conversationID);

//     specificConversation.then((data) => {
//         res.render('messages', { people: data.rows, peoplesCSS: true });
//     });
// }

exports.sendMessage = function(req,res,next) {

    
    //  let m_CID =
    //  let m_ID = 
    //  let s_ID = 
    //  let r_ID =
    //  let time_Date =
    //  let text = req.body.

    let mObject = {
        messageCID : m_CID,
        messageID : m_ID,
        senderID : s_ID,
        receiverID : r_ID,
        timeDate : time_Date,
        text : text
    }

    //Incomplete.
    messageContainer.add(mObject);
    res.redirect(301, 'conversationView');

}

