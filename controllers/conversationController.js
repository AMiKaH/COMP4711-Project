let modConvo = require('../models/message');
let modUser = require('../models/user');

// GET
// Render the initial start message page
exports.getMessagePage = function(req,res,next) {
    res.render('messageUser');
} 

// POST
// Send a message from that message page
exports.postMessagePage = async function(req,res,next) {

    // startConversation requires senderid receiverid subject
    const mSubject = req.body["message-subject"];
    const mDetails = req.body["message-details"];
    const mUserSending = req.cookies.userid;
    const mUserToSendTo = req.cookies.visitorID;

    // Start the conversation
    const startConversationWithUser = modConvo.startConversation({
        senderID : mUserSending,
        receiverID : mUserToSendTo,
        subject : mSubject
    }).then();

    // Need conversation ID

    const getConversationWithUser = modConvo.getConversation(mUserSending);
    const getReceivingUser = modUser.getUserByID(mUserSending);

    let currentConvoID = await Promise.all([getReceivingUser, getConversationWithUser]).then((data) => {

        console.log("Convo");
        console.log(data[1].rows[0].conversationid);
        console.log(data[0].rows[0].fname);

        const sendMessage = modConvo.sendMsg({
            conversationID: data[1].rows[0].conversationid,
            senderID : mUserSending,
            receiverID : mUserToSendTo,
            subject : mSubject,
            text : mDetails
        });
        
        res.render('messages', {
            conversation : data[1].rows         
        });

    }).catch((error) => {

        console.log("Error Starting Conversation. ")
        console.log(error);

    });

    // Send the message using the saved conversation ID

}

// GET
exports.getMessages = async function(req,res,next) {

    // Doesn't exist
    let AllConversations = modConvo.getConversation(req.cookies.userid);

    AllConversations.then(async function(data) {

        let listOfConversations = data.rows;

        for (let convo of listOfConversations) {

            let currentConvoMessages = modConvo.getMsg(convo.conversationid);
            
            convo.messages = await currentConvoMessages.then((data) => {
                
                return data.rows;

            })

        };

        res.render('messages', {
            conversation : listOfConversations
        });
    });
}
 
// exports.getMessages = function(req,res,next, conversationID) {

//     let specificConversation = messageContainer.getMessage(conversationID);

//     specificConversation.then((data) => {
//         res.render('messages', { people: data.rows, peoplesCSS: true });
//     });
// }

exports.sendMessage = function(req,res,next) {


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

